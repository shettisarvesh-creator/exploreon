export type CertaintyLevel = 'VERIFIED' | 'RECONSTRUCTION' | 'SIMULATION';

export interface HistoricalTimeContext {
  location: string;
  year: number;
  era: string;
  country?: string;
  isEstimatedYear?: boolean;
}

export interface Citation {
  id: string;
  index: number;
  title: string;
  source: string;
  sourceType: 'Academic' | 'Archaeological' | 'Primary Source' | 'Chronicle' | 'Museum Archive';
  snippet: string;
  yearStart: number;
  yearEnd: number;
  location: string;
  reliability: 'high' | 'medium';
  whyItSupports?: string;
}

export interface AgentActivityStep {
  step: 'context_identified' | 'sources_found' | 'verifying_evidence' | 'preparing_response';
  label: string;
  details?: string;
  status: 'waiting' | 'in_progress' | 'completed';
}

export interface GraphEntityMention {
  name: string;
  type: string;
  relationship?: string;
  connectedTo?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  timeContext?: HistoricalTimeContext;
  citations?: Citation[];
  certainty?: CertaintyLevel;
  certaintyExplanation?: string;
  agentSteps?: AgentActivityStep[];
  graphEntities?: GraphEntityMention[];
  characterPersona?: {
    id?: string;
    name: string;
    role: string;
    location?: string;
    year?: number;
  };
  suggestedQuestions?: string[];
  isStreaming?: boolean;
}

export interface Journey {
  id: string;
  title: string;
  location?: string;
  year?: number;
  era?: string;
  timeContext: HistoricalTimeContext;
  createdAt: number;
  lastActive?: number;
  messages: ChatMessage[];
}

export interface GraphNode {
  id: string;
  name: string;
  type: 'Ruler' | 'Dynasty' | 'Place' | 'Building' | 'Event' | 'Practice' | 'Artifact';
  period: string;
  location: string;
  details: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: string;
  period?: string;
  evidence?: string;
}

export interface HistoricalKnowledgeDoc {
  id: string;
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
  content: string;
  entities: string[];
}

export interface HistoricalPersona {
  id: string;
  name: string;
  role: string;
  location: string;
  year: number;
  era?: string;
  iconName?: string;
  bio?: string;
  shortBio?: string;
  perspective?: string;
  sampleGreeting?: string;
  greeting?: string;
}

export type CharacterPersona = HistoricalPersona;

export interface HistoricalDestination {
  id: string;
  name: string;
  region?: string;
  country?: string;
  modernCountry?: string;
  coordinates: [number, number]; // [lat, lng]
  goldenYear: number;
  yearRange: [number, number];
  era: string;
  tagline: string;
  description: string;
  suggestedPrompts?: string[];
  landmarks: string[];
  characters: HistoricalPersona[];
  pastVsPresent: {
    past?: string;
    present?: string;
    pastYear?: number;
    pastTitle?: string;
    pastOverview?: string;
    pastKeyPoints?: string[];
    modernTitle?: string;
    modernOverview?: string;
    modernKeyPoints?: string[];
  };
}
