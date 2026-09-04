import { HistoricalKnowledgeDoc, HistoricalDestination } from '../src/types';

export const HISTORICAL_DOCS: HistoricalKnowledgeDoc[] = [
  // --- HAMPI / VIJAYANAGARA EMPIRE (~1500 AD) ---
  {
    id: 'hampi-001',
    title: 'Chronicles of the Vijayanagara Capital by Domingo Paes (c. 1520)',
    location: 'Hampi',
    country: 'India',
    yearStart: 1490,
    yearEnd: 1530,
    period: 'Vijayanagara Empire (Tuluva Dynasty)',
    topic: 'Urban Geography & Grandeur',
    source: 'The Portuguese Chronicle of Domingo Paes (Narrative of the City of Bisnaga)',
    sourceType: 'Primary Source',
    reliability: 'high',
    content: 'The city of Vijayanagara (Hampi) is as large as Rome, and very beautiful to the sight; it is full of groves of trees within it, in the gardens of the houses, and many conduits of water which flow into the midst of it. In many places there are lakes; and the king has close to his palace a palm-grove and other rich-bearing fruit-trees. The people in this city are countless in number, so that I will not estimate them for fear people might think it an exaggeration; but what I saw was a truly vast population, with markets brimming with rubies, diamonds, emeralds, and pearls, sold openly by the seers.',
    entities: ['Hampi', 'Vijayanagara Empire', 'Domingo Paes', 'Krishnadevaraya', 'Tungabhadra River']
  },
  {
    id: 'hampi-002',
    title: 'Archaeological Survey of India Monograph: Hydraulic & Temple Architecture of Vijayanagara',
    location: 'Hampi',
    country: 'India',
    yearStart: 1450,
    yearEnd: 1565,
    period: 'Vijayanagara Empire',
    topic: 'Architecture & Engineering',
    source: 'ASI Monograph Series: Sacred and Royal Centres of Vijayanagara',
    sourceType: 'Archaeological',
    reliability: 'high',
    content: 'The city was engineered around the granite boulder landscape along the southern bank of the Tungabhadra River. The Virupaksha Temple features a towering eleven-storey eastern gopuram (52 meters tall) renovated and expanded by Emperor Krishnadevaraya in 1509–1510 AD to celebrate his coronation. Complex stone aqueducts and earthenware conduits brought fresh river water to the Royal Centre, feeding the Stepped Tank (Pushkarani) and the Queen’s Bath, demonstrating sophisticated hydraulic mastery in a semi-arid Deccan plateau.',
    entities: ['Hampi', 'Virupaksha Temple', 'Krishnadevaraya', 'Pushkarani', 'Tungabhadra River']
  },
  {
    id: 'hampi-003',
    title: 'Daily Life, Diet and Bazaar Commerce in 16th-Century Vijayanagara',
    location: 'Hampi',
    country: 'India',
    yearStart: 1480,
    yearEnd: 1540,
    period: 'Vijayanagara Empire',
    topic: 'Daily Life & Cuisine',
    source: 'Journal of South Asian Historical Studies (Vol. 42: Bazaars of the Deccan)',
    sourceType: 'Academic',
    reliability: 'high',
    content: 'In the Krishna Bazaar and Hampi Bazaar streets running in front of major temples, merchants sold grains, pulses, camphor, musk, and silks from China. Daily diet among commoners and pilgrims was predominantly vegetarian, featuring steamed aromatic rice, sambar-like lentil stews spiced with black pepper and mustard seeds (chili was only newly arriving from the New World), jackfruit curries, sweet payasam made with jaggery and coconut milk, served on freshly cut banana leaves. Betel leaf (paan) with areca nut and edible lime was chewed continuously after meals across all social strata as a symbol of hospitality.',
    entities: ['Hampi', 'Krishna Bazaar', 'Vijayanagara Empire', 'Daily Life', 'Cuisine']
  },
  {
    id: 'hampi-004',
    title: 'Reign and Military Administration of Emperor Krishnadevaraya (1509–1529 AD)',
    location: 'Hampi',
    country: 'India',
    yearStart: 1509,
    yearEnd: 1529,
    period: 'Vijayanagara Empire',
    topic: 'Governance & Military',
    source: 'Amuktamalyada Analysis & Fernão Nunes Chronicles',
    sourceType: 'Chronicle',
    reliability: 'high',
    content: 'Emperor Krishnadevaraya of the Tuluva Dynasty governed Vijayanagara during its cultural zenith. He maintained a standing cavalry supplied with prime Arabian and Persian warhorses imported through the western port of Bhatkal. His treatise on statecraft, the Amuktamalyada (written in Telugu), outlines the duty of the king to build irrigation reservoirs, protect merchants, patronize poets (the Ashtadiggajas), and administer swift civil justice in the royal court with his prime minister Timmarusu.',
    entities: ['Krishnadevaraya', 'Vijayanagara Empire', 'Timmarusu', 'Ashtadiggajas', 'Hampi']
  },

  // --- ANCIENT ROME (~100-117 AD, TRAJAN / HADRIAN) ---
  {
    id: 'rome-001',
    title: 'Excavations and Epigraphy of Trajan’s Forum and Market (Forum Traiani)',
    location: 'Rome',
    country: 'Italy',
    yearStart: 100,
    yearEnd: 130,
    period: 'High Roman Empire (Nerva-Antonine Dynasty)',
    topic: 'Urban Architecture & Commerce',
    source: 'Capitoline Museum Archaeological Bulletin: The Trajanic Complex',
    sourceType: 'Archaeological',
    reliability: 'high',
    content: 'Dedicated in 112–113 AD by Emperor Trajan and designed by the master architect Apollodorus of Damascus, Trajan’s Forum was the largest imperial forum in Rome. Adjacent to it stood Trajan’s Market (Mercatus Traiani), a multi-level concrete and brick shopping complex featuring over 150 tabernae (shops and administrative offices). Merchants traded Spanish olive oil in Dressel 20 amphorae, garum fish sauce from Hispania and North Africa, Egyptian grain, and Greek marble.',
    entities: ['Rome', 'Trajan', 'Apollodorus of Damascus', 'Trajan’s Forum', 'Roman Empire']
  },
  {
    id: 'rome-002',
    title: 'Plebeian Living Conditions in the Subura and Insulae of Rome',
    location: 'Rome',
    country: 'Italy',
    yearStart: 80,
    yearEnd: 140,
    period: 'Roman Empire',
    topic: 'Daily Life & Housing',
    source: 'Juvenal Satires & Roman Urban Archaeology Corpus',
    sourceType: 'Academic',
    reliability: 'high',
    content: 'While senators lived in spacious domus estates on the Palatine Hill, the vast majority of Rome’s million residents resided in multistory timber-and-brick apartment blocks called insulae in congested districts like the Subura. Upper floors lacked running water, latrines, or hearths; chamber pots were emptied into street cesspools or out windows. The populace relied on public thermae (baths) such as the Baths of Trajan for bathing, exercise, and social interaction, and purchased hot food from street cookshops (thermopolia).',
    entities: ['Rome', 'Subura', 'Insulae', 'Baths of Trajan', 'Thermopolium']
  },
  {
    id: 'rome-003',
    title: 'Roman Diet, Annona Grain Dole, and Culinary Culture under Trajan',
    location: 'Rome',
    country: 'Italy',
    yearStart: 90,
    yearEnd: 130,
    period: 'Roman Empire',
    topic: 'Food & Economy',
    source: 'De Re Coquinaria (Apicius Traditions) & Epigraphical Records of Ostia',
    sourceType: 'Academic',
    reliability: 'high',
    content: 'Over 200,000 male Roman citizens received the annona civica—free monthly rations of grain shipped from Alexandria and Carthage through Rome’s port at Ostia Antica. The daily diet consisted of puls (spelt porridge), dark crusty wheat bread, sheep’s milk cheese, olives, figs, and watered wine sweetened with honey or spiced with rue. The ubiquitous seasoning was garum (fermented fish entrails sauce), prized for its intense umami salinity in both humble stews and elite banquets.',
    entities: ['Rome', 'Annona', 'Ostia Antica', 'Garum', 'Roman Diet']
  },

  // --- EDO JAPAN / KYOTO & EDO (~1650-1700 AD) ---
  {
    id: 'edo-001',
    title: 'The Tokugawa Shogunate and Kyoto Royal Court Governance',
    location: 'Kyoto',
    country: 'Japan',
    yearStart: 1603,
    yearEnd: 1720,
    period: 'Early Edo Period (Tokugawa Shogunate)',
    topic: 'Politics & Social Hierarchy',
    source: 'Records of the Kyoto Shoshidai & Tokugawa Legal Decrees',
    sourceType: 'Academic',
    reliability: 'high',
    content: 'During the Edo period, political power resided in Edo (modern Tokyo) under the Tokugawa Shogun, while Kyoto remained the imperial capital and cultural heart where the Emperor reigned as a sacred figurehead. The Shogunate enforced the strict four-tier class system (Shinokosho: Samurai, Farmers, Artisans, Merchants) and monitored Kyoto through the Kyoto Shoshidai military governor based at Nijo Castle, renowned for its "nightingale floors" (uguisubari) designed to chirp when walked upon.',
    entities: ['Kyoto', 'Tokugawa Shogunate', 'Nijo Castle', 'Edo Period', 'Samurai']
  },
  {
    id: 'edo-002',
    title: 'Chonin Merchant Culture, Pleasure Quarters, and Kimono Traditions in Kyoto',
    location: 'Kyoto',
    country: 'Japan',
    yearStart: 1640,
    yearEnd: 1710,
    period: 'Edo Period (Genroku Era)',
    topic: 'Culture & Daily Life',
    source: 'Ihara Saikaku Literary Records & Nishijin Textile Guild Archives',
    sourceType: 'Museum Archive',
    reliability: 'high',
    content: 'In Kyoto’s Nishijin district, master weavers produced sumptuously dyed silk brocades and yuzen-dyed kimonos for nobles and wealthy merchant wives. Despite official sumptuary edicts forbidding merchants from overt displays of wealth, townspeople (chonin) expressed luxury through exquisite inner robe linings (uraji). In Gion and the teahouse districts along the Kamo River, the arts of the tea ceremony (chanoyu), flower arranging (ikebana), and koto music flourished alongside early kabuki theaters.',
    entities: ['Kyoto', 'Nishijin', 'Gion', 'Chonin', 'Chanoyu']
  },
  {
    id: 'edo-003',
    title: 'Culinary Traditions of Kyoto and Edo Street Life',
    location: 'Kyoto',
    country: 'Japan',
    yearStart: 1650,
    yearEnd: 1720,
    period: 'Edo Period',
    topic: 'Cuisine & Gastronomy',
    source: 'Edo Ryori Shuto & Kyo-Ryori Culinary Treatises',
    sourceType: 'Primary Source',
    reliability: 'high',
    content: 'Kyoto cuisine (Kyo-ryori) emphasized seasonal aesthetics, subtle umami from kombu kelp dashi (since Kyoto was inland, fresh sea fish was scarce), preserved fish like salted mackerel (shime saba) brought along the Mackerel Highway, seasonal vegetables (Kyo-yasai), and delicately seasoned tofu prepared at temple gates. In contrast, working Edo witnessed the explosion of fast-food stalls selling buckwheat soba noodles, nigiri sushi dipped in soy sauce, and skewered grilled unagi (eel).',
    entities: ['Kyoto', 'Kyo-ryori', 'Edo Period', 'Tofu', 'Dashi']
  },

  // --- VICTORIAN LONDON (~1890 AD) ---
  {
    id: 'london-001',
    title: 'Charles Booth’s Inquiry into Life and Labour in London (1889–1891)',
    location: 'London',
    country: 'United Kingdom',
    yearStart: 1885,
    yearEnd: 1895,
    period: 'Late Victorian Era',
    topic: 'Urban Geography & Social Stratification',
    source: 'Charles Booth Poverty Maps & London School of Economics Archives',
    sourceType: 'Academic',
    reliability: 'high',
    content: 'By 1890, London was the metropolis of the British Empire, numbering over 5.5 million inhabitants. Charles Booth’s meticulous street-by-street social mapping classified London into vivid gradients: from the wealthy aristocracy residing in Mayfair townhouses (black-suited gentlemen and corset-gowned ladies) to the dense, impoverished dockland tenements of Whitechapel and Spitalfields in the East End, where casual laborers competed for daily dock work amid constant coal-smoke fog (the infamous pea-souper fogs).',
    entities: ['London', 'Victorian Era', 'Charles Booth', 'East End', 'Mayfair']
  },
  {
    id: 'london-002',
    title: 'Metropolitan Infrastructure: Steam Undergound, Bazalgette Sewers, and Gaslight',
    location: 'London',
    country: 'United Kingdom',
    yearStart: 1870,
    yearEnd: 1900,
    period: 'Victorian Era',
    topic: 'Engineering & Technology',
    source: 'Records of the Metropolitan Board of Works & Railway Historical Society',
    sourceType: 'Archaeological',
    reliability: 'high',
    content: 'Victorian engineering transformed London into a modern machine. Following the Great Stink of 1858, Sir Joseph Bazalgette designed an underground network of 82 miles of enclosed brick intercepting sewers and Thames embankments (Victoria, Albert, Chelsea). Above ground, horse-drawn omnibuses and Hansom cabs clattered across wood-block and granite streets, while beneath them, condensing steam locomotives on the Metropolitan and District Railways choked passengers with sulfurous soot before electric deep-level tubes began opening in 1890 with the City and South London Railway.',
    entities: ['London', 'Joseph Bazalgette', 'Metropolitan Railway', 'Victorian Infrastructure', 'Thames']
  },
  {
    id: 'london-003',
    title: 'Victorian Foodways, Street Sellers, and Working Class Sustenance in 1890',
    location: 'London',
    country: 'United Kingdom',
    yearStart: 1880,
    yearEnd: 1900,
    period: 'Victorian Era',
    topic: 'Food & Street Culture',
    source: 'Henry Mayhew Street Life in London & Guildhall Library Records',
    sourceType: 'Primary Source',
    reliability: 'high',
    content: 'Street life buzzed with cries of costermongers pushing handbarrows of seasonal herrings, winkles, and watercress. Working families relied on eel and pie houses serving minced beef pies with mashed potatoes swimming in green parsley liquor, or fried cod fillets sold wrapped in discarded newspaper. Oysters, once the cheapest food of the poorest beggars, had grown pricier due to Thames pollution. Middle classes took afternoon high tea with cucumber sandwiches, seed cake, and Indian and Ceylon black tea shipped through the London Docks.',
    entities: ['London', 'Pie and Mash', 'Costermongers', 'Victorian Diet', 'Tea Culture']
  },

  // --- PTOLEMAIC ALEXANDRIA (~250 BC) ---
  {
    id: 'alex-001',
    title: 'The Great Mouseion and Library of Alexandria under Ptolemy II Philadelphus',
    location: 'Alexandria',
    country: 'Egypt',
    yearStart: -280,
    yearEnd: -230,
    period: 'Hellenistic Ptolemaic Egypt',
    topic: 'Scholarship & Science',
    source: 'Letter of Aristeas & Tzetzes Prolegomena to Aristophanes',
    sourceType: 'Chronicle',
    reliability: 'high',
    content: 'Founded by the Macedonian Ptolemaic dynasty, the Mouseion (Shrine to the Muses) was the premier research institute of antiquity. Its daughter institution, the Great Library of Alexandria, sought to amass a copy of every scroll in the known world—seizing books from arriving ships to transcribe. Under head librarians Callimachus and Eratosthenes (who accurately calculated the Earth’s circumference), hundreds of thousands of papyrus rolls catalogued mathematics, astronomy, Greek tragedy, and Egyptian sacred history in the Pinakes encyclopedia.',
    entities: ['Alexandria', 'Ptolemy II', 'Library of Alexandria', 'Callimachus', 'Eratosthenes']
  },
  {
    id: 'alex-002',
    title: 'The Pharos Lighthouse and Multicultural Harbor of Alexandria',
    location: 'Alexandria',
    country: 'Egypt',
    yearStart: -280,
    yearEnd: -200,
    period: 'Ptolemaic Kingdom',
    topic: 'Architecture & Trade',
    source: 'Strabo’s Geographica (Book XVII) & Marine Archaeological Findings at Qaitbay',
    sourceType: 'Archaeological',
    reliability: 'high',
    content: 'Standing on the island of Pharos linked to the mainland by the Heptastadion causeway, the Lighthouse of Alexandria rose over 100 meters in white limestone and granite, engineered by Sostratus of Knidos. A massive bronze mirror and summit furnace guided merchant vessels carrying Aegean wine, Nubian ivory, Indian spices, and Nile valley flax. The city’s quarters blended native Egyptians in Rhakotis, Greeks and Macedonians in the royal Brucheion, and a thriving Jewish community in the eastern district translating the Hebrew Bible into the Greek Septuagint.',
    entities: ['Alexandria', 'Pharos of Alexandria', 'Sostratus', 'Strabo', 'Septuagint']
  },

  // --- BAGHDAD / HOUSE OF WISDOM (~830 AD) ---
  {
    id: 'baghdad-001',
    title: 'The Translation Movement and Bayt al-Hikma (House of Wisdom) under Caliph Al-Ma’mun',
    location: 'Baghdad',
    country: 'Iraq',
    yearStart: 810,
    yearEnd: 860,
    period: 'Abbasid Golden Age',
    topic: 'Science & Philosophy',
    source: 'Ibn al-Nadim (Kitab al-Fihrist) & Al-Qifti Chronicle of Wise Men',
    sourceType: 'Academic',
    reliability: 'high',
    content: 'Under Caliph Al-Ma’mun (reigned 813–833 AD), Baghdad was the intellectual capital of Afro-Eurasia. In the House of Wisdom (Bayt al-Hikma), Christian, Muslim, and Jewish scholars such as Hunayn ibn Ishaq and polymath Muhammad ibn Musa al-Khwarizmi translated and synthesized Greek, Persian, Sanskrit, and Syriac texts into Arabic. Here, Al-Khwarizmi formalized algebra (al-jabr) and Hindu-Arabic numerals, while astronomical observatories measured celestial latitudes along the Tigris floodplain.',
    entities: ['Baghdad', 'Abbasid Caliphate', 'Al-Ma’mun', 'House of Wisdom', 'Al-Khwarizmi', 'Hunayn ibn Ishaq']
  },
  {
    id: 'baghdad-002',
    title: 'The Round City of Al-Mansur: Canal Engineering and Silk Road Commerce',
    location: 'Baghdad',
    country: 'Iraq',
    yearStart: 800,
    yearEnd: 870,
    period: 'Abbasid Caliphate',
    topic: 'Urban Geography & Trade',
    source: 'Al-Khatib al-Baghdadi (History of Baghdad) & Archaeological Surveys',
    sourceType: 'Primary Source',
    reliability: 'high',
    content: 'Constructed by Caliph Al-Mansur in 762 AD as Madinat al-Salam (City of Peace), Baghdad was originally laid out as a perfect circle with four massive iron gates orienting toward Khorasan, Kufa, Basra, and Syria. Fed by branching canals linking the Tigris and Euphrates rivers, the city boasted Chinese paper mills, fragrant rosewater distilleries, and sprawling markets in the Karkh suburb trading Sogdian silks, Yemeni frankincense, and Caspian caviar.',
    entities: ['Baghdad', 'Al-Mansur', 'Round City', 'Tigris River', 'Silk Road Trade']
  },

  // --- TENOCHTITLAN (~1500 AD) ---
  {
    id: 'tenochtitlan-001',
    title: 'The Sacred Precinct, Templo Mayor, and Island Capital of the Mexica',
    location: 'Tenochtitlan',
    country: 'Mexico',
    yearStart: 1480,
    yearEnd: 1520,
    period: 'Aztec Empire (Mexica Triple Alliance)',
    topic: 'Architecture, Religion & Hydraulic Engineering',
    source: 'Florentine Codex (Sahagún) & INAH Templo Mayor Excavations',
    sourceType: 'Archaeological',
    reliability: 'high',
    content: 'Built on an island in brackish Lake Texcoco, Tenochtitlan housed an estimated 200,000 residents connected to the mainland by three wide stone-and-wood causeways equipped with drawbridges. At its center stood the Sacred Precinct and the Templo Mayor, a dual-pyramid crowned with shrines to Tlaloc (god of rain and agriculture) and Huitzilopochtli (god of war and the sun). To prevent seasonal flooding and separate saline lake waters from freshwater springs, King Nezahualcoyotl engineered a 16-kilometer wooden and stone dike.',
    entities: ['Tenochtitlan', 'Templo Mayor', 'Mexica', 'Nezahualcoyotl', 'Lake Texcoco', 'Moctezuma II']
  },
  {
    id: 'tenochtitlan-002',
    title: 'The Great Marketplace of Tlatelolco and Mexica Everyday Life',
    location: 'Tenochtitlan',
    country: 'Mexico',
    yearStart: 1490,
    yearEnd: 1520,
    period: 'Aztec Empire',
    topic: 'Commerce & Diet',
    source: 'Bernal Díaz del Castillo (True History of the Conquest of New Spain)',
    sourceType: 'Primary Source',
    reliability: 'high',
    content: 'In the sister city of Tlatelolco, over 60,000 merchants and buyers gathered daily under the strict inspection of marketplace judges. Goods were bartered or bought using standardized currencies: fermented cacao beans, cotton mantles (quachtli), and copper axe money. Stalls sold roasted maize tortillas, tamales stuffed with beans or turkey, spirulina algae harvested from lake surfaces, wild duck, tomatoes, and chia drinks. Elite pochteca merchants brought vibrant quetzal bird plumes, raw gold dust in goose quills, and green jade from the tropical Gulf and Maya frontiers.',
    entities: ['Tenochtitlan', 'Tlatelolco Market', 'Pochteca', 'Cacao Currency', 'Mexica Diet']
  }
];

export const HISTORICAL_DESTINATIONS: HistoricalDestination[] = [
  {
    id: 'hampi',
    name: 'Hampi',
    region: 'Karnataka, Deccan Plateau',
    modernCountry: 'India',
    coordinates: [15.3350, 76.4600],
    goldenYear: 1500,
    yearRange: [1336, 1565],
    era: 'Vijayanagara Empire',
    tagline: 'The Golden City of the Deccan',
    description: 'Enter the bustling capital of Emperor Krishnadevaraya, where ruby and diamond merchants sold gems openly along stone bazaars, and monolithic temples rose above granite boulder hills.',
    suggestedPrompts: [
      'What was Hampi like around 1500?',
      'Take me through the Krishna Bazaar at sunrise.',
      'Who ruled Hampi during its peak, and what was their court like?',
      'What would a common pilgrim have eaten at the Virupaksha Temple?'
    ],
    landmarks: ['Virupaksha Temple', 'Krishna Bazaar', 'Lotus Mahal', 'Queen’s Bath', 'Mahanavami Dibba', 'Pushkarani'],
    characters: [
      {
        id: 'hampi-advisor',
        name: 'Madhava Raya',
        role: 'Royal Court Scribe & Advisor',
        location: 'Hampi',
        year: 1500,
        era: 'Vijayanagara Empire',
        iconName: 'Crown',
        shortBio: 'Serving under Emperor Krishnadevaraya, maintaining diplomatic records of Portuguese horse traders and temple endowments.',
        perspective: 'Observes high court politics, administrative decrees, and temple festivals.',
        greeting: 'Namaskara, traveler! Welcome to the court of the Rayas. The bells of Virupaksha are chiming across the Tungabhadra river.'
      },
      {
        id: 'hampi-merchant',
        name: 'Padmavati',
        role: 'Silk & Spice Merchant of Krishna Bazaar',
        location: 'Hampi',
        year: 1500,
        era: 'Vijayanagara Empire',
        iconName: 'Gem',
        shortBio: 'Operates a busy stall near the temple gopuram trading Deccan cotton, sandalwood, Chinese silks, and Ceylon pearls.',
        perspective: 'Keen eye for coin weights, foreign travelers, bazaar gossip, and festival processions.',
        greeting: 'Step into my colonnade, honored guest! Examine this freshly woven raw silk and Malabar black pepper.'
      }
    ],
    pastVsPresent: {
      pastYear: 1500,
      pastTitle: 'Metropolis of Vijayanagara (1500 AD)',
      pastOverview: 'A sprawling fortified capital with over 500,000 residents, multi-story gilded pavilions, functioning aqueducts, and international trade in gems and Arabian steeds.',
      pastKeyPoints: [
        'Active international bazaars selling diamonds, silks, and Arabian horses',
        'State-of-the-art hydraulic reservoirs and stepped baths filled by mountain conduits',
        'Imperial court bustling with Ashtadiggaja poets, diplomats, and royal armies'
      ],
      modernTitle: 'Hampi UNESCO Archaeological Complex (Today)',
      modernOverview: 'A breathtaking open-air archaeological park featuring over 1,600 surviving granite monuments, ruined stone colonnades, and quiet banana plantations.',
      modernKeyPoints: [
        'UNESCO World Heritage Site attracting global historians and travelers',
        'Virupaksha Temple remains continuously active for Hindu worship',
        'Bazaars preserved as picturesque stone-pillared ruins under open Deccan skies'
      ]
    }
  },
  {
    id: 'rome',
    name: 'Imperial Rome',
    region: 'Latium',
    modernCountry: 'Italy',
    coordinates: [41.9028, 12.4964],
    goldenYear: 115,
    yearRange: [27, 476],
    era: 'Pax Romana (Trajanic Era)',
    tagline: 'Caput Mundi — Capital of the World',
    description: 'Walk through marble forums, witness chariot races in the Circus Maximus, and experience life inside congested tenement blocks in the greatest metropolis of the classical world.',
    suggestedPrompts: [
      'Take me through Rome during the height of the Roman Empire.',
      'What was a normal morning like for someone living in the Subura?',
      'Who built Trajan’s Market and what was sold there?',
      'What would I have eaten at a street cookshop (thermopolium)?'
    ],
    landmarks: ['Colosseum (Flavian Amphitheatre)', 'Trajan’s Forum', 'Pantheon', 'Circus Maximus', 'Baths of Trajan', 'Subura'],
    characters: [
      {
        id: 'rome-veteran',
        name: 'Marcus Valerius',
        role: 'Veteran Centurion & Forum Guard',
        location: 'Rome',
        year: 115,
        era: 'Roman Empire',
        iconName: 'Shield',
        shortBio: 'Served under Emperor Trajan in the Dacian Wars, now stationed near the Basilica Ulpia in Rome.',
        perspective: 'Understands military discipline, imperial triumph, civic order, and Roman law.',
        greeting: 'Salvete, citizen! Keep clear of the emperor’s lictors. The Senate has just concluded deliberations in the Forum.'
      },
      {
        id: 'rome-cook',
        name: 'Livia of Subura',
        role: 'Thermopolium Street Cook',
        location: 'Rome',
        year: 115,
        era: 'Roman Empire',
        iconName: 'Utensils',
        shortBio: 'Runs a hot-food counter serving mulled wine, chickpea stew, and garum-spiced sausages to laborers and artisans.',
        perspective: 'Sees the pulse of plebeian life, street arguments, fire dangers, and tavern gossip.',
        greeting: 'Step out of the sun and have a cup of warm wine spiced with honey! The lentils are hot from the dolium.'
      }
    ],
    pastVsPresent: {
      pastYear: 115,
      pastTitle: 'Imperial Rome at Its Peak (115 AD)',
      pastOverview: 'A hyper-dense city of one million people filled with polychrome marble temples, thunderous amphitheaters, aqueducts pouring millions of gallons daily, and smoke-filled insulae.',
      pastKeyPoints: [
        'Over 1 million residents fed by the state grain dole (annona)',
        'Full marble cladding, painted bronze statues, and functioning monumental baths',
        'Continuous day-long chariot spectacles and gladiatorial games'
      ],
      modernTitle: 'Historic Rome (Today)',
      modernOverview: 'A modern European capital intertwining ancient ruins, Renaissance basilicas, buzzing cafes, and world-class museums.',
      modernKeyPoints: [
        'Colosseum and Roman Forum preserved as monumental open-air archaeological parks',
        'Modern metro lines carefully navigating subterranean ancient ruins',
        'Vibrant tourism, trattorias, and preserved cobblestone piazzas'
      ]
    }
  },
  {
    id: 'kyoto',
    name: 'Kyoto (Heian-kyo)',
    region: 'Kansai',
    modernCountry: 'Japan',
    coordinates: [35.0116, 135.7681],
    goldenYear: 1688,
    yearRange: [1603, 1867],
    era: 'Edo Period (Genroku Culture)',
    tagline: 'Cradle of Refinement and Artisan Guilds',
    description: 'Immerse yourself in tranquil temple rock gardens, traditional wooden machiya townhouses, and the lively teahouses of Gion along the Kamo River.',
    suggestedPrompts: [
      'What would daily life have looked like in Kyoto during the Edo period?',
      'Who held power between the Emperor in Kyoto and the Shogun in Edo?',
      'Tell me about the kimono weavers of the Nishijin district.',
      'What did people eat in a traditional Kyoto machiya?'
    ],
    landmarks: ['Nijo Castle', 'Kiyomizu-dera', 'Gion Teahouses', 'Nishijin Weaving Quarter', 'Kamo Riverbank', 'Kinkaku-ji'],
    characters: [
      {
        id: 'kyoto-weaver',
        name: 'Kenjiro',
        role: 'Nishijin Master Silk Weaver',
        location: 'Kyoto',
        year: 1688,
        era: 'Edo Period',
        iconName: 'Feather',
        shortBio: 'Crafts bespoke yuzen-dyed silk obis and ceremonial robes for court aristocrats and tea masters.',
        perspective: 'Appreciates delicate aesthetic balance (wabi-sabi), seasonal color harmonies, and guild traditions.',
        greeting: 'Konnichiwa. Please excuse the clacking of the loom; we are setting the warp for an autumn maple leaf brocade.'
      }
    ],
    pastVsPresent: {
      pastYear: 1688,
      pastTitle: 'Kyoto of the Genroku Renaissance (1688 AD)',
      pastOverview: 'The cultural epicenter of Japan, dominated by wooden machiya architecture, quiet Buddhist monastic compounds, and booming Kabuki and ukiyo-e print shops.',
      pastKeyPoints: [
        'Strict sumptuary laws governing clothing colors and fabric textures',
        'Nightingale-floor defenses at Nijo Castle guarding Tokugawa deputies',
        'Flourishing arts of Chanoyu (tea ceremony) and Noh drama'
      ],
      modernTitle: 'Kyoto Heritage City (Today)',
      modernOverview: 'Japan’s cultural heart, seamlessly blending 17 UNESCO World Heritage sites with high-speed Shinkansen trains and modern research universities.',
      modernKeyPoints: [
        'Thousands of preserved temples, shrines, and traditional wooden machiya',
        'Active geiko and maiko districts preserving living classical performing arts',
        'Modern center of Japanese ceramics, lacquerware, and fine cuisine'
      ]
    }
  },
  {
    id: 'london',
    name: 'Victorian London',
    region: 'England',
    modernCountry: 'United Kingdom',
    coordinates: [51.5074, -0.1278],
    goldenYear: 1890,
    yearRange: [1837, 1901],
    era: 'Late Victorian Era',
    tagline: 'Heart of the Industrial World',
    description: 'Step into the gas-lit streets of 1890 London: steam locomotives rumbling under foggy brick arches, bustling Thames docks, and high-society West End theaters.',
    suggestedPrompts: [
      'Take me through London in 1890 on a foggy evening.',
      'How did Bazalgette’s sewer system change the city?',
      'What was the contrast between the East End docks and Mayfair?',
      'What would a costermonger be selling on the streets?'
    ],
    landmarks: ['Tower Bridge (Under Construction)', 'Big Ben & Parliament', 'St. Paul’s Cathedral', 'East End Docks', 'Mayfair', 'Crystal Palace'],
    characters: [
      {
        id: 'london-newsboy',
        name: 'Arthur Higgins',
        role: 'Fleet Street Newsboy & Messenger',
        location: 'London',
        year: 1890,
        era: 'Victorian Era',
        iconName: 'BookOpen',
        shortBio: 'Sells evening broadsheets outside St. Paul’s and dodges horse-drawn Hansom cabs on muddy cobblestones.',
        perspective: 'Knows every alley from Holborn to Whitechapel, train timetables, and street slang.',
        greeting: 'Evening standard, sir! Read all about the new electric underground railway opening up in Southwark!'
      }
    ],
    pastVsPresent: {
      pastYear: 1890,
      pastTitle: 'Victorian Metropolis (1890 AD)',
      pastOverview: 'The world’s financial hub and imperial center, enveloped in yellow sulfurous smog, echoing with iron horse-hooves and steam train whistles.',
      pastKeyPoints: [
        'Dense horse-drawn omnibuses and early steam underground lines',
        'Drastic social inequality documented on Charles Booth’s poverty maps',
        'Gas street lamps and early hydraulic dock cranes transforming shipping'
      ],
      modernTitle: 'Contemporary London (Today)',
      modernOverview: 'A global multicultural metropolis with glass skyscrapers, clean air standards, electric transit, and preserved Victorian rail stations.',
      modernKeyPoints: [
        'Iconic landmarks like Tower Bridge and Parliament preserved and illuminated',
        'Thames riverfront converted from industrial wharves to cultural promenades',
        'High-speed Elizabeth Line tube traversing the historic subterranean routes'
      ]
    }
  },
  {
    id: 'alexandria',
    name: 'Ptolemaic Alexandria',
    region: 'Nile Delta',
    modernCountry: 'Egypt',
    coordinates: [31.2001, 29.9187],
    goldenYear: -250,
    yearRange: [-331, -30],
    era: 'Hellenistic Ptolemaic Kingdom',
    tagline: 'The Lighthouse and Library of Antiquity',
    description: 'Journey to the Mediterranean’s intellectual crown, where scholars catalogued the world’s wisdom in the Great Library and the towering Pharos Lighthouse guided sea fleets.',
    suggestedPrompts: [
      'What was the Library of Alexandria really like in 250 BC?',
      'How did the Pharos Lighthouse guide ships safely into the harbor?',
      'Who lived in Alexandria: Greeks, Egyptians, or Jews?',
      'What scientific discoveries were made at the Mouseion?'
    ],
    landmarks: ['The Great Library', 'Pharos Lighthouse', 'The Mouseion', 'Heptastadion Causeway', 'Serapeum of Alexandria', 'Royal Palaces'],
    characters: [
      {
        id: 'alex-librarian',
        name: 'Theon of Cyrene',
        role: 'Senior Scribe of the Mouseion',
        location: 'Alexandria',
        year: -250,
        era: 'Hellenistic Era',
        iconName: 'Scroll',
        shortBio: 'Works under Callimachus categorizing papyrus scrolls on geometry, celestial cycles, and tragedy.',
        perspective: 'Devoted to preserving knowledge, comparing Greek and Egyptian philosophy, debating scholars.',
        greeting: 'Greetings in the name of the Muses. You stand within the halls of universal knowledge; which scroll seek ye?'
      }
    ],
    pastVsPresent: {
      pastYear: -250,
      pastTitle: 'Hellenistic Alexandria (-250 BC)',
      pastOverview: 'A gleaming Greco-Egyptian port city with broad gridded boulevards, colonnades, the Great Library, and one of the Seven Wonders of the Ancient World.',
      pastKeyPoints: [
        'World’s largest repository of papyrus scrolls in the Great Library',
        'Over 100-meter-tall Pharos Lighthouse guiding maritime fleets with fire and bronze mirrors',
        'Cosmopolitan center uniting Mediterranean philosophy and Egyptian engineering'
      ],
      modernTitle: 'Alexandria (Today)',
      modernOverview: 'Egypt’s second-largest city, featuring the modern architectural marvel Bibliotheca Alexandrina near the historic shoreline.',
      modernKeyPoints: [
        'The Bibliotheca Alexandrina celebrates the ancient library’s legacy',
        'Underwater archaeological park discovering submerged sphinxes and Pharos blocks',
        'Bustling Mediterranean seaside corniche and historic Citadel of Qaitbay'
      ]
    }
  },
  {
    id: 'baghdad',
    name: 'Abbasid Baghdad',
    region: 'Mesopotamia',
    modernCountry: 'Iraq',
    coordinates: [33.3152, 44.3661],
    goldenYear: 830,
    yearRange: [762, 1258],
    era: 'Islamic Golden Age',
    tagline: 'The City of Peace and House of Wisdom',
    description: 'Explore the circular city of Al-Mansur along the Tigris River, where polymaths translated world sciences into Arabic and trade caravans linked Spain to China.',
    suggestedPrompts: [
      'Tell me about the House of Wisdom under Caliph Al-Ma’mun.',
      'Why was the original city of Baghdad designed as a circle?',
      'What discoveries did Al-Khwarizmi make in Baghdad?',
      'What would a merchant buy in the Karkh markets along the Tigris?'
    ],
    landmarks: ['House of Wisdom (Bayt al-Hikma)', 'Round City of Al-Mansur', 'Palace of the Golden Gate', 'Karkh Bazaars', 'Tigris Canals'],
    characters: [
      {
        id: 'baghdad-polymath',
        name: 'Zayd ibn Tariq',
        role: 'Astronomer & Translator at Bayt al-Hikma',
        location: 'Baghdad',
        year: 830,
        era: 'Abbasid Golden Age',
        iconName: 'Compass',
        shortBio: 'Translates Euclidean geometry and Sanskrit astronomical tables into Arabic using freshly pressed rag paper.',
        perspective: 'Passionate about mathematical clarity, observational precision, and cross-cultural dialogue.',
        greeting: 'As-salamu alaykum. The ink of scholars is as precious as the blood of martyrs; come, examine these astronomical charts.'
      }
    ],
    pastVsPresent: {
      pastYear: 830,
      pastTitle: 'Abbasid Baghdad (830 AD)',
      pastOverview: 'The intellectual and commercial capital of Afro-Eurasia, featuring the concentric Round City and unprecedented scientific patronages.',
      pastKeyPoints: [
        'Translation movement rendering Greek, Persian, and Sanskrit treatises into Arabic',
        'Invention of foundational algebra and algorithmic calculation by Al-Khwarizmi',
        'Canal network distributing Tigris waters throughout thriving botanical gardens'
      ],
      modernTitle: 'Baghdad (Today)',
      modernOverview: 'A resilient modern metropolis on the Tigris River celebrating its millennia of literary, artistic, and historical heritage.',
      modernKeyPoints: [
        'Historic Mutanabbi Street remains the historic intellectual artery for books and cafes',
        'National Museum of Iraq housing world-renowned Mesopotamian treasures',
        'Bridges crossing the storied Tigris River linking East and West'
      ]
    }
  },
  {
    id: 'tenochtitlan',
    name: 'Tenochtitlan',
    region: 'Valley of Mexico',
    modernCountry: 'Mexico',
    coordinates: [19.4326, -99.1332],
    goldenYear: 1500,
    yearRange: [1325, 1521],
    era: 'Aztec / Mexica Empire',
    tagline: 'The Island City of the Sun',
    description: 'Venture into the island metropolis built on Lake Texcoco, connected by causeways, floating chinampa gardens, and the towering dual-pyramid of Templo Mayor.',
    suggestedPrompts: [
      'What was Tenochtitlan like in 1500 when entered at sunrise?',
      'How did the floating chinampas feed 200,000 residents?',
      'What was sold in the great Tlatelolco market?',
      'What engineering prevented flooding in Lake Texcoco?'
    ],
    landmarks: ['Templo Mayor', 'Tlatelolco Market', 'Chinampas (Floating Gardens)', 'Nezahualcoyotl Dike', 'Palace of Moctezuma', 'Iztapalapa Causeway'],
    characters: [
      {
        id: 'aztec-merchant',
        name: 'Cuauhtli',
        role: 'Pochteca Guild Trader',
        location: 'Tenochtitlan',
        year: 1500,
        era: 'Mexica Empire',
        iconName: 'Sun',
        shortBio: 'Traveled to the cloud forests of Oaxaca for emerald quetzal plumes, jaguar pelts, and cacao pods.',
        perspective: 'Keen understanding of lake navigation, trade routes, tribute logistics, and ritual calendar cycles.',
        greeting: 'Cualli tonalli! Watch your step on the wooden canoe pier. The morning mist is lifting off Lake Texcoco.'
      }
    ],
    pastVsPresent: {
      pastYear: 1500,
      pastTitle: 'Tenochtitlan (1500 AD)',
      pastOverview: 'An astonishing aquatic island city with canals instead of streets, lush floating gardens, clean freshwater aqueducts from Chapultepec, and monumental pyramids.',
      pastKeyPoints: [
        'Chinampa agricultural islands generating up to seven crops annually',
        'Tlatelolco market serving 60,000 daily traders exchanging goods for cacao beans',
        'Sophisticated 16km dike system engineered by King Nezahualcoyotl'
      ],
      modernTitle: 'Mexico City (CDMX) (Today)',
      modernOverview: 'A dynamic megacity constructed over the ancient lakebed, with the Templo Mayor ruins excavated directly beside the Metropolitan Cathedral.',
      modernKeyPoints: [
        'Zócalo square stands over the former Mexica ceremonial precinct',
        'Templo Mayor Museum showcases excavated monoliths of Coyolxauhqui and Tlaloc',
        'Canals and chinampas preserved in the historic southern district of Xochimilco'
      ]
    }
  }
];
