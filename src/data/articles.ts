import type {Article} from './types';

export const baseArticles: Article[] = [
  {
    id: 'hidden-chambers-tutankhamun',
    title: 'The Hidden Chambers of Tutankhamun',
    tag: 'Archaeology',
    volume: 'Vol. III · Excavation Notes',
    tone: 'gold',
    preview:
      'New radar scans suggest the boy king burial chamber may conceal a second sealed room, possibly the resting place of Queen Nefertiti.',
    body: [
      'In 1922, Howard Carter’s team broke through the sealed doorway of KV62 to find the only largely intact royal tomb ever discovered in Egypt. Yet nearly a century later, the tomb still guards secrets.',
      'In 2015, Egyptologist Nicholas Reeves published a striking theory. High-resolution scans of the tomb walls revealed faint straight lines beneath the painted plaster, which he interpreted as sealed doorways leading to undiscovered chambers.',
      'Later surveys produced conflicting results, and the debate remains unresolved. If a deeper chamber does exist, it could contain one of the most significant burials still hidden in the Valley of the Kings.',
    ],
  },
  {
    id: 'rosetta-stone',
    title: 'Decoding the Rosetta Stone',
    tag: 'History',
    volume: 'Vol. I · Language & Script',
    tone: 'teal',
    preview:
      'Three scripts, one decree. How a single slab of granite unlocked fourteen centuries of silent Egyptian civilization.',
    body: [
      'Discovered in 1799 near the town of Rosetta in the Nile Delta, the Rosetta Stone became one of the most important archaeological finds ever connected with ancient writing.',
      'Because Ancient Greek was still readable, scholars compared it with hieroglyphic and Demotic scripts. Thomas Young made important progress, and Jean-François Champollion delivered the decisive breakthrough in 1822.',
      'The stone did not reveal every secret at once, but it opened the door. Temples, tombs, statues, coffins, and papyri could finally be read as historical voices rather than decoration.',
    ],
  },
  {
    id: 'mummification',
    title: 'The Art of Mummification',
    tag: 'Ritual',
    volume: 'Vol. II · Burial Practice',
    tone: 'red',
    preview:
      'Seventy days of sacred ritual transformed the dead into the eternal. A look inside the embalmers workshop of ancient Egypt.',
    body: [
      'Mummification was not simply a method of preserving the body. It was a sacred process designed to transform the deceased into a prepared being capable of entering the afterlife.',
      'Organs were removed or treated, the body was dried with natron, wrapped in linen, protected with amulets, and covered with resins, oils, and ritual substances.',
      'The heart was especially important because it held identity and moral memory. It often remained inside the body so it could be weighed in the afterlife.',
    ],
  },
  {
    id: 'architecture-afterlife',
    title: 'The Architecture of the Afterlife',
    tag: 'Tomb Study',
    volume: 'Vol. II · Burial Design',
    tone: 'gold',
    preview:
      'Burial spaces were built as maps, shields, and ritual machines for the soul’s dangerous passage.',
    body: [
      'Ancient Egyptian tombs were carefully designed spaces meant to protect the deceased, preserve identity, and guide the soul through the journey beyond death.',
      'In royal tombs, walls were filled with underworld books, solar journeys, divine guardians, serpents, gates, stars, and scenes of rebirth.',
      'Studying tomb architecture shows how Egyptians joined engineering, religion, art, and fear of loss into one system.',
    ],
  },
  {
    id: 'beneath-temples',
    title: 'Beneath the Temples',
    tag: 'Temple Secrets',
    volume: 'Vol. III · Sacred Spaces',
    tone: 'teal',
    preview:
      'Restricted rooms, crypts, and inner sanctuaries reveal how Egyptian temples protected sacred objects.',
    body: [
      'Many temples contained restricted rooms, storage chambers, crypts, stairways, and enclosed ritual zones hidden from ordinary visitors.',
      'The crypts of Dendera were narrow, carved, and filled with reliefs showing ritual objects and divine symbols, suggesting controlled priestly access.',
      'The movement from open court to dark sanctuary created a hierarchy of sacred access and guided worshippers toward the divine presence.',
    ],
  },
  {
    id: 'valley-journey',
    title: 'The Valley of the Kings and the Royal Journey',
    tag: 'Royal Necropolis',
    volume: 'Vol. IV · New Kingdom Burials',
    tone: 'gold',
    preview:
      'The west bank of Luxor became a royal corridor into the underworld and the solar cycle of rebirth.',
    body: [
      'The Valley of the Kings became the burial ground of many New Kingdom pharaohs because it offered sacred meaning and natural protection.',
      'Unlike earlier pyramids, these tombs were cut into the mountain, hiding entrances while making interiors increasingly complex and symbolic.',
      'Texts such as the Amduat and Book of Gates mapped dangerous regions filled with guardians, serpents, gates, and trials.',
    ],
  },
  {
    id: 'animal-catacombs',
    title: 'Animal Catacombs and Sacred Creatures',
    tag: 'Ritual Burials',
    volume: 'Vol. V · Cults & Catacombs',
    tone: 'red',
    preview:
      'Cats, ibises, baboons, crocodiles, and bulls entered ritual economies as preserved messengers to the gods.',
    body: [
      'Animal burials were an important part of Egyptian religion, especially during the Late Period and Greco-Roman era.',
      'At Saqqara, the Serapeum held sacred Apis bulls in huge stone sarcophagi. At Tuna el-Gebel, ibises and baboons were buried in galleries connected with Thoth.',
      'These burials reveal belief, economy, species, environment, and temple management behind devotional practice.',
    ],
  },
  {
    id: 'tomb-walls',
    title: 'The Secret Language of Tomb Walls',
    tag: 'Symbols',
    volume: 'Vol. VI · Painted Corridors',
    tone: 'teal',
    preview:
      'Figures, colors, gods, offerings, and hieroglyphs worked together as protection and instruction.',
    body: [
      'The walls of tombs formed a visual and written system filled with religious meaning, not simple decoration.',
      'Royal corridors often show the sun god traveling through the night world, with the king joining the cosmic journey and rising again with sunrise.',
      'Color carried meaning too: gold suggested divine flesh, green renewal, blue creation, white purity, and black fertile rebirth.',
    ],
  },
  {
    id: 'modern-discovery',
    title: 'Lost Chambers and Modern Discovery',
    tag: 'Excavation Notes',
    volume: 'Vol. VII · Archaeological Methods',
    tone: 'gold',
    preview:
      'Ground-penetrating radar, 3D scanning, and photogrammetry help search without destroying context.',
    body: [
      'The search for unknown chambers has always shaped Egyptian archaeology, but modern work approaches the question with careful methods.',
      'Non-invasive tools such as ground-penetrating radar, 3D scanning, thermal imaging, photogrammetry, and structural analysis can detect possible spaces before excavation.',
      'The goal is not only to find something impressive, but to preserve context so each object and wall remains historically meaningful.',
    ],
  },
  {
    id: 'workmen',
    title: 'The Workmen Behind the Royal Tombs',
    tag: 'Field Study',
    volume: 'Vol. VIII · Deir el-Medina',
    tone: 'teal',
    preview:
      'Royal eternity depended on trained hands, scribes, painters, stonecutters, and village life.',
    body: [
      'The royal tombs of the Valley of the Kings were built, carved, painted, planned, repaired, and protected by skilled workers from Deir el-Medina.',
      'Ostraca and papyri mention wages, work schedules, family disputes, supplies, illness, complaints, and strikes.',
      'The village shifts attention from kings alone to the organized communities that made royal afterlife beliefs visible in stone.',
    ],
  },
  {
    id: 'west-bank',
    title: 'Sacred Geography of the West Bank',
    tag: 'Landscape',
    volume: 'Vol. IX · Desert & Afterlife',
    tone: 'gold',
    preview:
      'Tombs, temples, villages, cliffs, and the setting sun formed one sacred landscape near Thebes.',
    body: [
      'The west bank of the Nile at Thebes was one of Egypt’s most important sacred landscapes.',
      'The Valley of the Kings, Valley of the Queens, Deir el-Medina, Medinet Habu, the Ramesseum, and noble tombs belonged to a wider ritual environment.',
      'The natural peak of el-Qurn may have echoed royal pyramid symbolism above the tomb landscape.',
    ],
  },
  {
    id: 'delta-cities',
    title: 'The Nile Delta and Buried Cities',
    tag: 'Ancient Settlements',
    volume: 'Vol. X · Delta Discoveries',
    tone: 'red',
    preview:
      'Water, mud, agriculture, and later building make Delta archaeology difficult but crucial.',
    body: [
      'The Nile Delta was one of Egypt’s most important regions, though its remains are harder to preserve than desert monuments.',
      'Tanis, Bubastis, Sais, Mendes, and Naukratis played major roles in politics, trade, religion, and cultural exchange.',
      'The Delta reminds us that ancient Egypt was also ports, marshes, temples, markets, palaces, workshops, and canals.',
    ],
  },
  {
    id: 'abu-simbel-light',
    title: 'The Solar Alignment of Abu Simbel',
    tag: 'Ancient Engineering',
    volume: 'Vol. XI · Light & Power',
    tone: 'gold',
    preview:
      'A rock-cut temple turns sunlight into royal theater and cosmic order.',
    body: [
      'Abu Simbel was designed so sunlight would enter the monument and reach deep into the sanctuary on specific dates.',
      'This event connected Ramesses II, the gods, the passage of time, and the power of the sun.',
      'Its modern relocation during the Nubian salvage campaign added another story of engineering across time.',
    ],
  },
  {
    id: 'book-dead',
    title: 'The Book of the Dead and the Journey Beyond',
    tag: 'Afterlife Texts',
    volume: 'Vol. XII · Ritual Knowledge',
    tone: 'teal',
    preview:
      'A flexible collection of spells guided the deceased through judgment, danger, and transformation.',
    body: [
      'The Book of the Dead was not a single book in the modern sense, but a collection of spells, prayers, instructions, and illustrations.',
      'Its texts offered protection, guidance, formulas for transformation, and knowledge needed after death.',
      'The weighing of the heart scene shows how moral order, identity, and afterlife survival were imagined together.',
    ],
  },
  {
    id: 'canopic-jars',
    title: 'Canopic Jars and the Guardians of the Body',
    tag: 'Burial Objects',
    volume: 'Vol. XIV · Sacred Protection',
    tone: 'gold',
    preview:
      'Four vessels guarded the organs and preserved the spiritual completeness of the body.',
    body: [
      'Canopic jars protected internal organs removed during mummification, especially the liver, lungs, stomach, and intestines.',
      'They were connected with the Four Sons of Horus: Imsety, Hapy, Duamutef, and Qebehsenuef.',
      'Their designs changed over time, but their message remained clear: every part of the person mattered.',
    ],
  },
  {
    id: 'false-door',
    title: 'The Meaning of the False Door',
    tag: 'Tomb Symbolism',
    volume: 'Vol. XV · Offering Passage',
    tone: 'teal',
    preview:
      'A carved doorway that did not open became a passage for offerings, names, and memory.',
    body: [
      'The false door represented a threshold between the living world and the world of the dead.',
      'It often carried names, titles, images, and offering formulas asking for bread, beer, cattle, birds, linen, and incense.',
      'For researchers, false doors preserve family relations, official titles, artistic style, formulas, and social status.',
    ],
  },
  {
    id: 'amulets',
    title: 'Amulets in the Wrappings',
    tag: 'Protective Magic',
    volume: 'Vol. XVI · Sacred Objects',
    tone: 'red',
    preview:
      'Small objects hidden in linen carried large promises of protection and rebirth.',
    body: [
      'Amulets were placed on bodies, inside wrappings, around the neck, on the chest, near the heart, and throughout burial equipment.',
      'The scarab, djed pillar, tyet knot, wedjat eye, heart scarab, and ankh could protect, restore, strengthen, or transform the deceased.',
      'Their shape, material, color, inscription, and position all contributed to their function.',
    ],
  },
  {
    id: 'sealed-doors',
    title: 'The Mystery of Sealed Tomb Doors',
    tag: 'Tomb Security',
    volume: 'Vol. XVII · Barriers & Protection',
    tone: 'gold',
    preview:
      'A sealed entrance was both a physical barrier and a ritual boundary.',
    body: [
      'Sealed tomb doors marked the boundary between the living world and the prepared world of the deceased.',
      'Physical sealing could include stone blocks, plaster, mudbrick, wooden doors, ropes, and stamped seals.',
      'When archaeologists find sealed or partly sealed spaces, even a small untouched area can preserve ritual sequence and burial context.',
    ],
  },
  {
    id: 'scribes',
    title: 'The Role of Scribes in Preserving Legacy',
    tag: 'Writing',
    volume: 'Vol. XVIII · Records & Authority',
    tone: 'teal',
    preview:
      'Administration, ritual, memory, and royal command survived through trained hands.',
    body: [
      'Scribes recorded taxes, offerings, land, labor, legal matters, letters, temple supplies, royal commands, religious texts, and funerary formulas.',
      'Writing was a path to status because literacy opened access to government, temples, archives, and royal service.',
      'Through scribes, names, dates, prayers, stories, and commands survived long after the voices that spoke them disappeared.',
    ],
  },
  {
    id: 'reuse',
    title: 'The Reuse of Ancient Monuments',
    tag: 'Reused Stones',
    volume: 'Vol. XIX · Layers of Time',
    tone: 'gold',
    preview:
      'Older blocks, statues, and inscriptions could become tools of later power.',
    body: [
      'Egyptian monuments were often reused, altered, expanded, dismantled, or built into later structures.',
      'Reuse could be practical because good stone was valuable, or political when rulers erased, claimed, or reshaped earlier monuments.',
      'A reused block can preserve lost scenes, earlier royal names, or temple plans hidden inside later walls.',
    ],
  },
  {
    id: 'names',
    title: 'The Sacred Power of Names',
    tag: 'Identity',
    volume: 'Vol. XX · Name & Eternity',
    tone: 'teal',
    preview:
      'To preserve a name was to help preserve the person; to erase it was a serious attack.',
    body: [
      'In Egyptian belief, a person’s name was an essential part of identity, not only a label.',
      'Royal names were written inside cartouches, oval frames that marked them as royal and eternal.',
      'Name erasure was more than vandalism. It could damage memory, status, and spiritual survival.',
    ],
  },
  {
    id: 'water-rebirth',
    title: 'Underground Water and Sacred Rebirth',
    tag: 'Sacred Landscape',
    volume: 'Vol. XXI · Water & Stone',
    tone: 'gold',
    preview:
      'Water could mean purification, creation, rebirth, and the primeval source of order.',
    body: [
      'Water played a powerful role in Egyptian religion, even in desert tomb landscapes.',
      'The Osireion at Abydos uses sunken architecture and Osiris symbolism to evoke death, regeneration, and renewal.',
      'Basins, wells, temple lakes, channels, and sunken designs show that sacred space was also about movement, reflection, purity, and depth.',
    ],
  },
  {
    id: 'unfinished-tombs',
    title: 'The Silence of Unfinished Tombs',
    tag: 'Unfinished Sites',
    volume: 'Vol. XXII · Work Interrupted',
    tone: 'red',
    preview:
      'Rough cuts, sketch lines, and abandoned chambers reveal the making of eternity before completion.',
    body: [
      'Unfinished tombs expose planning marks, rough cuts, incomplete corridors, abandoned chambers, sketch lines, and places where artists stopped.',
      'A tomb could remain unfinished because the owner died earlier than expected, lost status, lacked resources, or faced political change.',
      'These spaces are not failures. They are open workshops preserved in stone.',
    ],
  },
];
