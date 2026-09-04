import React, { useState, useEffect, useRef } from 'react';
import { 
  ChatMessage, 
  HistoricalTimeContext, 
  HistoricalDestination, 
  Journey, 
  Citation, 
  CharacterPersona,
  AgentActivityStep 
} from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TimelineBar } from './components/TimelineBar';
import { ChatMessageItem } from './components/ChatMessageItem';
import { CitationModal } from './components/CitationModal';
import { TimeJumpModal } from './components/TimeJumpModal';
import { PastVsPresentView } from './components/PastVsPresentView';
import { HistoricalMapView } from './components/HistoricalMapView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { CharacterSimView } from './components/CharacterSimView';
import { KnowledgeBaseModal } from './components/KnowledgeBaseModal';
import { ThreeTimePortal } from './components/ThreeTimePortal';
import { RelicsChamberView } from './components/RelicsChamberView';
import { 
  Send, 
  Sparkles, 
  Hourglass, 
  Compass, 
  ArrowRight, 
  Loader2, 
  CornerDownLeft, 
  RotateCcw, 
  MapPin, 
  Calendar,
  BookOpen,
  StopCircle,
  Box
} from 'lucide-react';

const DEFAULT_DESTINATIONS: HistoricalDestination[] = [
  {
    id: 'hampi',
    name: 'Hampi',
    country: 'India',
    era: 'Vijayanagara Empire',
    goldenYear: 1500,
    yearRange: [1336, 1565],
    tagline: 'Imperial City of Victory & Diamond Bazaars',
    description: 'Capital of the Vijayanagara Empire along the Tungabhadra River, famed for jewel trading, rock-cut architecture, and the reign of Krishnadevaraya.',
    coordinates: [15.335, 76.46],
    landmarks: ['Virupaksha Temple', 'Krishna Bazaar', 'Vittala Temple & Stone Chariot', 'Lotus Mahal'],
    characters: [
      {
        id: 'domingo-paes',
        name: 'Domingo Paes',
        role: 'Portuguese Traveler & Chronicler',
        location: 'Hampi',
        year: 1520,
        bio: 'Eyewitness chronicler who visited Vijayanagara at its absolute economic and military peak.',
        sampleGreeting: 'Greetings, traveler. I have crossed oceans to stand in this city, larger and grander than Rome itself.'
      },
      {
        id: 'timmarusu',
        name: 'Timmarusu (Appaji)',
        role: 'Prime Minister & Chief Imperial Strategist',
        location: 'Hampi',
        year: 1515,
        bio: 'Revered advisor to Emperor Krishnadevaraya responsible for statecraft and fortification.',
        sampleGreeting: 'Peace be upon your steps in Vijayanagara. How can the royal administration assist your inquiries?'
      }
    ],
    pastVsPresent: {
      past: 'A sprawling metropolis of 500,000 citizens protected by seven concentric stone fortifications. Markets overflowing with rubies, diamonds, Arabian horses, and Chinese silks.',
      present: 'A serene UNESCO World Heritage site amidst boulder-strewn hills, with farmers and pilgrims mingling among towering temple gopurams and preserved royal pavilions.'
    }
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    era: 'Pax Romana (Trajanic Zenith)',
    goldenYear: 115,
    yearRange: [27, 476],
    tagline: 'Caput Mundi — Capital of the Roman Empire',
    description: 'Center of Mediterranean power under Emperor Trajan, featuring monumental forums, the Colosseum, aqueducts, and bustling multistory insulae.',
    coordinates: [41.9028, 12.4964],
    landmarks: ["Trajan's Forum", 'Colosseum', 'Subura District', 'Pantheon'],
    characters: [
      {
        id: 'apollodorus',
        name: 'Apollodorus of Damascus',
        role: 'Master Imperial Architect',
        location: 'Rome',
        year: 112,
        bio: 'Chief architect to Emperor Trajan, designer of the Forum, Market, and Danube Bridge.',
        sampleGreeting: 'Salve, citizen. I am reviewing the marble colonnades of the Basilica Ulpia. What structural marvel brings you to our Forum?'
      }
    ],
    pastVsPresent: {
      past: 'The monumental heart of an empire of 60 million subjects. Gleaming white marble monuments juxtaposed with the cacophony, street stalls, and crowded tenements of the Subura.',
      present: 'A modern Italian metropolis where classical ruins—the Forum, Colosseum, and Palatine Hill—stand preserved in the urban core surrounded by vibrant street cafes.'
    }
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    era: 'Edo Period (Genroku Era)',
    goldenYear: 1688,
    yearRange: [1603, 1867],
    tagline: 'Imperial Capital of Tea, Silk & Zen',
    description: 'Cultural soul of Japan during the peaceful Tokugawa Shogunate, renowned for Nishijin silk weavers, tea ceremonies, and Nijo Castle.',
    coordinates: [35.0116, 135.7681],
    landmarks: ['Nijo Castle', 'Gion District', 'Nishijin Weaving Quarter', 'Kiyomizu-dera'],
    characters: [
      {
        id: 'o-haru',
        name: 'O-Haru',
        role: 'Nishijin Silk Master',
        location: 'Kyoto',
        year: 1690,
        bio: 'Master weaver crafting gold-threaded brocade kimonos for noble courts and tea masters.',
        sampleGreeting: 'Konnichiwa. Welcome to our weaving workshop in the Nishijin quarter. The shuttle has been clacking since dawn.'
      }
    ],
    pastVsPresent: {
      past: 'Wooden machiya townhouses lining orderly avenues, the scent of cedar and incense, nightingale floorboards chirping in the Shogun’s fortress.',
      present: 'The cultural capital of modern Japan, balancing preserved historic geisha quarters, wooden shrines, and high-speed Shinkansen trains.'
    }
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    era: 'Late Victorian Era',
    goldenYear: 1890,
    yearRange: [1837, 1901],
    tagline: 'Metropolis of Steam, Empire & Gaslight',
    description: 'Center of global trade and industrial transformation, connected by the steam Underground railway, Bazalgette sewers, and teeming Thames docks.',
    coordinates: [51.5074, -0.1278],
    landmarks: ['Tower Bridge Construction', 'Metropolitan Railway', 'East End Docks', 'Piccadilly Circus'],
    characters: [
      {
        id: 'edward-barker',
        name: 'Edward Barker',
        role: 'Underground Steam Engine Driver',
        location: 'London',
        year: 1890,
        bio: 'Locomotive engineer operating condensing steam engines on the Metropolitan Line through subterranean brick tunnels.',
        sampleGreeting: 'Good day to you! Mind the smoke as the engine pulls into Baker Street station. Where across the metropolis are you heading?'
      }
    ],
    pastVsPresent: {
      past: 'A city wrapped in pea-souper fogs, cobblestones resounding with hansom cabs, bustling Thames dockyards, and gaslit avenues.',
      present: 'A hyper-modern financial and cultural capital where Victorian brick warehouses have transformed into loft galleries alongside glassy skyscrapers.'
    }
  },
  {
    id: 'alexandria',
    name: 'Alexandria',
    country: 'Egypt',
    era: 'Hellenistic Ptolemaic Kingdom',
    goldenYear: -250,
    yearRange: [-332, -30],
    tagline: 'Universal Sanctuary of Knowledge & Mediterranean Seafaring',
    description: 'Cosmopolitan metropolis founded by Alexander the Great, housing the Great Library and the Pharos Lighthouse, Wonder of the Ancient World.',
    coordinates: [31.2001, 29.9187],
    landmarks: ['Great Library of Alexandria', 'Pharos Lighthouse', 'Serapeum', 'Royal Palaces Quarter'],
    characters: [
      {
        id: 'eratosthenes',
        name: 'Eratosthenes of Cyrene',
        role: 'Chief Librarian & Polymath',
        location: 'Alexandria',
        year: -240,
        bio: 'Scholar who calculated the Earth’s circumference and catalogued astronomical manuscripts in the Mouseion.',
        sampleGreeting: 'Chairete, seeker of wisdom. Within these walls we have gathered the learning of Babylon, Athens, and Memphis. What scroll do you seek?'
      }
    ],
    pastVsPresent: {
      past: 'Wide colonnaded Greek avenues overlooking the Mediterranean, monumental papyrus scriptoriums, and the towering white stone beacon of Pharos.',
      present: 'A coastal Egyptian city home to the modern Bibliotheca Alexandrina, with submerged Greco-Roman ruins resting just offshore in the eastern harbor.'
    }
  },
  {
    id: 'baghdad',
    name: 'Baghdad',
    country: 'Iraq',
    era: 'Abbasid Golden Age',
    goldenYear: 830,
    yearRange: [762, 1258],
    tagline: 'The Round City of Peace & House of Wisdom',
    description: 'Circular planned capital of the Abbasid Caliphate, epicenter of the Islamic Golden Age translation movement, algebra, and medicine.',
    coordinates: [33.3152, 44.3661],
    landmarks: ['House of Wisdom (Bayt al-Hikma)', 'Round City Concentric Walls', 'Tigris River Wharves', 'Al-Khuld Palace'],
    characters: [
      {
        id: 'al-khwarizmi',
        name: 'Muhammad ibn Musa al-Khwarizmi',
        role: 'Mathematician & Astronomer',
        location: 'Baghdad',
        year: 825,
        bio: 'Scholar at the House of Wisdom whose foundational work established algebra and introduced Hindu-Arabic numerals to the West.',
        sampleGreeting: 'Salam alaykum. In the House of Wisdom, we are reconciling the geometry of Euclid with the numerical methods of the Hindus. What calculation brings you here?'
      }
    ],
    pastVsPresent: {
      past: 'A triple-walled circular citadel with four monumental bronze gates, palace gardens nourished by canals, and academies translating world philosophy.',
      present: 'A bustling Tigris riverfront capital carrying centuries of deep Mesopotamian memory beneath its vibrant modern cultural avenues.'
    }
  },
  {
    id: 'tenochtitlan',
    name: 'Tenochtitlan',
    country: 'Mexico',
    era: 'Aztec / Mexica Empire',
    goldenYear: 1500,
    yearRange: [1325, 1521],
    tagline: 'The Floating Island City of Lake Texcoco',
    description: 'Engineered island metropolis of canals, causeways, floating chinampa gardens, and the towering dual pyramid of Templo Mayor.',
    coordinates: [19.4326, -99.1332],
    landmarks: ['Templo Mayor', 'Tlatelolco Market', 'Causeway of Iztapalapa', 'Chapultepec Aqueduct'],
    characters: [
      {
        id: 'cuauhtli',
        name: 'Cuauhtli',
        role: 'Pochteca (Merchant-Guild Guildmaster)',
        location: 'Tenochtitlan',
        year: 1502,
        bio: 'Long-distance merchant guildmaster trading quetzal feathers, cacao, and jade across Mesoamerica.',
        sampleGreeting: 'Tlazohcamati. Welcome to the great island of the Mexica. Have you come to trade cacao beans in the plaza of Tlatelolco?'
      }
    ],
    pastVsPresent: {
      past: 'A dazzling white city floating upon shimmering blue lakes, crossed by canoes, blooming chinampas, and grand causeways.',
      present: 'Modern Mexico City, built directly atop the dried lakebed, with the excavated stone foundation of Templo Mayor visible beside the Metropolitan Cathedral.'
    }
  }
];

export default function App() {
  // Navigation & View state
  const [currentTab, setCurrentTab] = useState<'chat' | 'timeline' | 'past-vs-present' | 'map' | 'graph' | 'personas' | 'relics'>('chat');
  const [destinations, setDestinations] = useState<HistoricalDestination[]>(DEFAULT_DESTINATIONS);

  // Historical Context & Active Persona
  const [currentContext, setCurrentContext] = useState<HistoricalTimeContext>({
    location: 'Hampi',
    year: 1500,
    era: 'Vijayanagara Empire',
    country: 'India'
  });
  const [activePersona, setActivePersona] = useState<CharacterPersona | null>(null);

  // Chat & Journey state
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [currentJourneyId, setCurrentJourneyId] = useState<string>('journey-init');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeAgentSteps, setActiveAgentSteps] = useState<AgentActivityStep[]>([]);

  // Modals
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [isTimeJumpOpen, setIsTimeJumpOpen] = useState(false);
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch initial destinations from server and deduplicate
  useEffect(() => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const unique = Array.from(new Map(data.map(item => [item.id, item])).values());
          setDestinations(unique);
        }
      })
      .catch(err => console.error('Failed to load destinations:', err));
  }, []);

  // Scroll to bottom when messages update (only when active messages exist)
  useEffect(() => {
    if (currentTab === 'chat' && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isStreaming, activeAgentSteps, currentTab]);

  // Handle New Journey
  const startNewJourney = (destination?: HistoricalDestination) => {
    const dest = destination || destinations[0];
    const newContext: HistoricalTimeContext = {
      location: dest.name,
      year: dest.goldenYear,
      era: dest.era,
      country: dest.country
    };

    const newId = `journey-${Date.now()}`;
    const newJourney: Journey = {
      id: newId,
      title: `${dest.name} in ${dest.goldenYear > 0 ? dest.goldenYear + ' AD' : Math.abs(dest.goldenYear) + ' BC'}`,
      timeContext: newContext,
      messages: [],
      createdAt: Date.now()
    };

    setJourneys(prev => [newJourney, ...prev]);
    setCurrentJourneyId(newId);
    setCurrentContext(newContext);
    setMessages([]);
    setActivePersona(null);
    setCurrentTab('chat');
  };

  // Handle switching journeys
  const handleSelectJourney = (journeyId: string) => {
    const j = journeys.find(item => item.id === journeyId);
    if (j) {
      setCurrentJourneyId(j.id);
      setCurrentContext(j.timeContext);
      setMessages(j.messages);
      setActivePersona(null);
      setCurrentTab('chat');
    }
  };

  // Handle Time Jump execution
  const handleExecuteTimeJump = (destination: HistoricalDestination, year: number) => {
    setIsTimeJumpOpen(false);
    const newContext: HistoricalTimeContext = {
      location: destination.name,
      year,
      era: destination.era,
      country: destination.country
    };
    setCurrentContext(newContext);
    setActivePersona(null);
    setCurrentTab('chat');

    // Automatically send an entry inquiry to launch the immersion
    const prompt = `Transport me to ${destination.name} in ${year > 0 ? year + ' AD' : Math.abs(year) + ' BC'}. What does the city look like, who is ruling, and what is daily life in the streets?`;
    handleSendMessage(prompt, newContext);
  };

  // Handle Persona Chat selection
  const handleStartPersonaChat = (persona: CharacterPersona) => {
    setActivePersona(persona);
    const newContext: HistoricalTimeContext = {
      location: persona.location,
      year: persona.year,
      era: 'Period Persona Simulation'
    };
    setCurrentContext(newContext);
    setCurrentTab('chat');

    const greetingMsg: ChatMessage = {
      id: `persona-greet-${Date.now()}`,
      role: 'assistant',
      content: persona.sampleGreeting,
      timestamp: Date.now(),
      timeContext: newContext,
      certainty: 'SIMULATION',
      certaintyExplanation: `Interactive historical persona simulation of ${persona.name} (${persona.role}) based on verified historical accounts.`,
      characterPersona: {
        id: persona.id,
        name: persona.name,
        role: persona.role,
        location: persona.location,
        year: persona.year
      }
    };
    setMessages([greetingMsg]);
  };

  // Core Chat Execution with SSE Streaming
  const handleSendMessage = async (textToSend?: string, overrideContext?: HistoricalTimeContext) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isStreaming) return;

    setInputMessage('');

    const activeCtx = overrideContext || currentContext;

    // 1. Append user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now(),
      timeContext: activeCtx
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    // 2. Setup placeholder bot message with streaming flag
    const botMsgId = `bot-${Date.now()}`;
    const initialBotMsg: ChatMessage = {
      id: botMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
      timeContext: activeCtx,
      agentSteps: [
        {
          step: 'context_identified',
          label: 'Analyzing temporal intent',
          status: 'in_progress',
          details: 'Grounding query into historical coordinate'
        }
      ]
    };

    setMessages([...updatedMessages, initialBotMsg]);
    setIsStreaming(true);
    setActiveAgentSteps([]);

    // Abort controller for cancellation
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal,
        body: JSON.stringify({
          message: query,
          history: updatedMessages.slice(-6),
          currentContext: activeCtx,
          characterPersona: activePersona ? {
            id: activePersona.id,
            name: activePersona.name,
            role: activePersona.role,
            location: activePersona.location,
            year: activePersona.year
          } : undefined
        })
      });

      if (!response.body) {
        throw new Error('No streaming body returned from server');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamBuffer = '';
      let accumulatedContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        streamBuffer += decoder.decode(value, { stream: true });
        const lines = streamBuffer.split('\n');
        streamBuffer = lines.pop() || '';

        let currentEventType = 'message';

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            currentEventType = line.replace('event: ', '').trim();
          } else if (line.startsWith('data: ')) {
            const dataRaw = line.replace('data: ', '').trim();
            if (!dataRaw) continue;

            try {
              const parsed = JSON.parse(dataRaw);

              if (currentEventType === 'activity') {
                // Update agent activity step
                setMessages(prev => prev.map(m => {
                  if (m.id !== botMsgId) return m;
                  const existingSteps = m.agentSteps || [];
                  const updatedSteps = [...existingSteps];
                  const existingIndex = updatedSteps.findIndex(s => s.step === parsed.step);
                  if (existingIndex >= 0) {
                    updatedSteps[existingIndex] = parsed;
                  } else {
                    updatedSteps.push(parsed);
                  }
                  return { ...m, agentSteps: updatedSteps };
                }));
              } else if (currentEventType === 'token') {
                // Stream text chunk
                accumulatedContent += parsed.token;
                setMessages(prev => prev.map(m => {
                  if (m.id !== botMsgId) return m;
                  return { ...m, content: accumulatedContent };
                }));
              } else if (currentEventType === 'done') {
                // Final metadata payload
                const finalResult = parsed;
                if (finalResult.timeContext) {
                  setCurrentContext(finalResult.timeContext);
                }

                setMessages(prev => prev.map(m => {
                  if (m.id !== botMsgId) return m;
                  return {
                    ...m,
                    content: finalResult.content || accumulatedContent,
                    citations: finalResult.citations,
                    certainty: finalResult.certainty,
                    certaintyExplanation: finalResult.certaintyExplanation,
                    agentSteps: finalResult.agentSteps,
                    graphEntities: finalResult.graphEntities,
                    suggestedQuestions: finalResult.suggestedQuestions,
                    timeContext: finalResult.timeContext || activeCtx,
                    isStreaming: false
                  };
                }));
              }
            } catch (jsonErr) {
              console.error('Error parsing SSE json:', jsonErr, line);
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('User cancelled stream');
      } else {
        console.error('Streaming request failed:', err);
        setMessages(prev => prev.map(m => {
          if (m.id !== botMsgId) return m;
          return {
            ...m,
            content: m.content || 'I encountered an issue accessing historical records. Please verify server connection or retry your inquiry.',
            isStreaming: false
          };
        }));
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#050506] text-[#E5E5E1] overflow-hidden font-sans select-text">
      {/* Top Application Header */}
      <Header
        currentContext={currentContext}
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenTimeJump={() => setIsTimeJumpOpen(true)}
        onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Left Navigation Sidebar */}
        <Sidebar
          destinations={destinations}
          journeys={journeys}
          currentJourneyId={currentJourneyId}
          activePersona={activePersona}
          onSelectJourney={handleSelectJourney}
          onNewJourney={startNewJourney}
          onClearPersona={() => setActivePersona(null)}
          onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
          onOpenTimeJump={() => setIsTimeJumpOpen(true)}
          onSelectTab={(tab) => setCurrentTab(tab)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Center / Main Content View Area */}
        <main className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#050506] overflow-hidden relative">
          {/* TAB 1: Chat View */}
          {currentTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
              {/* Top Physical Timeline Scrubber */}
              <TimelineBar
                destinations={destinations}
                currentYear={currentContext.year}
                currentLocation={currentContext.location}
                onSelectTimeEpoch={(loc, yr, era) => {
                  const newCtx: HistoricalTimeContext = { location: loc, year: yr, era };
                  setCurrentContext(newCtx);
                  handleSendMessage(`Take me to ${loc} in ${yr > 0 ? yr + ' AD' : Math.abs(yr) + ' BC'}. What is happening here?`, newCtx);
                }}
                onOpenTimeJump={() => setIsTimeJumpOpen(true)}
              />

              {/* Chat Scroll Area with Guaranteed Vertical Scrolling */}
              <div 
                id="chat-scroll-container"
                className="flex-1 min-h-0 overflow-y-auto px-4 md:px-8 py-6 touch-pan-y"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="max-w-4xl mx-auto">
                  {messages.length === 0 ? (
                    /* Entry / Homepage Experience with Bold Editorial Typography & Direct Portals */
                    <div className="py-6 md:py-10 pb-32 md:pb-36 flex flex-col items-center text-center space-y-7 animate-fadeIn">
                      {/* 3D Portal Visual Accent */}
                      <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center pointer-events-none">
                        <div className="absolute inset-0 z-0">
                          <ThreeTimePortal intensity={1.2} />
                        </div>
                        <div className="relative z-10 w-16 h-16 rounded-full glass border border-[#F27D26]/40 flex items-center justify-center text-[#F27D26] shadow-2xl">
                          <Hourglass className="w-7 h-7" />
                        </div>
                      </div>

                      {/* Headline with Bold Contrast and Italics */}
                      <div className="space-y-3 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-[#F27D26] mono text-xs uppercase tracking-[0.2em]">
                          <Sparkles className="w-3.5 h-3.5" />
                          TEMPORAL DISPATCH ENGINE
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal serif tracking-tight text-white leading-tight">
                          WHERE IN TIME <span className="italic text-[#F27D26] font-normal">DO YOU WANT TO GO?</span>
                        </h1>
                        <p className="text-base sm:text-lg text-[#A1A1A1] serif italic max-w-xl mx-auto">
                          “Don't just visit a place. Visit its past.”
                        </p>

                        {/* Interactive 3D Relics Vault Entry Point */}
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setCurrentTab('relics')}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F27D26]/20 via-amber-500/10 to-transparent border border-[#F27D26]/40 hover:border-[#F27D26] text-xs mono uppercase tracking-wider text-amber-200 hover:text-white transition-all shadow-lg hover:shadow-[#F27D26]/10 group active:scale-95"
                          >
                            <Box className="w-4 h-4 text-[#F27D26] group-hover:rotate-12 transition-transform" />
                            <span>Explore 3D Historical Relic Vault & Monuments</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#F27D26] group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>

                      {/* Original 6 Featured Temporal Portals */}
                      <div className="w-full max-w-3xl space-y-3 pt-1">
                        <span className="text-[10px] mono uppercase tracking-[0.25em] text-[#A1A1A1] block">
                          Featured Temporal Portals
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {[
                            { title: 'Explore Hampi in 1500', loc: 'Hampi', year: 1500, icon: '🏛️', era: 'Vijayanagara Empire' },
                            { title: 'Walk through Ancient Rome in 115 AD', loc: 'Rome', year: 115, icon: '🏺', era: 'Trajanic Zenith' },
                            { title: 'Experience Edo Kyoto in 1688', loc: 'Kyoto', year: 1688, icon: '🗡️', era: 'Genroku Era' },
                            { title: 'Explore London in 1890', loc: 'London', year: 1890, icon: '🌆', era: 'Late Victorian' },
                            { title: 'Alexandria in 250 BC', loc: 'Alexandria', year: -250, icon: '📜', era: 'Great Library Era' },
                            { title: 'Baghdad in 830 AD', loc: 'Baghdad', year: 830, icon: '🕌', era: 'House of Wisdom' }
                          ].map((pill, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                const newCtx: HistoricalTimeContext = {
                                  location: pill.loc,
                                  year: pill.year,
                                  era: pill.era
                                };
                                setCurrentContext(newCtx);
                                handleSendMessage(`Take me to ${pill.loc} in ${pill.year > 0 ? pill.year + ' AD' : Math.abs(pill.year) + ' BC'}. What does the city look like, who is ruling, and what is daily life in the streets?`, newCtx);
                              }}
                              className="flex items-center gap-3 p-4 rounded-xl glass border border-white/10 hover:border-[#F27D26]/60 hover:bg-white/[0.06] text-left transition-all group cursor-pointer shadow-lg hover:shadow-[#F27D26]/15 hover:-translate-y-0.5 active:scale-[0.98]"
                            >
                              <span className="text-2xl shrink-0">{pill.icon}</span>
                              <div className="min-w-0 flex-1">
                                <span className="text-sm font-semibold text-[#E5E5E1] group-hover:text-[#F27D26] serif block truncate">
                                  {pill.title}
                                </span>
                                <span className="text-[11px] text-[#A1A1A1] mono uppercase tracking-wider block truncate">
                                  {pill.era}
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#F27D26] group-hover:translate-x-1 transition-all shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Active Chat History */
                    <div className="space-y-4 pb-12">
                      {messages.map(m => (
                        <ChatMessageItem
                          key={m.id}
                          message={m}
                          onSelectCitation={c => setSelectedCitation(c)}
                          onSelectSuggestedQuestion={q => handleSendMessage(q)}
                          onSelectEntity={entityName => {
                            setCurrentTab('graph');
                          }}
                        />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input Bar (Signature glowing halo and glass styling from design) */}
              <div className="p-4 md:p-6 relative bg-gradient-to-t from-[#050506] via-[#050506]/95 to-transparent shrink-0 pointer-events-none">
                <div className="max-w-3xl mx-auto relative space-y-2.5 pointer-events-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#F27D26]/0 via-[#F27D26]/20 to-[#F27D26]/0 blur-md rounded-full pointer-events-none"></div>

                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="relative glass rounded-full p-2 flex items-center pr-3 border border-white/20 focus-within:border-[#F27D26]/70 transition-all shadow-2xl"
                  >
                    <input
                      type="text"
                      placeholder={
                        activePersona 
                          ? `Speak with ${activePersona.name} in ${activePersona.location}...`
                          : `Ask Chrono to take you anywhere in history...`
                      }
                      value={inputMessage}
                      onChange={e => setInputMessage(e.target.value)}
                      disabled={isStreaming}
                      className="bg-transparent flex-1 px-5 py-2 focus:outline-none text-sm serif italic text-[#E5E5E1] placeholder:text-white/30"
                    />

                    {isStreaming ? (
                      <button
                        type="button"
                        onClick={handleStopStreaming}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs mono uppercase tracking-wider transition-colors shrink-0"
                      >
                        <StopCircle className="w-4 h-4" />
                        <span>Stop</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!inputMessage.trim()}
                        className="bg-[#F27D26] text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#ff8e38] transition-transform active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-[#F27D26]/25 shrink-0"
                      >
                        Send
                      </button>
                    )}
                  </form>

                  {/* Input Subtext Context Continuity Helper */}
                  <div className="flex items-center justify-between text-[11px] mono text-[#A1A1A1] px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[#F27D26] font-bold uppercase">Anchor:</span>
                      <span>{currentContext.location.toUpperCase()} ({currentContext.year > 0 ? `${currentContext.year} AD` : `${Math.abs(currentContext.year)} BC`})</span>
                      {activePersona && (
                        <span className="text-rose-400">• Simulating: {activePersona.name}</span>
                      )}
                    </div>
                    <span className="hidden sm:inline uppercase tracking-wider text-[10px]">
                      RAG Verified • Citations Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Past vs Present View */}
          {currentTab === 'past-vs-present' && (
            <div className="flex-1 overflow-y-auto">
              <PastVsPresentView
                destinations={destinations}
                currentLocation={currentContext.location}
                onJumpToEra={(loc, yr, era) => {
                  const newCtx = { location: loc, year: yr, era };
                  setCurrentContext(newCtx);
                  setCurrentTab('chat');
                  handleSendMessage(`Tell me what daily life was like in ${loc} in ${yr > 0 ? yr + ' AD' : Math.abs(yr) + ' BC'} during the ${era}.`, newCtx);
                }}
              />
            </div>
          )}

          {/* TAB 3: Historical Map View */}
          {currentTab === 'map' && (
            <div className="flex-1 overflow-y-auto">
              <HistoricalMapView
                destinations={destinations}
                currentLocation={currentContext.location}
                onSelectDestination={dest => {
                  const newCtx = { location: dest.name, year: dest.goldenYear, era: dest.era, country: dest.country };
                  setCurrentContext(newCtx);
                  setCurrentTab('chat');
                  handleSendMessage(`Take me through ${dest.name} in ${dest.goldenYear > 0 ? dest.goldenYear + ' AD' : Math.abs(dest.goldenYear) + ' BC'}. What were its principal landmarks?`, newCtx);
                }}
                onAskAboutLandmark={(landmark, dest) => {
                  const newCtx = { location: dest.name, year: dest.goldenYear, era: dest.era, country: dest.country };
                  setCurrentContext(newCtx);
                  setCurrentTab('chat');
                  handleSendMessage(`Tell me the detailed history and archaeological evidence regarding the ${landmark} in ${dest.name}.`, newCtx);
                }}
              />
            </div>
          )}

          {/* TAB 4: Knowledge Graph View */}
          {currentTab === 'graph' && (
            <div className="flex-1 overflow-y-auto">
              <KnowledgeGraphView
                currentLocation={currentContext.location}
                onSelectEntityForChat={(entityName, loc) => {
                  setCurrentTab('chat');
                  handleSendMessage(`Tell me about ${entityName} in ${loc} and how they connect to the political, architectural, and cultural history of the period.`);
                }}
              />
            </div>
          )}

          {/* TAB 5: Character Simulation View */}
          {currentTab === 'personas' && (
            <div className="flex-1 overflow-y-auto">
              <CharacterSimView
                destinations={destinations}
                onStartPersonaChat={handleStartPersonaChat}
              />
            </div>
          )}

          {/* TAB 6: 3D Historical Relic Vault View */}
          {currentTab === 'relics' && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <RelicsChamberView
                destinations={destinations}
                currentLocation={currentContext.location}
                onTimeJumpToRelic={(location, year, era, prompt) => {
                  const newCtx = { location, year, era };
                  setCurrentContext(newCtx);
                  setCurrentTab('chat');
                  if (prompt) {
                    handleSendMessage(prompt, newCtx);
                  }
                }}
              />
            </div>
          )}
        </main>
      </div>

      {/* MODAL: Citation Inspector */}
      <CitationModal
        citation={selectedCitation}
        onClose={() => setSelectedCitation(null)}
      />

      {/* MODAL: Time Jump Chamber */}
      <TimeJumpModal
        destinations={destinations}
        isOpen={isTimeJumpOpen}
        onClose={() => setIsTimeJumpOpen(false)}
        onExecuteJump={handleExecuteTimeJump}
      />

      {/* MODAL: Knowledge Base & RAG Ingestion */}
      <KnowledgeBaseModal
        isOpen={isKnowledgeBaseOpen}
        onClose={() => setIsKnowledgeBaseOpen(false)}
      />
    </div>
  );
}
