import { GraphNode, GraphEdge } from '../src/types';

export const INITIAL_GRAPH_NODES: GraphNode[] = [
  // --- VIJAYANAGARA / HAMPI ---
  { id: 'krishnadevaraya', name: 'Krishnadevaraya', type: 'Ruler', period: '1509–1529 AD', location: 'Hampi', details: 'Emperor of Vijayanagara, patron of arts, author of Amuktamalyada.' },
  { id: 'vijayanagara-empire', name: 'Vijayanagara Empire', type: 'Dynasty', period: '1336–1646 AD', location: 'Deccan India', details: 'Dominant medieval empire of South India, defended Deccan autonomy.' },
  { id: 'hampi-city', name: 'Hampi (Vijayanagara)', type: 'Place', period: '1336–1565 AD', location: 'Karnataka, India', details: 'Imperial capital, fortified along the Tungabhadra River boulders.' },
  { id: 'virupaksha-temple', name: 'Virupaksha Temple', type: 'Building', period: '7th–16th c. AD', location: 'Hampi', details: 'Ancient shrine to Shiva, expanded with 52m gopuram by Krishnadevaraya in 1510.' },
  { id: 'krishna-bazaar', name: 'Krishna Bazaar', type: 'Place', period: '16th c. AD', location: 'Hampi', details: 'Sacred market colonnade famous for precious stone and silk trade.' },
  { id: 'tungabhadra-river', name: 'Tungabhadra River', type: 'Place', period: 'Geological', location: 'Hampi', details: 'Sacred river and natural northern moat protecting the capital.' },
  { id: 'domingo-paes', name: 'Domingo Paes', type: 'Artifact', period: 'c. 1520 AD', location: 'Hampi', details: 'Portuguese chronicler who recorded city size, markets, and court splendor.' },
  { id: 'timmarusu', name: 'Timmarusu', type: 'Ruler', period: '1500–1525 AD', location: 'Hampi', details: 'Revered prime minister (Appaji) and strategist to Krishnadevaraya.' },

  // --- ANCIENT ROME ---
  { id: 'trajan', name: 'Trajan', type: 'Ruler', period: '98–117 AD', location: 'Rome', details: 'Optimus Princeps under whom the Roman Empire achieved its greatest territorial extent.' },
  { id: 'roman-empire', name: 'Roman Empire', type: 'Dynasty', period: '27 BC – 476 AD', location: 'Mediterranean', details: 'Classical Mediterranean superpower governed by emperors and Senate.' },
  { id: 'rome-city', name: 'Rome', type: 'Place', period: '753 BC – Present', location: 'Italy', details: 'Imperial capital, city of one million citizens, marble monuments and insulae.' },
  { id: 'trajans-forum', name: 'Trajan’s Forum', type: 'Building', period: '112 AD', location: 'Rome', details: 'Monumental complex with Basilica Ulpia and multi-tier market arcade.' },
  { id: 'colosseum', name: 'Colosseum (Flavian Amphitheatre)', type: 'Building', period: '80 AD', location: 'Rome', details: 'Massive arena holding 50,000 spectators for gladiatorial games.' },
  { id: 'subura', name: 'Subura', type: 'Place', period: 'Roman Antiquity', location: 'Rome', details: 'Dense, boisterous plebeian quarter packed with multi-story wooden-and-brick insulae.' },
  { id: 'apollodorus', name: 'Apollodorus of Damascus', type: 'Artifact', period: 'c. 60–130 AD', location: 'Rome', details: 'Master imperial architect who designed Trajan’s Forum, Market, and Danube Bridge.' },

  // --- EDO KYOTO ---
  { id: 'tokugawa-ieyasu', name: 'Tokugawa Ieyasu', type: 'Ruler', period: '1543–1616 AD', location: 'Japan', details: 'Founder and first shogun of the Tokugawa Shogunate of Japan.' },
  { id: 'tokugawa-shogunate', name: 'Tokugawa Shogunate', type: 'Dynasty', period: '1603–1867 AD', location: 'Japan', details: 'Feudal military government characterized by isolation (sakoku) and internal peace.' },
  { id: 'kyoto-city', name: 'Kyoto', type: 'Place', period: '794–1868 AD', location: 'Japan', details: 'Imperial capital, home of the Emperor, Zen temples, and artisan guilds.' },
  { id: 'nijo-castle', name: 'Nijo Castle', type: 'Building', period: '1603 AD', location: 'Kyoto', details: 'Shogun’s Kyoto residence featuring chirping nightingale floorboards.' },
  { id: 'gion-district', name: 'Gion', type: 'Place', period: '17th c. – Present', location: 'Kyoto', details: 'Historic entertainment district famous for ochaya teahouses and Geisha arts.' },
  { id: 'nishijin', name: 'Nishijin Weaving Quarter', type: 'Practice', period: 'Edo Period', location: 'Kyoto', details: 'Famous textile guild renowned for silk brocades and yuzen kimono dyeing.' },

  // --- VICTORIAN LONDON ---
  { id: 'queen-victoria', name: 'Queen Victoria', type: 'Ruler', period: '1837–1901 AD', location: 'London', details: 'Monarch during Britain’s industrial zenith and imperial expansion.' },
  { id: 'london-city', name: 'London', type: 'Place', period: '1890 AD', location: 'United Kingdom', details: 'Metropolis of 5.5 million people, financial capital of the British Empire.' },
  { id: 'joseph-bazalgette', name: 'Sir Joseph Bazalgette', type: 'Artifact', period: '1819–1891 AD', location: 'London', details: 'Chief engineer who constructed London’s underground intercepting sewer network.' },
  { id: 'metropolitan-railway', name: 'Metropolitan Railway', type: 'Practice', period: '1863 AD', location: 'London', details: 'World’s first underground passenger railway using steam condensing locomotives.' },
  { id: 'east-end', name: 'East End Docks', type: 'Place', period: '19th c. AD', location: 'London', details: 'Working-class maritime hub and docklands subject of Charles Booth’s poverty survey.' },

  // --- ALEXANDRIA ---
  { id: 'ptolemy-ii', name: 'Ptolemy II Philadelphus', type: 'Ruler', period: '284–246 BC', location: 'Alexandria', details: 'Ptolemaic pharaoh who vastly expanded the Library and funded the Pharos lighthouse.' },
  { id: 'library-of-alexandria', name: 'Great Library of Alexandria', type: 'Building', period: 'c. 285–48 BC', location: 'Alexandria', details: 'Ancient world’s universal repository of papyrus scrolls and scientific inquiry.' },
  { id: 'pharos-lighthouse', name: 'Pharos of Alexandria', type: 'Building', period: 'c. 280 BC', location: 'Alexandria', details: '100-meter Wonder of the Ancient World guiding Mediterranean seafaring.' },
  { id: 'eratosthenes', name: 'Eratosthenes of Cyrene', type: 'Artifact', period: '276–194 BC', location: 'Alexandria', details: 'Chief librarian who calculated the Earth’s circumference with remarkable accuracy.' },

  // --- BAGHDAD ---
  { id: 'al-mamun', name: 'Caliph Al-Ma’mun', type: 'Ruler', period: '813–833 AD', location: 'Baghdad', details: 'Abbasid Caliph who presided over the golden age translation movement.' },
  { id: 'house-of-wisdom', name: 'House of Wisdom (Bayt al-Hikma)', type: 'Building', period: '8th–13th c. AD', location: 'Baghdad', details: 'Intellectual academy translating Greek, Sanskrit, and Persian philosophy.' },
  { id: 'al-khwarizmi', name: 'Muhammad ibn Musa al-Khwarizmi', type: 'Artifact', period: 'c. 780–850 AD', location: 'Baghdad', details: 'Father of algebra, astronomer, and developer of Hindu-Arabic numeral algorithms.' },

  // --- TENOCHTITLAN ---
  { id: 'moctezuma-ii', name: 'Moctezuma II', type: 'Ruler', period: '1502–1520 AD', location: 'Tenochtitlan', details: 'Tlatoani (emperor) of the Mexica Empire during the Spanish contact.' },
  { id: 'templo-mayor', name: 'Templo Mayor', type: 'Building', period: '1325–1521 AD', location: 'Tenochtitlan', details: 'Great dual-pyramid dedicated to rain god Tlaloc and solar war god Huitzilopochtli.' },
  { id: 'tlatelolco-market', name: 'Market of Tlatelolco', type: 'Place', period: '15th–16th c. AD', location: 'Tenochtitlan', details: 'Vast plaza where 60,000 daily traders bartered using cacao beans and textiles.' }
];

export const INITIAL_GRAPH_EDGES: GraphEdge[] = [
  // Hampi relationships
  { id: 'e1', source: 'krishnadevaraya', target: 'vijayanagara-empire', relationship: 'RULED', period: '1509–1529 AD', evidence: 'Coronation inscriptions and Amuktamalyada' },
  { id: 'e2', source: 'vijayanagara-empire', target: 'hampi-city', relationship: 'CAPITAL_OF', period: '1336–1565 AD', evidence: 'Archaeological Survey of India survey' },
  { id: 'e3', source: 'hampi-city', target: 'virupaksha-temple', relationship: 'CONTAINS', period: '14th–16th c. AD', evidence: 'Epigraphical records of Hampi' },
  { id: 'e4', source: 'krishnadevaraya', target: 'virupaksha-temple', relationship: 'EXPANDED', period: '1510 AD', evidence: 'Coronation gopuram inscription' },
  { id: 'e5', source: 'hampi-city', target: 'krishna-bazaar', relationship: 'CONTAINS', period: '16th c. AD', evidence: 'Domingo Paes narrative' },
  { id: 'e6', source: 'hampi-city', target: 'tungabhadra-river', relationship: 'BORDERED_BY', period: 'Geological', evidence: 'Deccan topography' },
  { id: 'e7', source: 'domingo-paes', target: 'hampi-city', relationship: 'DOCUMENTED', period: 'c. 1520 AD', evidence: 'Chronica dos reis de Bisnaga' },
  { id: 'e8', source: 'timmarusu', target: 'krishnadevaraya', relationship: 'ADVISED', period: '1509–1525 AD', evidence: 'Court annals' },

  // Rome relationships
  { id: 'e9', source: 'trajan', target: 'roman-empire', relationship: 'RULED', period: '98–117 AD', evidence: 'Fasti Ostienses' },
  { id: 'e10', source: 'roman-empire', target: 'rome-city', relationship: 'CAPITAL_OF', period: '27 BC – 330 AD', evidence: 'Imperial annals' },
  { id: 'e11', source: 'trajan', target: 'trajans-forum', relationship: 'COMMISSIONED', period: '112 AD', evidence: 'Dedication inscription of Trajan Column' },
  { id: 'e12', source: 'apollodorus', target: 'trajans-forum', relationship: 'DESIGNED', period: '107–112 AD', evidence: 'Cassius Dio Roman History' },
  { id: 'e13', source: 'rome-city', target: 'subura', relationship: 'CONTAINS', period: 'Imperial Era', evidence: 'Juvenal Satires' },
  { id: 'e14', source: 'rome-city', target: 'colosseum', relationship: 'CONTAINS', period: '80 AD onward', evidence: 'Flavian inscriptions' },

  // Kyoto relationships
  { id: 'e15', source: 'tokugawa-ieyasu', target: 'tokugawa-shogunate', relationship: 'FOUNDED', period: '1603 AD', evidence: 'Bakufu legal statutes' },
  { id: 'e16', source: 'tokugawa-shogunate', target: 'nijo-castle', relationship: 'FORTIFIED', period: '1603 AD', evidence: 'Kyoto Shoshidai records' },
  { id: 'e17', source: 'kyoto-city', target: 'nijo-castle', relationship: 'CONTAINS', period: '17th c. AD', evidence: 'City architectural surveys' },
  { id: 'e18', source: 'kyoto-city', target: 'gion-district', relationship: 'CONTAINS', period: 'Edo Period', evidence: 'Teahouse guild ledgers' },
  { id: 'e19', source: 'kyoto-city', target: 'nishijin', relationship: 'HOSTS_PRACTICE', period: 'Genroku Era', evidence: 'Nishijin Textile Association history' },

  // London relationships
  { id: 'e20', source: 'queen-victoria', target: 'london-city', relationship: 'REIGNED_OVER', period: '1837–1901 AD', evidence: 'Parliamentary papers' },
  { id: 'e21', source: 'joseph-bazalgette', target: 'london-city', relationship: 'ENGINEERED_SEWERS_FOR', period: '1859–1875 AD', evidence: 'Metropolitan Board of Works' },
  { id: 'e22', source: 'london-city', target: 'metropolitan-railway', relationship: 'DEVELOPED', period: '1863 AD', evidence: 'Board of Trade Railway Returns' },
  { id: 'e23', source: 'london-city', target: 'east-end', relationship: 'CONTAINS', period: '19th c. AD', evidence: 'Charles Booth Life and Labour' },

  // Alexandria relationships
  { id: 'e24', source: 'ptolemy-ii', target: 'library-of-alexandria', relationship: 'PATRONIZED', period: '284–246 BC', evidence: 'Letter of Aristeas' },
  { id: 'e25', source: 'ptolemy-ii', target: 'pharos-lighthouse', relationship: 'COMPLETED', period: 'c. 280 BC', evidence: 'Strabo Geography' },
  { id: 'e26', source: 'eratosthenes', target: 'library-of-alexandria', relationship: 'DIRECTED', period: 'c. 245–194 BC', evidence: 'Suda encyclopedic entry' },

  // Baghdad relationships
  { id: 'e27', source: 'al-mamun', target: 'house-of-wisdom', relationship: 'FOUNDED_AND_PATRONIZED', period: '813–833 AD', evidence: 'Ibn al-Nadim Kitab al-Fihrist' },
  { id: 'e28', source: 'al-khwarizmi', target: 'house-of-wisdom', relationship: 'RESEARCHED_AT', period: 'c. 820 AD', evidence: 'Algebra introduction manuscript' },

  // Tenochtitlan relationships
  { id: 'e29', source: 'moctezuma-ii', target: 'templo-mayor', relationship: 'OFFICIATED_AT', period: '1502–1520 AD', evidence: 'Florentine Codex' },
  { id: 'e30', source: 'templo-mayor', target: 'tlatelolco-market', relationship: 'COMMERCIALLY_LINKED_TO', period: '1500 AD', evidence: 'Bernal Díaz del Castillo chronicles' }
];

export class HistoricalKnowledgeGraph {
  private nodes: Map<string, GraphNode> = new Map();
  private edges: GraphEdge[] = [];

  constructor() {
    INITIAL_GRAPH_NODES.forEach(n => this.nodes.set(n.id, n));
    this.edges = [...INITIAL_GRAPH_EDGES];
  }

  public getAllNodes(): GraphNode[] {
    return Array.from(this.nodes.values());
  }

  public getAllEdges(): GraphEdge[] {
    return this.edges;
  }

  public findRelatedEntities(query: string, location?: string): {
    matchedNodes: GraphNode[];
    connectedEdges: GraphEdge[];
    graphSummary: string;
  } {
    const q = query.toLowerCase();
    const loc = location ? location.toLowerCase() : '';

    const matchedNodes = Array.from(this.nodes.values()).filter(node => {
      const nameMatch = node.name.toLowerCase().includes(q) || q.includes(node.name.toLowerCase());
      const locMatch = loc && (node.location.toLowerCase().includes(loc) || loc.includes(node.location.toLowerCase()));
      const detailsMatch = node.details.toLowerCase().includes(q);
      return nameMatch || (locMatch && (detailsMatch || q.length < 5));
    });

    if (matchedNodes.length === 0 && loc) {
      // Fallback: match by location
      matchedNodes.push(...Array.from(this.nodes.values()).filter(node => 
        node.location.toLowerCase().includes(loc) || loc.includes(node.location.toLowerCase())
      ));
    }

    const matchedIds = new Set(matchedNodes.map(n => n.id));
    const connectedEdges = this.edges.filter(edge => 
      matchedIds.has(edge.source) || matchedIds.has(edge.target)
    );

    // Also bring in 1st degree neighbor nodes for rich context
    connectedEdges.forEach(edge => {
      if (this.nodes.has(edge.source)) matchedIds.add(edge.source);
      if (this.nodes.has(edge.target)) matchedIds.add(edge.target);
    });

    const fullMatchedNodes = Array.from(matchedIds).map(id => this.nodes.get(id)!).filter(Boolean);

    // Build human-readable relational summary for LLM grounding
    const relationLines = connectedEdges.slice(0, 6).map(e => {
      const s = this.nodes.get(e.source)?.name || e.source;
      const t = this.nodes.get(e.target)?.name || e.target;
      return `• ${s} —[${e.relationship}]—> ${t} (${e.period || 'Historical'}, Source: ${e.evidence || 'Documented'})`;
    });

    const graphSummary = relationLines.length > 0 
      ? `Historical Relationships in Knowledge Graph:\n${relationLines.join('\n')}` 
      : 'No direct relational edge matches found in graph.';

    return {
      matchedNodes: fullMatchedNodes,
      connectedEdges,
      graphSummary
    };
  }
}

export const knowledgeGraph = new HistoricalKnowledgeGraph();
