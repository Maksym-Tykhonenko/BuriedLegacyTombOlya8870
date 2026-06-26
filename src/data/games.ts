import type {MatchRound, CipherRiddle, QuizQuestion} from './types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'rosetta-stone',
    question: 'Which stone helped scholars decode ancient Egyptian hieroglyphs?',
    correctOptionId: 'B',
    options: [
      {id: 'A', label: 'Temple of Edfu'},
      {id: 'B', label: 'Rosetta Stone'},
      {id: 'C', label: 'Philae Island'},
      {id: 'D', label: 'Red Pyramid'},
    ],
  },
  {
    id: 'ancient-greek',
    question: 'Which script on the Rosetta Stone was still readable to scholars?',
    correctOptionId: 'A',
    options: [
      {id: 'A', label: 'Ancient Greek'},
      {id: 'B', label: 'Demotic'},
      {id: 'C', label: 'Latin'},
      {id: 'D', label: 'Arabic'},
    ],
  },
  {
    id: 'champollion',
    question: 'Who made the decisive breakthrough in reading hieroglyphs in 1822?',
    correctOptionId: 'C',
    options: [
      {id: 'A', label: 'Howard Carter'},
      {id: 'B', label: 'Thomas Young'},
      {id: 'C', label: 'Champollion'},
      {id: 'D', label: 'Sneferu'},
    ],
  },
  {
    id: 'valley-kings',
    question: 'Which royal valley near Luxor was used for New Kingdom pharaohs?',
    correctOptionId: 'D',
    options: [
      {id: 'A', label: 'Valley of Queens'},
      {id: 'B', label: 'Dahshur'},
      {id: 'C', label: 'Abydos'},
      {id: 'D', label: 'Valley of Kings'},
    ],
  },
  {
    id: 'tutankhamun',
    question: 'Which young pharaoh’s intact tomb was discovered in 1922?',
    correctOptionId: 'A',
    options: [
      {id: 'A', label: 'Tutankhamun'},
      {id: 'B', label: 'Ramesses III'},
      {id: 'C', label: 'Akhenaten'},
      {id: 'D', label: 'Seti I'},
    ],
  },
];

export const matchRounds: MatchRound[] = [
  {
    id: 'rosetta-valley-serapeum',
    statements: [
      {
        id: '1',
        text: 'This stone helped scholars read hieroglyphs again after many centuries.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This royal burial valley was used for New Kingdom pharaohs near Luxor.',
        correctOptionId: 'A',
      },
      {
        id: '3',
        text: 'This underground complex at Saqqara was connected with sacred Apis bulls.',
        correctOptionId: 'C',
      },
    ],
    options: [
      {id: 'A', label: 'Valley of the Kings'},
      {id: 'B', label: 'Rosetta Stone'},
      {id: 'C', label: 'Serapeum of Saqqara'},
      {id: 'D', label: 'Temple of Edfu'},
      {id: 'E', label: 'Philae Island'},
    ],
  },
  {
    id: 'nefertari-dendera-workers',
    statements: [
      {
        id: '1',
        text: 'This queen’s tomb is famous for its bright painted scenes and elegant divine imagery.',
        correctOptionId: 'C',
      },
      {
        id: '2',
        text: 'This temple was dedicated to Hathor and contains narrow crypts used for sacred objects.',
        correctOptionId: 'A',
      },
      {
        id: '3',
        text: 'This village belonged to the skilled workers who built and decorated royal tombs.',
        correctOptionId: 'B',
      },
    ],
    options: [
      {id: 'A', label: 'Dendera Temple'},
      {id: 'B', label: 'Deir el-Medina'},
      {id: 'C', label: 'Tomb of Nefertari'},
      {id: 'D', label: 'Abu Simbel'},
      {id: 'E', label: 'Tanis'},
    ],
  },
  {
    id: 'pyramid-experiments',
    statements: [
      {
        id: '1',
        text: 'This monument is known for its unusual change in angle during construction.',
        correctOptionId: 'C',
      },
      {
        id: '2',
        text: 'This pyramid is often described as Egypt’s first successful true smooth-sided pyramid.',
        correctOptionId: 'B',
      },
      {
        id: '3',
        text: 'This ruined pyramid has a tower-like appearance because much of its outer structure collapsed.',
        correctOptionId: 'A',
      },
    ],
    options: [
      {id: 'A', label: 'Meidum Pyramid'},
      {id: 'B', label: 'Red Pyramid'},
      {id: 'C', label: 'Bent Pyramid'},
      {id: 'D', label: 'Step Pyramid of Djoser'},
      {id: 'E', label: 'Hawara Pyramid'},
    ],
  },
  {
    id: 'osiris-afterlife-texts',
    statements: [
      {
        id: '1',
        text: 'This site was one of the most important cult centers of Osiris.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This sunken structure behind the temple of Seti I is strongly connected with death and rebirth symbolism.',
        correctOptionId: 'C',
      },
      {
        id: '3',
        text: 'This sacred text collection helped the deceased pass through the afterlife.',
        correctOptionId: 'A',
      },
    ],
    options: [
      {id: 'A', label: 'Book of the Dead'},
      {id: 'B', label: 'Abydos'},
      {id: 'C', label: 'Osireion'},
      {id: 'D', label: 'Kom Ombo'},
      {id: 'E', label: 'El-Lahun'},
    ],
  },
  {
    id: 'body-protection',
    statements: [
      {
        id: '1',
        text: 'This object protected the internal organs of the deceased after mummification.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This small magical object was placed in wrappings for protection and rebirth.',
        correctOptionId: 'C',
      },
      {
        id: '3',
        text: 'This symbolic tomb feature acted as a passage for offerings between the living and the dead.',
        correctOptionId: 'A',
      },
    ],
    options: [
      {id: 'A', label: 'False Door'},
      {id: 'B', label: 'Canopic Jar'},
      {id: 'C', label: 'Amulet'},
      {id: 'D', label: 'Scarab Seal'},
      {id: 'E', label: 'Offering Table'},
    ],
  },
  {
    id: 'temples',
    statements: [
      {
        id: '1',
        text: 'This temple was built for Ramesses II and is famous for sunlight reaching its inner sanctuary.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This island temple complex was strongly connected with the goddess Isis.',
        correctOptionId: 'C',
      },
      {
        id: '3',
        text: 'This dual temple honored both Sobek and Haroeris.',
        correctOptionId: 'A',
      },
    ],
    options: [
      {id: 'A', label: 'Kom Ombo'},
      {id: 'B', label: 'Abu Simbel'},
      {id: 'C', label: 'Philae Temple Complex'},
      {id: 'D', label: 'Medinet Habu'},
      {id: 'E', label: 'Temple of Karnak'},
    ],
  },
  {
    id: 'delta-amarna-alexandria',
    statements: [
      {
        id: '1',
        text: 'This site in the Nile Delta preserved royal burials from the Third Intermediate Period.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This ancient city was created by Akhenaten during his religious reform.',
        correctOptionId: 'A',
      },
      {
        id: '3',
        text: 'This underground burial complex in Alexandria combines Egyptian, Greek, and Roman elements.',
        correctOptionId: 'C',
      },
    ],
    options: [
      {id: 'A', label: 'Amarna'},
      {id: 'B', label: 'Tanis'},
      {id: 'C', label: 'Catacombs of Kom el-Shoqafa'},
      {id: 'D', label: 'Saqqara'},
      {id: 'E', label: 'Beni Hasan'},
    ],
  },
  {
    id: 'gods',
    statements: [
      {
        id: '1',
        text: 'This god was connected with writing, wisdom, and sacred knowledge.',
        correctOptionId: 'C',
      },
      {
        id: '2',
        text: 'This god was linked with mummification and protection of the dead.',
        correctOptionId: 'B',
      },
      {
        id: '3',
        text: 'This goddess was central to the Philae temple complex.',
        correctOptionId: 'A',
      },
    ],
    options: [
      {id: 'A', label: 'Isis'},
      {id: 'B', label: 'Anubis'},
      {id: 'C', label: 'Thoth'},
      {id: 'D', label: 'Sobek'},
      {id: 'E', label: 'Horus'},
    ],
  },
  {
    id: 'tombs-catacombs-nobles',
    statements: [
      {
        id: '1',
        text: 'This site contains cliff-cut tombs of Middle Kingdom provincial governors.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This desert necropolis is known for animal catacombs connected with Thoth.',
        correctOptionId: 'C',
      },
      {
        id: '3',
        text: 'This Theban burial area contains tombs of officials, priests, scribes, and elite individuals.',
        correctOptionId: 'A',
      },
    ],
    options: [
      {id: 'A', label: 'Tombs of the Nobles'},
      {id: 'B', label: 'Beni Hasan'},
      {id: 'C', label: 'Tuna el-Gebel'},
      {id: 'D', label: 'Valley of the Queens'},
      {id: 'E', label: 'Dahshur'},
    ],
  },
  {
    id: 'ramesside-tombs',
    statements: [
      {
        id: '1',
        text: 'This ruler’s tomb contains some of the finest painted reliefs in the Valley of the Kings.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This ruler’s tomb includes complex astronomical and underworld imagery.',
        correctOptionId: 'C',
      },
      {
        id: '3',
        text: 'This ruler built the great mortuary temple known as Medinet Habu.',
        correctOptionId: 'A',
      },
    ],
    options: [
      {id: 'A', label: 'Ramesses III'},
      {id: 'B', label: 'Seti I'},
      {id: 'C', label: 'Ramesses VI'},
      {id: 'D', label: 'Tutankhamun'},
      {id: 'E', label: 'Horemheb'},
    ],
  },
  {
    id: 'scripts',
    statements: [
      {
        id: '1',
        text: 'This writing system was one of the three scripts on the Rosetta Stone.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This language helped scholars compare and decode the Egyptian scripts.',
        correctOptionId: 'A',
      },
      {
        id: '3',
        text: 'This scholar made the decisive breakthrough in deciphering hieroglyphs in 1822.',
        correctOptionId: 'C',
      },
    ],
    options: [
      {id: 'A', label: 'Ancient Greek'},
      {id: 'B', label: 'Demotic'},
      {id: 'C', label: 'Jean-François Champollion'},
      {id: 'D', label: 'Latin'},
      {id: 'E', label: 'Arabic'},
    ],
  },
  {
    id: 'mummification',
    statements: [
      {
        id: '1',
        text: 'This material was used to dry the body during mummification.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This organ was especially important because it was connected with identity and judgment.',
        correctOptionId: 'A',
      },
      {
        id: '3',
        text: 'This ritual process prepared the deceased for survival in the afterlife.',
        correctOptionId: 'C',
      },
    ],
    options: [
      {id: 'A', label: 'Heart'},
      {id: 'B', label: 'Natron'},
      {id: 'C', label: 'Mummification'},
      {id: 'D', label: 'Papyrus'},
      {id: 'E', label: 'Limestone'},
    ],
  },
  {
    id: 'names-records',
    statements: [
      {
        id: '1',
        text: 'This royal title was usually written inside an oval frame.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This act could damage a person’s presence in the historical and spiritual record.',
        correctOptionId: 'C',
      },
      {
        id: '3',
        text: 'This professional group preserved records, religious texts, taxes, letters, and royal commands.',
        correctOptionId: 'A',
      },
    ],
    options: [
      {id: 'A', label: 'Scribes'},
      {id: 'B', label: 'Cartouche'},
      {id: 'C', label: 'Name Erasure'},
      {id: 'D', label: 'Embalmers'},
      {id: 'E', label: 'Priests'},
    ],
  },
  {
    id: 'edfu-kom-ombo',
    statements: [
      {
        id: '1',
        text: 'This temple at Edfu was dedicated mainly to Horus.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This temple’s inner rooms show how sacred space became more restricted near the sanctuary.',
        correctOptionId: 'C',
      },
      {
        id: '3',
        text: 'This god was often shown as a crocodile and honored at Kom Ombo.',
        correctOptionId: 'A',
      },
    ],
    options: [
      {id: 'A', label: 'Sobek'},
      {id: 'B', label: 'Temple of Horus'},
      {id: 'C', label: 'Restricted Sanctuary Zone'},
      {id: 'D', label: 'Osiris'},
      {id: 'E', label: 'Hathor'},
    ],
  },
  {
    id: 'quarry-temples',
    statements: [
      {
        id: '1',
        text: 'This site shows where sandstone was quarried for many Egyptian monuments.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This mortuary temple of Ramesses II contains storage areas and mudbrick magazines.',
        correctOptionId: 'A',
      },
      {
        id: '3',
        text: 'This temple complex looks like a sacred fortress and belonged to Ramesses III.',
        correctOptionId: 'C',
      },
    ],
    options: [
      {id: 'A', label: 'Ramesseum'},
      {id: 'B', label: 'Gebel el-Silsila'},
      {id: 'C', label: 'Medinet Habu'},
      {id: 'D', label: 'Valley of the Kings'},
      {id: 'E', label: 'Dendera'},
    ],
  },
  {
    id: 'delta',
    statements: [
      {
        id: '1',
        text: 'This region preserved important cities such as Tanis, Sais, Mendes, and Bubastis.',
        correctOptionId: 'A',
      },
      {
        id: '2',
        text: 'This site was affected by water, agriculture, later building, and changing river branches.',
        correctOptionId: 'A',
      },
      {
        id: '3',
        text: 'This area connected ancient Egypt with Mediterranean trade and foreign contact.',
        correctOptionId: 'A',
      },
    ],
    options: [
      {id: 'A', label: 'Nile Delta'},
      {id: 'B', label: 'Western Desert'},
      {id: 'C', label: 'Nubia'},
      {id: 'D', label: 'Theban Hills'},
      {id: 'E', label: 'Sinai'},
    ],
  },
  {
    id: 'symbols',
    statements: [
      {
        id: '1',
        text: 'This object could be placed over the chest to protect the heart during judgment.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This symbol was connected with stability and the backbone of Osiris.',
        correctOptionId: 'A',
      },
      {
        id: '3',
        text: 'This eye symbol was linked with protection, healing, and restoration.',
        correctOptionId: 'C',
      },
    ],
    options: [
      {id: 'A', label: 'Djed Pillar'},
      {id: 'B', label: 'Heart Scarab'},
      {id: 'C', label: 'Wedjat Eye'},
      {id: 'D', label: 'Tyet Knot'},
      {id: 'E', label: 'Ankh'},
    ],
  },
  {
    id: 'unfinished-work',
    statements: [
      {
        id: '1',
        text: 'These marks can help researchers understand how ancient workers cut stone.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'These early lines show how artists planned figures before carving or painting.',
        correctOptionId: 'C',
      },
      {
        id: '3',
        text: 'These tombs reveal construction stages because they were never fully completed.',
        correctOptionId: 'A',
      },
    ],
    options: [
      {id: 'A', label: 'Unfinished Tombs'},
      {id: 'B', label: 'Chisel Marks'},
      {id: 'C', label: 'Artist Guidelines'},
      {id: 'D', label: 'Sealed Doors'},
      {id: 'E', label: 'Offering Scenes'},
    ],
  },
  {
    id: 'reuse',
    statements: [
      {
        id: '1',
        text: 'This practice involved using older blocks, statues, or inscriptions in later buildings.',
        correctOptionId: 'A',
      },
      {
        id: '2',
        text: 'This action allowed later rulers to claim or reshape parts of the past.',
        correctOptionId: 'B',
      },
      {
        id: '3',
        text: 'This type of stone can preserve lost scenes or earlier royal names inside later walls.',
        correctOptionId: 'C',
      },
    ],
    options: [
      {id: 'A', label: 'Reuse of Monuments'},
      {id: 'B', label: 'Political Recarving'},
      {id: 'C', label: 'Reused Block'},
      {id: 'D', label: 'Burial Shaft'},
      {id: 'E', label: 'Temple Lake'},
    ],
  },
  {
    id: 'methods',
    statements: [
      {
        id: '1',
        text: 'This technique can detect possible underground spaces without immediate excavation.',
        correctOptionId: 'B',
      },
      {
        id: '2',
        text: 'This method creates detailed digital models of monuments and chambers.',
        correctOptionId: 'A',
      },
      {
        id: '3',
        text: 'This documentation method uses many photographs to build accurate 3D records.',
        correctOptionId: 'C',
      },
    ],
    options: [
      {id: 'A', label: '3D Scanning'},
      {id: 'B', label: 'Ground-Penetrating Radar'},
      {id: 'C', label: 'Photogrammetry'},
      {id: 'D', label: 'Carbon Dating'},
      {id: 'E', label: 'Pottery Sorting'},
    ],
  },
];

export const cipherRiddles: CipherRiddle[] = [
  {
    id: 1,
    question: 'Which stone helped scholars decode ancient Egyptian hieroglyphs?',
    answer: 'Rosetta Stone',
    hint: 'It had the same text in three scripts.',
  },
  {
    id: 2,
    question: 'Which script on the Rosetta Stone was still readable to scholars?',
    answer: 'Ancient Greek',
    hint: 'It helped compare the unknown Egyptian scripts.',
  },
  {
    id: 3,
    question: 'Who made the decisive breakthrough in reading hieroglyphs in 1822?',
    answer: 'Champollion',
    hint: 'His first name was Jean-François.',
  },
  {
    id: 4,
    question: 'Which royal valley near Luxor was used for New Kingdom pharaohs?',
    answer: 'Valley of Kings',
    hint: 'Tutankhamun’s tomb was found there.',
  },
  {
    id: 5,
    question: 'Which young pharaoh’s intact tomb was discovered in 1922?',
    answer: 'Tutankhamun',
    hint: 'Howard Carter found his tomb.',
  },
  {
    id: 6,
    question: 'Which queen’s tomb is famous for vivid painted divine scenes?',
    answer: 'Nefertari',
    hint: 'She was the wife of Ramesses II.',
  },
  {
    id: 7,
    question: 'Which site was home to the workers who built royal tombs?',
    answer: 'Deir el-Medina',
    hint: 'It was a village of artisans and scribes.',
  },
  {
    id: 8,
    question: 'Which underground Saqqara complex held sacred Apis bull burials?',
    answer: 'Serapeum',
    hint: 'It contains huge stone sarcophagi.',
  },
  {
    id: 9,
    question: 'Which god was connected with writing, wisdom, and sacred knowledge?',
    answer: 'Thoth',
    hint: 'Ibises and baboons were sacred to him.',
  },
  {
    id: 10,
    question: 'Which goddess was strongly connected with the Philae temple complex?',
    answer: 'Isis',
    hint: 'Her cult survived for a very long time.',
  },
  {
    id: 11,
    question: 'Which crocodile god was honored at Kom Ombo?',
    answer: 'Sobek',
    hint: 'Kom Ombo had a dual dedication.',
  },
  {
    id: 12,
    question: 'Which temple is famous for sunlight reaching its inner sanctuary?',
    answer: 'Abu Simbel',
    hint: 'It was built under Ramesses II.',
  },
  {
    id: 13,
    question: 'Which pyramid is known for its unusual change in angle?',
    answer: 'Bent Pyramid',
    hint: 'It was built for Sneferu.',
  },
  {
    id: 14,
    question: 'Which pyramid is often called Egypt’s first true smooth-sided pyramid?',
    answer: 'Red Pyramid',
    hint: 'It stands at Dahshur.',
  },
  {
    id: 15,
    question: 'Which material was used to dry the body during mummification?',
    answer: 'Natron',
    hint: 'It worked like a natural drying salt.',
  },
  {
    id: 16,
    question: 'Which organ was linked with judgment in the afterlife?',
    answer: 'Heart',
    hint: 'It was weighed against the feather of Ma’at.',
  },
  {
    id: 17,
    question: 'Which object protected organs removed during mummification?',
    answer: 'Canopic Jar',
    hint: 'It was linked with the Four Sons of Horus.',
  },
  {
    id: 18,
    question: 'Which small object was placed in wrappings for magical protection?',
    answer: 'Amulet',
    hint: 'It could protect, restore, or strengthen the deceased.',
  },
  {
    id: 19,
    question: 'Which tomb feature acted as a symbolic passage for offerings?',
    answer: 'False Door',
    hint: 'It looked like a doorway but did not physically open.',
  },
  {
    id: 20,
    question: 'Which symbol was linked with protection, healing, and restoration?',
    answer: 'Wedjat Eye',
    hint: 'It is also known as the Eye of Horus.',
  },
  {
    id: 21,
    question: 'Which profession preserved records, taxes, letters, and sacred texts?',
    answer: 'Scribe',
    hint: 'This person worked with writing and administration.',
  },
];
