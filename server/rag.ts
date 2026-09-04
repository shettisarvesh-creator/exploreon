import { HistoricalKnowledgeDoc, Citation } from '../src/types';
import { HISTORICAL_DOCS } from './knowledge-base';

export interface ChunkMetadata {
  docId: string;
  chunkId: string;
  title: string;
  location: string;
  country: string;
  yearStart: number;
  yearEnd: number;
  period: string;
  topic: string;
  source: string;
  sourceType: 'Academic' | 'Archaeological' | 'Primary Source' | 'Chronicle' | 'Museum Archive';
  reliability: 'high' | 'medium';
  entities: string[];
}

export interface DocumentChunk {
  id: string;
  metadata: ChunkMetadata;
  content: string;
  vector?: number[];
  termFrequencies: Map<string, number>;
}

export interface RetrievalResult {
  chunk: DocumentChunk;
  score: number;
  denseScore: number;
  temporalScore: number;
  matchedTerms: string[];
}

export class HistoricalRAGPipeline {
  private chunks: DocumentChunk[] = [];
  private vocabulary: Map<string, number> = new Map();
  private idf: Map<string, number> = new Map();

  constructor() {
    this.ingestAllDocs(HISTORICAL_DOCS);
  }

  public ingestAllDocs(docs: HistoricalKnowledgeDoc[]): void {
    this.chunks = [];
    docs.forEach(doc => {
      // Chunking by semantic paragraphs/sentences (~200-300 words with 50-word overlap)
      const rawChunks = this.splitIntoSemanticChunks(doc.content, 250, 40);
      rawChunks.forEach((chunkContent, idx) => {
        const chunkId = `${doc.id}-c${idx + 1}`;
        const tf = this.computeTermFrequencies(chunkContent);
        this.chunks.push({
          id: chunkId,
          metadata: {
            docId: doc.id,
            chunkId,
            title: doc.title,
            location: doc.location,
            country: doc.country,
            yearStart: doc.yearStart,
            yearEnd: doc.yearEnd,
            period: doc.period,
            topic: doc.topic,
            source: doc.source,
            sourceType: doc.sourceType,
            reliability: doc.reliability,
            entities: doc.entities
          },
          content: chunkContent,
          termFrequencies: tf
        });
      });
    });

    this.recomputeVocabularyAndIDF();
    this.computeDenseVectors();
  }

  private splitIntoSemanticChunks(text: string, chunkSizeWords: number, overlapWords: number): string[] {
    const sentences = text.split(/(?<=[.?!])\s+/);
    const chunks: string[] = [];
    let currentWords: string[] = [];

    for (const s of sentences) {
      const words = s.split(/\s+/).filter(Boolean);
      if (currentWords.length + words.length > chunkSizeWords && currentWords.length > 0) {
        chunks.push(currentWords.join(' '));
        currentWords = currentWords.slice(Math.max(0, currentWords.length - overlapWords));
      }
      currentWords.push(...words);
    }

    if (currentWords.length > 0) {
      chunks.push(currentWords.join(' '));
    }

    return chunks.length > 0 ? chunks : [text];
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !STOPWORDS.has(w));
  }

  private computeTermFrequencies(text: string): Map<string, number> {
    const tokens = this.tokenize(text);
    const tf = new Map<string, number>();
    tokens.forEach(t => tf.set(t, (tf.get(t) || 0) + 1));
    return tf;
  }

  private recomputeVocabularyAndIDF(): void {
    const docCount = this.chunks.length;
    const docFrequencies = new Map<string, number>();

    this.chunks.forEach(chunk => {
      const seen = new Set(chunk.termFrequencies.keys());
      seen.forEach(token => {
        docFrequencies.set(token, (docFrequencies.get(token) || 0) + 1);
      });
    });

    this.idf.clear();
    let vocabIdx = 0;
    this.vocabulary.clear();

    docFrequencies.forEach((df, token) => {
      this.vocabulary.set(token, vocabIdx++);
      // Standard BM25-style IDF formulation
      const idfScore = Math.log(1 + (docCount - df + 0.5) / (df + 0.5));
      this.idf.set(token, Math.max(0.2, idfScore));
    });
  }

  private computeDenseVectors(): void {
    // Generate normalized dense semantic vectors for each chunk
    const vocabSize = this.vocabulary.size;
    this.chunks.forEach(chunk => {
      const vec = new Array(vocabSize).fill(0);
      let normSq = 0;

      chunk.termFrequencies.forEach((count, token) => {
        const idx = this.vocabulary.get(token);
        const idfVal = this.idf.get(token) || 1.0;
        if (idx !== undefined) {
          const weight = count * idfVal;
          vec[idx] = weight;
          normSq += weight * weight;
        }
      });

      const norm = Math.sqrt(normSq) || 1;
      chunk.vector = vec.map(v => v / norm);
    });
  }

  private cosineSimilarity(v1: number[], v2: number[]): number {
    let dot = 0;
    const len = Math.min(v1.length, v2.length);
    for (let i = 0; i < len; i++) {
      dot += v1[i] * v2[i];
    }
    return dot;
  }

  /**
   * Hybrid Vector + Metadata Filter + Temporal Distance Decay Reranking
   */
  public retrieve(
    query: string,
    filter?: {
      location?: string;
      year?: number;
      period?: string;
      topic?: string;
    },
    topK: number = 3
  ): RetrievalResult[] {
    const queryTokens = this.tokenize(query);
    const vocabSize = this.vocabulary.size;
    const queryVec = new Array(vocabSize).fill(0);
    let queryNormSq = 0;

    queryTokens.forEach(token => {
      const idx = this.vocabulary.get(token);
      const idfVal = this.idf.get(token) || 1.0;
      if (idx !== undefined) {
        queryVec[idx] += idfVal;
        queryNormSq += idfVal * idfVal;
      }
    });

    const queryNorm = Math.sqrt(queryNormSq) || 1;
    const normalizedQueryVec = queryVec.map(v => v / queryNorm);

    const scored: RetrievalResult[] = [];

    for (const chunk of this.chunks) {
      // 1. Location filtering
      let locationMultiplier = 1.0;
      if (filter?.location) {
        const targetLoc = filter.location.toLowerCase();
        const chunkLoc = chunk.metadata.location.toLowerCase();
        const country = chunk.metadata.country.toLowerCase();
        if (chunkLoc.includes(targetLoc) || targetLoc.includes(chunkLoc) || country.includes(targetLoc)) {
          locationMultiplier = 2.2;
        } else {
          locationMultiplier = 0.4; // penalize mismatching locations
        }
      }

      // 2. Temporal distance decay
      let temporalScore = 1.0;
      if (filter?.year !== undefined && !isNaN(filter.year)) {
        const y = filter.year;
        const midDocYear = (chunk.metadata.yearStart + chunk.metadata.yearEnd) / 2;
        const yearDiff = Math.abs(midDocYear - y);

        if (y >= chunk.metadata.yearStart && y <= chunk.metadata.yearEnd) {
          temporalScore = 1.5; // Exactly in range!
        } else {
          // Exponential decay based on distance in years
          temporalScore = Math.max(0.15, Math.exp(-yearDiff / 150));
        }
      }

      // 3. Dense vector similarity
      let denseScore = 0;
      if (chunk.vector) {
        denseScore = this.cosineSimilarity(normalizedQueryVec, chunk.vector);
      }

      // 4. Keyword lexical boost
      let matchedTerms: string[] = [];
      queryTokens.forEach(t => {
        if (chunk.termFrequencies.has(t)) {
          matchedTerms.push(t);
        }
      });
      const lexicalScore = matchedTerms.length / Math.max(1, queryTokens.length);

      // 5. Reliability bonus
      const reliabilityMultiplier = chunk.metadata.reliability === 'high' ? 1.15 : 1.0;

      // Combined composite score
      const finalScore = (denseScore * 0.55 + lexicalScore * 0.45) * locationMultiplier * temporalScore * reliabilityMultiplier;

      scored.push({
        chunk,
        score: finalScore,
        denseScore,
        temporalScore,
        matchedTerms
      });
    }

    // Rerank by final score
    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, topK);
  }

  public buildCitations(results: RetrievalResult[]): Citation[] {
    return results.map((res, index) => {
      const meta = res.chunk.metadata;
      return {
        id: `cite-${meta.docId}-${index + 1}`,
        index: index + 1,
        title: meta.title,
        source: meta.source,
        sourceType: meta.sourceType,
        snippet: res.chunk.content.length > 280 
          ? res.chunk.content.substring(0, 277) + '...' 
          : res.chunk.content,
        yearStart: meta.yearStart,
        yearEnd: meta.yearEnd,
        location: meta.location,
        reliability: meta.reliability,
        whyItSupports: `Grounded in ${meta.sourceType.toLowerCase()} records from ${meta.location} (${meta.yearStart}–${meta.yearEnd} AD) detailing ${meta.topic.toLowerCase()}.`
      };
    });
  }

  public addCustomDocument(doc: HistoricalKnowledgeDoc): void {
    HISTORICAL_DOCS.push(doc);
    this.ingestAllDocs(HISTORICAL_DOCS);
  }
}

const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'aren', 'as', 'at', 'be', 'because', 'been', 'before', 'being',
  'below', 'between', 'both', 'but', 'by', 'can', 'cannot', 'could', 'did', 'do',
  'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had',
  'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself',
  'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me',
  'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
  'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their',
  'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those',
  'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn', 'we',
  'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with',
  'would', 'you', 'your', 'yours', 'yourself', 'yourselves'
]);

export const ragPipeline = new HistoricalRAGPipeline();
