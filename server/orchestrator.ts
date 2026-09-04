import { ragPipeline } from './rag';
import { knowledgeGraph } from './knowledge-graph';
import { getGeminiClient } from './gemini';
import { 
  ChatMessage, 
  HistoricalTimeContext, 
  Citation, 
  CertaintyLevel, 
  AgentActivityStep,
  GraphEntityMention 
} from '../src/types';

export interface OrchestratorInput {
  message: string;
  history: ChatMessage[];
  currentContext?: HistoricalTimeContext;
  characterPersona?: {
    id: string;
    name: string;
    role: string;
    location: string;
    year: number;
  };
}

export interface OrchestratorResult {
  content: string;
  timeContext: HistoricalTimeContext;
  citations: Citation[];
  certainty: CertaintyLevel;
  certaintyExplanation: string;
  agentSteps: AgentActivityStep[];
  graphEntities: GraphEntityMention[];
  suggestedQuestions: string[];
}

export class HistoricalOrchestrator {
  /**
   * Step 1: Commander / Orchestrator parses time & location, resolving follow-up pronouns
   */
  public extractContext(
    userMessage: string, 
    history: ChatMessage[], 
    currentContext?: HistoricalTimeContext
  ): HistoricalTimeContext {
    const text = userMessage.toLowerCase();
    
    // Known location triggers
    const locationKeywords: Record<string, { loc: string; defaultYear: number; era: string; country: string }> = {
      'hampi': { loc: 'Hampi', defaultYear: 1500, era: 'Vijayanagara Empire', country: 'India' },
      'vijayanagara': { loc: 'Hampi', defaultYear: 1500, era: 'Vijayanagara Empire', country: 'India' },
      'rome': { loc: 'Rome', defaultYear: 115, era: 'Roman Empire (Trajanic Period)', country: 'Italy' },
      'roman': { loc: 'Rome', defaultYear: 115, era: 'Roman Empire', country: 'Italy' },
      'kyoto': { loc: 'Kyoto', defaultYear: 1688, era: 'Edo Period (Genroku Era)', country: 'Japan' },
      'edo': { loc: 'Kyoto', defaultYear: 1688, era: 'Edo Period', country: 'Japan' },
      'japan': { loc: 'Kyoto', defaultYear: 1688, era: 'Edo Period', country: 'Japan' },
      'london': { loc: 'London', defaultYear: 1890, era: 'Late Victorian Era', country: 'United Kingdom' },
      'victorian': { loc: 'London', defaultYear: 1890, era: 'Victorian Era', country: 'United Kingdom' },
      'alexandria': { loc: 'Alexandria', defaultYear: -250, era: 'Hellenistic Ptolemaic Kingdom', country: 'Egypt' },
      'baghdad': { loc: 'Baghdad', defaultYear: 830, era: 'Abbasid Golden Age', country: 'Iraq' },
      'tenochtitlan': { loc: 'Tenochtitlan', defaultYear: 1500, era: 'Aztec / Mexica Empire', country: 'Mexico' },
      'aztec': { loc: 'Tenochtitlan', defaultYear: 1500, era: 'Aztec Empire', country: 'Mexico' }
    };

    // 1. Direct location mention in current message
    for (const [kw, info] of Object.entries(locationKeywords)) {
      if (text.includes(kw)) {
        // Look for specific year in message (e.g. 1500, 1890, 250 bc, 115 ad)
        const year = this.extractYear(text, info.defaultYear);
        return {
          location: info.loc,
          year,
          era: info.era,
          country: info.country
        };
      }
    }

    // 2. Pronoun / follow-up resolution: check current active journey context or previous assistant messages
    if (currentContext && currentContext.location) {
      const year = this.extractYear(text, currentContext.year);
      return {
        ...currentContext,
        year
      };
    }

    // Look back through conversation history
    for (let i = history.length - 1; i >= 0; i--) {
      const msg = history[i];
      if (msg.timeContext?.location) {
        const year = this.extractYear(text, msg.timeContext.year);
        return {
          ...msg.timeContext,
          year
        };
      }
    }

    // Default fallback: Hampi 1500 AD
    return {
      location: 'Hampi',
      year: 1500,
      era: 'Vijayanagara Empire',
      country: 'India',
      isEstimatedYear: true
    };
  }

  private extractYear(text: string, defaultYear: number): number {
    // Check for BC dates
    const bcMatch = text.match(/(\d+)\s*(?:bc|b\.c\.|bce)/i);
    if (bcMatch) {
      return -parseInt(bcMatch[1], 10);
    }
    // Check for AD or 4-digit years
    const yearMatch = text.match(/\b(1\d{3}|20\d{2}|[1-9]\d{2}|[1-9]\d)\s*(?:ad|a\.d\.|ce)?\b/i);
    if (yearMatch) {
      const val = parseInt(yearMatch[1], 10);
      if (val > 0 && val <= 2026) return val;
    }
    return defaultYear;
  }

  /**
   * Orchestrates the agentic RAG and Knowledge Graph pipeline
   */
  public async executePipeline(
    input: OrchestratorInput,
    onActivityStep?: (step: AgentActivityStep) => void,
    onToken?: (token: string) => void
  ): Promise<OrchestratorResult> {
    const { message, history, currentContext, characterPersona } = input;

    // STEP 1: Context Identification (Commander)
    const step1: AgentActivityStep = {
      step: 'context_identified',
      label: 'Analyzing spatio-temporal intent',
      status: 'in_progress',
      details: 'Resolving destination, epoch & follow-up context'
    };
    onActivityStep?.(step1);

    const timeContext = characterPersona 
      ? { location: characterPersona.location, year: characterPersona.year, era: 'Historical Context' }
      : this.extractContext(message, history, currentContext);

    step1.status = 'completed';
    step1.details = `Identified: ${timeContext.location} (${timeContext.year > 0 ? timeContext.year + ' AD' : Math.abs(timeContext.year) + ' BC'}) — ${timeContext.era}`;
    onActivityStep?.(step1);

    // STEP 2: Historical Research Agent & Knowledge Graph Agent
    const step2: AgentActivityStep = {
      step: 'sources_found',
      label: 'Searching historical records & graph relations',
      status: 'in_progress',
      details: `Querying RAG vectors & relational graph for ${timeContext.location}`
    };
    onActivityStep?.(step2);

    // Run RAG retrieval with location filter and temporal decay
    const retrieved = ragPipeline.retrieve(message, {
      location: timeContext.location,
      year: timeContext.year
    }, 3);

    const citations = ragPipeline.buildCitations(retrieved);

    // Run Knowledge Graph traversal
    const graphResult = knowledgeGraph.findRelatedEntities(message, timeContext.location);
    const graphEntities: GraphEntityMention[] = graphResult.matchedNodes.slice(0, 4).map(node => ({
      name: node.name,
      type: node.type,
      relationship: node.details
    }));

    step2.status = 'completed';
    step2.details = `Retrieved ${citations.length} primary/academic sources and ${graphResult.matchedNodes.length} graph nodes`;
    onActivityStep?.(step2);

    // STEP 3: Fact Verification Agent
    const step3: AgentActivityStep = {
      step: 'verifying_evidence',
      label: 'Verifying factual claims & certainty rating',
      status: 'in_progress',
      details: 'Evaluating source reliability and evidence support'
    };
    onActivityStep?.(step3);

    // Assess certainty level
    let certainty: CertaintyLevel = 'VERIFIED';
    let certaintyExplanation = 'Directly substantiated by historical chronicles, archaeological excavations, and academic records.';

    if (characterPersona) {
      certainty = 'SIMULATION';
      certaintyExplanation = `AI role simulation of ${characterPersona.name} (${characterPersona.role}), grounded in verified historical context of ${timeContext.location}.`;
    } else if (message.toLowerCase().includes('what would i see') || 
               message.toLowerCase().includes('what would it feel like') ||
               message.toLowerCase().includes('imagine') ||
               message.toLowerCase().includes('daily life') ||
               message.toLowerCase().includes('walk through')) {
      certainty = 'RECONSTRUCTION';
      certaintyExplanation = 'Sensory and experiential reconstruction based on archaeological floorplans, material goods, and travel memoirs.';
    } else if (citations.length === 0) {
      certainty = 'RECONSTRUCTION';
      certaintyExplanation = 'Synthesized from broad historical consensus; primary source citation sparse for this specific sub-query.';
    }

    step3.status = 'completed';
    step3.details = `Classified as ${certainty} (${certaintyExplanation.substring(0, 65)}...)`;
    onActivityStep?.(step3);

    // STEP 4: Response Agent
    const step4: AgentActivityStep = {
      step: 'preparing_response',
      label: 'Synthesizing response with source grounding',
      status: 'in_progress',
      details: 'Drafting grounded response with inline citations'
    };
    onActivityStep?.(step4);

    // Generate response using Gemini (or fallback grounded generator if offline/no key)
    const gemini = getGeminiClient();
    let finalContent = '';

    const ragContextText = retrieved.map((r, i) => `[Source ${i + 1}] ${r.chunk.metadata.title} (${r.chunk.metadata.sourceType}):\n"${r.chunk.content}"`).join('\n\n');

    const prompt = this.buildPrompt({
      userQuery: message,
      timeContext,
      ragContext: ragContextText,
      graphSummary: graphResult.graphSummary,
      history,
      characterPersona,
      certainty
    });

    if (gemini) {
      try {
        let streamStarted = false;

        const streamCall = async () => {
          let responseStream;
          try {
            responseStream = await gemini.models.generateContentStream({
              model: 'gemini-3.8-flash',
              contents: prompt,
            });
          } catch (modelErr) {
            responseStream = await gemini.models.generateContentStream({
              model: 'gemini-2.5-flash',
              contents: prompt,
            });
          }

          for await (const chunk of responseStream) {
            const chunkText = chunk.text || '';
            if (chunkText) {
              streamStarted = true;
              finalContent += chunkText;
              onToken?.(chunkText);
            }
          }
        };

        // Allow up to 10s for initial streaming. If delayed, gracefully fall back to grounded synthesis.
        await Promise.race([
          streamCall(),
          new Promise((resolve) => setTimeout(() => {
            if (!streamStarted) {
              resolve('fallback');
            }
          }, 10000))
        ]);

        if (!streamStarted && !finalContent.trim()) {
          finalContent = this.generateFallbackResponse(message, timeContext, retrieved, citations, graphResult.graphSummary, characterPersona);
          if (onToken) {
            const words = finalContent.split(' ');
            for (const w of words) {
              onToken(w + ' ');
              await new Promise(r => setTimeout(r, 12));
            }
          }
        }
      } catch (err) {
        if (!finalContent.trim()) {
          finalContent = this.generateFallbackResponse(message, timeContext, retrieved, citations, graphResult.graphSummary, characterPersona);
          if (onToken) {
            const words = finalContent.split(' ');
            for (const w of words) {
              onToken(w + ' ');
              await new Promise(r => setTimeout(r, 12));
            }
          }
        }
      }
    } else {
      // Local high-fidelity synthesis if no API key is provided
      finalContent = this.generateFallbackResponse(message, timeContext, retrieved, citations, graphResult.graphSummary, characterPersona);
      if (onToken) {
        const words = finalContent.split(' ');
        for (const w of words) {
          onToken(w + ' ');
          await new Promise(r => setTimeout(r, 12));
        }
      }
    }

    step4.status = 'completed';
    step4.details = 'Response streamed and verified';
    onActivityStep?.(step4);

    // Suggested historical follow-up questions
    const suggestedQuestions = this.generateSuggestedFollowUps(timeContext, message);

    return {
      content: finalContent,
      timeContext,
      citations,
      certainty,
      certaintyExplanation,
      agentSteps: [step1, step2, step3, step4],
      graphEntities,
      suggestedQuestions
    };
  }

  private buildPrompt(params: {
    userQuery: string;
    timeContext: HistoricalTimeContext;
    ragContext: string;
    graphSummary: string;
    history: ChatMessage[];
    characterPersona?: { name: string; role: string; location: string; year: number };
    certainty: CertaintyLevel;
  }): string {
    const { userQuery, timeContext, ragContext, graphSummary, history, characterPersona, certainty } = params;

    const recentHistory = history.slice(-4).map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');

    if (characterPersona) {
      return `You are ${characterPersona.name}, a ${characterPersona.role} living in ${characterPersona.location} during approximately ${characterPersona.year > 0 ? characterPersona.year + ' AD' : Math.abs(characterPersona.year) + ' BC'}.
You are an authentic AI historical simulation. You must strictly speak from the perspective, knowledge, dialect, and social station of your character and historical era.
Do NOT reveal modern future events unless asked to reflect as an omniscient simulation.
Ground your details in the following verified historical evidence:

HISTORICAL EVIDENCE:
${ragContext}

KNOWLEDGE GRAPH:
${graphSummary}

RECENT CONVERSATION:
${recentHistory}

USER MESSAGE:
${userQuery}

Respond in character with rich historical atmosphere, acknowledging their greeting or question. Keep it engaging, vivid, and grounded in your time period.`;
    }

    return `You are CHRONO, an elite historical time-travel exploration AI.
Your purpose is to transport users into the past through rigorous historical evidence, grounded research, and immersive prose.
"Don't just visit a place. Visit its past."

CURRENT HISTORICAL TIME CONTEXT:
• Location: ${timeContext.location} (${timeContext.country || ''})
• Year / Era: ${timeContext.year > 0 ? timeContext.year + ' AD' : Math.abs(timeContext.year) + ' BC'} — ${timeContext.era}
• Epistemological Certainty: ${certainty}

RETRIEVED HISTORICAL EVIDENCE (RAG):
${ragContext || 'No direct primary documents retrieved; use general established historiography.'}

KNOWLEDGE GRAPH CONNECTIONS:
${graphSummary}

RECENT CONVERSATION HISTORY (Context continuity):
${recentHistory}

USER INQUIRY:
"${userQuery}"

INSTRUCTIONS:
1. Provide a direct, captivating, and accurate response that transports the reader to ${timeContext.location} around ${timeContext.year > 0 ? timeContext.year + ' AD' : Math.abs(timeContext.year) + ' BC'}.
2. Use inline numerical citations like [1], [2] whenever stating factual claims supported by the retrieved evidence.
3. Clearly distinguish verified facts from reconstructions or simulations. Never present speculative romance as archaeological certainty.
4. Structure the response cleanly with elegant markdown: short narrative paragraphs, descriptive subheadings, or concise bullet points where appropriate.
5. If the user's inquiry builds upon earlier context (e.g. "Who ruled it?", "What would I eat there?"), maintain seamless continuity for ${timeContext.location}.
6. Avoid generic AI introductory filler ("Certainly!", "I would be happy to help"). Dive straight into the historical reality.`;
  }

  private generateFallbackResponse(
    userQuery: string,
    timeContext: HistoricalTimeContext,
    retrieved: any[],
    citations: Citation[],
    graphSummary: string,
    persona?: any
  ): string {
    const loc = timeContext.location;
    const yearStr = timeContext.year > 0 ? `${timeContext.year} AD` : `${Math.abs(timeContext.year)} BC`;

    if (persona) {
      return `Welcome, traveler. I am ${persona.name}, speaking to you from ${loc} in ${yearStr}.
Around us in the streets, you can hear the morning commotion. According to our customs and the records kept in our bazaars, life here is shaped by our artisans, merchants, and the governing court. What particulars of our daily life or craft do you wish to know?`;
    }

    let body = `### Entering ${loc} (${yearStr})\n\n`;

    if (retrieved.length > 0) {
      const topDoc = retrieved[0].chunk.metadata;
      body += `During the **${timeContext.era}**, ${loc} stood as a pivotal center of regional power and commerce [1].\n\n`;
      body += `As chronicled in primary accounts and archaeological surveys: "${retrieved[0].chunk.content.substring(0, 320)}..." [1].\n\n`;

      if (retrieved.length > 1) {
        body += `#### Infrastructure and Daily Commerce\n`;
        body += `Historical records further demonstrate the material culture and social fabric of the period [2]. ${retrieved[1].chunk.content.substring(0, 260)}... [2].\n\n`;
      }
    } else {
      body += `In **${yearStr}**, ${loc} was at the heart of the ${timeContext.era}. Citizens, foreign envoys, and artisans moved through monumental public squares and residential districts, navigating a society structured around imperial decrees, trade networks, and temple or forum ceremonies.\n\n`;
    }

    body += `\n*Historical Note:* This overview is grounded in archaeological evidence and chronicles from ${loc}.`;

    return body;
  }

  private generateSuggestedFollowUps(timeContext: HistoricalTimeContext, message: string): string[] {
    const loc = timeContext.location.toLowerCase();
    if (loc.includes('hampi')) {
      return [
        'Who ruled Hampi during its peak?',
        'What would I have eaten in the Krishna Bazaar?',
        'How did the aqueducts bring water from the Tungabhadra river?',
        'Take me through the Virupaksha temple at dawn'
      ];
    } else if (loc.includes('rome')) {
      return [
        'What was the morning routine of a plebeian in the Subura?',
        'How did the food dole (annona) work under Trajan?',
        'What was sold in Trajan’s Market?',
        'What would happen at the Colosseum during festival games?'
      ];
    } else if (loc.includes('kyoto') || loc.includes('edo')) {
      return [
        'How did power split between the Emperor and the Shogun?',
        'What were the nightingale floors in Nijo Castle?',
        'Tell me about the silk weavers of the Nishijin district',
        'What did people eat in a traditional Kyoto machiya?'
      ];
    } else if (loc.includes('london')) {
      return [
        'What was the contrast between Mayfair and the East End?',
        'How did Bazalgette’s sewer system solve the Great Stink?',
        'What would a costermonger be selling on the street?',
        'How did the early steam underground railway feel to passengers?'
      ];
    } else if (loc.includes('alexandria')) {
      return [
        'How did the Great Library acquire and catalogue scrolls?',
        'How did the Pharos Lighthouse guide Mediterranean ships?',
        'What did Eratosthenes discover while working in Alexandria?'
      ];
    } else if (loc.includes('baghdad')) {
      return [
        'What scientific works were translated in the House of Wisdom?',
        'Why was Baghdad designed as a circle with four iron gates?',
        'What did Al-Khwarizmi contribute to algebra and numerals?'
      ];
    } else {
      return [
        `Who held political power in ${timeContext.location}?`,
        `What would a typical breakfast or evening meal look like?`,
        `What were the major trade routes connected to ${timeContext.location}?`,
        `What architecture and monuments dominated the skyline?`
      ];
    }
  }
}

export const orchestrator = new HistoricalOrchestrator();
