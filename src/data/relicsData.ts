export interface RelicHotspot {
  id: string;
  name: string;
  position: [number, number, number];
  description: string;
  historicalDetail: string;
}

export interface Historical3DRelic {
  id: string;
  name: string;
  title: string;
  location: string;
  era: string;
  year: number;
  yearDisplay: string;
  civilization: string;
  materialDesc: string;
  overview: string;
  archaeologicalNotes: string;
  dimensions: string;
  currentStatus: string;
  modelType: 'colosseum' | 'stone_chariot' | 'astrolabe' | 'pyramid' | 'pagoda' | 'chronometer';
  accentColor: string;
  suggestedPrompt: string;
  hotspots: RelicHotspot[];
}

export const HISTORICAL_RELICS: Historical3DRelic[] = [
  {
    id: 'colosseum-rome',
    name: 'Flavian Amphitheatre (Colosseum)',
    title: 'The Great Roman Colosseum',
    location: 'Rome',
    era: 'Pax Romana / Trajanic Zenith',
    year: 115,
    yearDisplay: '115 AD',
    civilization: 'Imperial Roman Empire',
    materialDesc: 'Travertine limestone, tuff volcanic rock, Roman hydraulic concrete (pozzolana)',
    overview: 'Commissioned under Emperor Vespasian in 72 AD and completed under Titus in 80 AD, this monumental elliptical amphitheatre seated upwards of 50,000 spectators for gladiatorial munera, venationes, and staged naval naumachiae.',
    archaeologicalNotes: 'Archaeological excavations in the subterranean hypogeum reveal an elaborate network of hoists, trapdoors, and animal pens, while the exterior facade showcases classical orders advancing tier-by-tier from Doric to Ionic to Corinthian.',
    dimensions: '189m length × 156m width × 48m height',
    currentStatus: 'Standing Monument / UNESCO World Heritage Site (Rome, Italy)',
    modelType: 'colosseum',
    accentColor: '#F59E0B',
    suggestedPrompt: 'Explain the engineering innovations of the Roman Colosseum in 115 AD, including the hypogeum elevator pulleys and velarium awning system.',
    hotspots: [
      {
        id: 'c-arcades',
        name: 'Triple-Tiered Exterior Arcades',
        position: [0, 1.8, 4.8],
        description: '80 arched entrances on each tier',
        historicalDetail: 'Each ground entrance was numbered (I through LXXVI for the public, with 4 unnumbered imperial portals) allowing 50,000 citizens to evacuate in under 15 minutes through the vomitoria.'
      },
      {
        id: 'c-arena',
        name: 'Arena Floor & Hypogeum',
        position: [0, 0.4, 0],
        description: 'Wooden floor covered with yellow absorbent sand (harena)',
        historicalDetail: 'Beneath the timber deck lay a two-level subterranean staging area featuring 32 capstans and manual pulley elevators that hoisted apex predators and gladiators directly onto the arena floor.'
      },
      {
        id: 'c-velarium',
        name: 'Velarium Awning Masts',
        position: [0, 3.4, 3.8],
        description: '240 stone corbels and timber rigging poles',
        historicalDetail: 'Sailors from the Roman imperial fleet stationed at Misenum operated a retractable canvas canopy that shaded spectators from the scorching Mediterranean sun.'
      }
    ]
  },
  {
    id: 'stone-chariot-hampi',
    name: 'Vittala Temple Stone Chariot',
    title: 'Sacred Granite Chariot of Vijayanagara',
    location: 'Hampi',
    era: 'Vijayanagara Golden Age',
    year: 1500,
    yearDisplay: '1500 AD',
    civilization: 'Vijayanagara Empire (Sangama / Tuluva Dynasty)',
    materialDesc: 'Carved monolithic chlorite schist & modular interlocking granite blocks',
    overview: 'Dedicated to Garuda, the celestial mount of Lord Vishnu, this breathtaking stone shrine mimics a ceremonial processional chariot with intricately carved rotating stone wheels, floral bands, and pillared sanctum.',
    archaeologicalNotes: 'Though appearing monolithic, the chariot was built from interlocking granite slabs fitted with master precision. The wheels once rotated freely on concentric stone axles before British conservationists stabilized them.',
    dimensions: '6.5m height × 4.2m width × 5.1m length',
    currentStatus: 'Vittala Temple Complex / UNESCO World Heritage Site (Karnataka, India)',
    modelType: 'stone_chariot',
    accentColor: '#F27D26',
    suggestedPrompt: 'Describe the rituals, festivals, and architectural craftsmanship surrounding the Stone Chariot in Hampi during Emperor Krishnadevaraya’s reign.',
    hotspots: [
      {
        id: 'sc-wheels',
        name: 'Sculpted Granite Wheels',
        position: [-2.2, -0.6, 2.0],
        description: 'Lotus-motif stone wheels with central axle caps',
        historicalDetail: 'Carved with 16 spokes representing the cosmic temporal divisions. Historical chronicles state pilgrims would gently spin the wheels during the annual Rathotsava festival.'
      },
      {
        id: 'sc-vimana',
        name: 'Stepped Dravidian Superstructure',
        position: [0, 2.2, 0],
        description: 'Multi-tiered pyramidal shrine tower (Vimana)',
        historicalDetail: 'Originally crowned with a painted brick and stucco tower similar to those depicted in 16th-century Vijayanagara miniature murals, flanked by celestial attendants.'
      },
      {
        id: 'sc-elephants',
        name: 'Guardian Stone Elephants',
        position: [0, -0.7, 3.2],
        description: 'Carved pachyderm guardians flanking the frontal steps',
        historicalDetail: 'Placed in the 19th century to replace broken horse sculptures whose hind legs are still partially visible carved into the frontal granite chassis.'
      }
    ]
  },
  {
    id: 'astrolabe-baghdad',
    name: 'Planispheric Astrolabe & Armillary Sphere',
    title: 'The Celestial Astrolabe of the House of Wisdom',
    location: 'Baghdad',
    era: 'Islamic Golden Age / Abbasid Caliphate',
    year: 830,
    yearDisplay: '830 AD',
    civilization: 'Abbasid Caliphate (Bayt al-Hikma)',
    materialDesc: 'Cast and engraved brass, gilding, hand-punched copper rivets',
    overview: 'The pinnacle of medieval astronomical instrumentation, combining celestial sphere mapping, timekeeping, navigation, and solar observation into a portable analogue brass computer created by polymaths like al-Khwarizmi and al-Farghani.',
    archaeologicalNotes: 'Abbasid astrolabes feature interchangeable latitude plates (tympan) engraved with stereographic projections of the celestial horizon, surmounted by an openwork skeletal rete with star pointers.',
    dimensions: '18cm diameter × 1.2cm thickness (Armillary rig: 45cm diameter)',
    currentStatus: 'Museum of Islamic Art / British Museum Collection',
    modelType: 'astrolabe',
    accentColor: '#38BDF8',
    suggestedPrompt: 'Explain how Islamic astronomers in Baghdad used the astrolabe to calculate prayer times, celestial coordinates, and planetary orbits in 830 AD.',
    hotspots: [
      {
        id: 'ast-rete',
        name: 'Openwork Skeletal Rete',
        position: [0, 0.2, 0.4],
        description: 'Rotating celestial fretwork pointing to principal stars',
        historicalDetail: 'The curved dagger-like pointers mark prominent stars such as Vega, Altair, and Aldebaran, rotating over the fixed geographic horizon plate beneath.'
      },
      {
        id: 'ast-ecliptic',
        name: 'Ecliptic Zodiac Ring',
        position: [0.8, 0.5, 0.2],
        description: 'Off-center ring divided into 12 zodiac signs and 360 degrees',
        historicalDetail: 'Indicates the annual path of the Sun across the celestial sphere. Aligning the solar degree with the current date allowed instantaneous time determination day or night.'
      },
      {
        id: 'ast-armillary',
        name: 'Gyroscopic Armillary Rings',
        position: [0, 1.8, 0],
        description: 'Concentric brass meridians, equators, and colures',
        historicalDetail: 'Invented originally in Hellenistic Alexandria and perfected in Baghdad, this 3D observational model demonstrated Earth’s position relative to the celestial equator and solstice points.'
      }
    ]
  },
  {
    id: 'pyramid-giza',
    name: 'The Great Pyramid & Electrum Pyramidion',
    title: 'The Great Pyramid of Khufu & Sacred Obelisk',
    location: 'Giza / Alexandria',
    era: 'Old Kingdom / Hellenistic Ptolemaic Horizon',
    year: -250,
    yearDisplay: '250 BC (Constructed 2560 BC)',
    civilization: 'Ancient Egypt (Fourth Dynasty / Ptolemaic Restoration)',
    materialDesc: 'Nummulitic limestone core, fine Tura white casing stones, rose Aswan granite, electrum capstone',
    overview: 'The only surviving wonder of the ancient world. Rising 146.6 meters when intact, it was encased in gleaming polished white limestone that shone like a beacon across the Nile valley, crowned by a radiant electrum pyramidion.',
    archaeologicalNotes: 'Oriented to true north within 4 minutes of arc. Internal architecture includes the Descending Corridor, Ascending Passage, Queen’s Chamber, Grand Gallery, and the King’s Chamber with relieving granite ceiling beams.',
    dimensions: '230.3m base width × 146.6m original height',
    currentStatus: 'Giza Plateau / UNESCO World Heritage Site (Egypt)',
    modelType: 'pyramid',
    accentColor: '#EAB308',
    suggestedPrompt: 'Describe the symbolic meaning and monumental engineering of the Great Pyramid and its gleaming gold capstone as seen in antiquity.',
    hotspots: [
      {
        id: 'pyr-capstone',
        name: 'Gilded Electrum Pyramidion',
        position: [0, 2.8, 0],
        description: 'Cap-stone alloyed of gold and silver representing the primeval Benben',
        historicalDetail: 'Catching the first rays of dawn, the electrum pyramidion reflected dazzling sunlight across miles of desert, embodying the sun god Ra emerging from the primordial waters of Nun.'
      },
      {
        id: 'pyr-casing',
        name: 'Fine Tura Limestone Casing',
        position: [1.8, 0.4, 1.8],
        description: 'Polished white angled mantle stones fitted to 0.5mm precision',
        historicalDetail: 'Before being stripped by 14th-century builders for Cairo fortifications, over 100,000 polished Tura casing stones formed a mirror-smooth incline sloping at 51°50’40”.'
      },
      {
        id: 'pyr-obelisk',
        name: 'Monolithic Rose Granite Obelisk',
        position: [-3.2, 0.8, 2.5],
        description: 'Sacred sun needle quarried from the southern cataracts of Aswan',
        historicalDetail: 'Carved from a single unbroken piece of red granite and inscribed with hieroglyphic eulogies, obelisks channeled divine solar power to the temple complex.'
      }
    ]
  },
  {
    id: 'pagoda-kyoto',
    name: 'Five-Tiered Pagoda & Torii Gate',
    title: 'The Sacred Five-Tier Pagoda & Vermilion Torii',
    location: 'Kyoto',
    era: 'Genroku Era / Edo Period',
    year: 1688,
    yearDisplay: '1688 AD',
    civilization: 'Tokugawa Shogunate (Japan)',
    materialDesc: 'Japanese cypress (hinoki), zelkova timber, copper shingles, vermilion lacquer',
    overview: 'A masterwork of traditional Japanese timber architecture (daiku). The five tiers symbolize the five Buddhist cosmic elements: Earth (chi), Water (sui), Fire (ka), Wind (fū), and Void (kū), crowned by a sacred copper sorin finial.',
    archaeologicalNotes: 'Engineered with an earthquake-resistant central suspended timber (shinbashira) that acts as an independent harmonic pendulum, allowing the stacked bracketed stories to snake counter to seismic shocks without collapsing.',
    dimensions: '55m height (tallest historic wooden pagoda in Japan)',
    currentStatus: 'Tō-ji Temple / Kyoto Cultural Heritage Site (Kyoto, Japan)',
    modelType: 'pagoda',
    accentColor: '#EC4899',
    suggestedPrompt: 'Explain how the independent shinbashira pendulum and bracket eaves allow Japanese wooden pagodas to survive major earthquakes for centuries.',
    hotspots: [
      {
        id: 'pag-sorin',
        name: 'Sacred Bronze Sōrin Spire',
        position: [0, 3.4, 0],
        description: 'Nine-ring finial with sacred jewel (hōju) and water flames',
        historicalDetail: 'The copper spire serves both as an antenna connecting the earthly shrine to the heavens and as an early lightning dissipator, with symbols of water to spiritually ward off fire.'
      },
      {
        id: 'pag-eaves',
        name: 'Flared Overhanging Eaves (Noki)',
        position: [1.6, 1.2, 0],
        description: 'Deep cantilevered eaves supported by complex tokyō bracket systems',
        historicalDetail: 'Projecting up to 4 meters past the wall line to shield vulnerable cedar wood joinery from driving monsoon rains while allowing low winter sunlight to enter.'
      },
      {
        id: 'pag-torii',
        name: 'Vermilion Shinto Torii Arch',
        position: [-3.0, -0.4, 2.2],
        description: 'Curved kasagi header beam marking the gateway to the sacred realm',
        historicalDetail: 'The vibrant cinnabar-red lacquer spiritually repelled evil spirits while preserving the wood against fungal decay and humidity.'
      }
    ]
  },
  {
    id: 'chronometer-london',
    name: 'Victorian Astronomical Chronometer',
    title: 'The Great Clockwork & Maritime Chronometer',
    location: 'London',
    era: 'Victorian Industrial Era',
    year: 1890,
    yearDisplay: '1890 AD',
    civilization: 'British Empire (Victorian Age)',
    materialDesc: 'Lacquered brass, tempered blued steel, bimetallic balance, ruby jewel bearings',
    overview: 'At the heart of global maritime navigation and industrial Greenwich Mean Time, high-precision chronometers and tower escapements transformed human perception of time from natural solar cycles into synchronized mechanical seconds.',
    archaeologicalNotes: 'Incorporated Thomas Earnshaw’s spring detent escapement and John Harrison’s temperature-compensating bimetallic balance wheels, allowing ships to pinpoint longitude across stormy oceans without losing a second over months at sea.',
    dimensions: '32cm chassis diameter × 22cm height',
    currentStatus: 'Royal Observatory Greenwich / Science Museum London',
    modelType: 'chronometer',
    accentColor: '#10B981',
    suggestedPrompt: 'Describe how Victorian horologists built high-precision marine chronometers and the Great Clock of Westminster in 1890.',
    hotspots: [
      {
        id: 'chr-escapement',
        name: 'Deadbeat Escapement & Balance Wheel',
        position: [0, 0.4, 0.8],
        description: 'Ruby-jeweled impulse pallets and helical hairspring',
        historicalDetail: 'Releases exactly one tooth of the escape wheel per oscillation. The ruby jewel bearings minimized mechanical friction to almost zero, ensuring millisecond consistency.'
      },
      {
        id: 'chr-gears',
        name: 'Intermeshing Epicyclic Brass Cogs',
        position: [1.2, -0.2, 0],
        description: 'Gear train cut to mathematical involute tooth profiles',
        historicalDetail: 'Converts the unwinding torque of the fusee spring barrel into high-speed rotational energy driving the seconds, minutes, and astronomical lunar cycle indicators.'
      },
      {
        id: 'chr-dial',
        name: 'Enamel Roman Chapter Ring',
        position: [0, 1.8, 0],
        description: 'Kiln-fired white enamel with hand-painted Roman numerals and blued steel hands',
        historicalDetail: 'Fired at 800°C to create an impervious, non-tarnishing face calibrated to Greenwich Mean Time (GMT), adopted as the worldwide international standard at the 1884 Prime Meridian Conference.'
      }
    ]
  }
];
