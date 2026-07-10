// Sliding Puzzle Level Configurations (12 Progressively Scaled Levels)
const LEVELS = [
  {
    id: 1,
    title: "శ్రీరామ జననం (Birth of Rama)",
    difficulty: "సులభం (Easy)",
    gridSize: 3, // 3x3 Grid (8 Tiles + 1 Empty)
    image: "rama.png"
  },
  {
    id: 2,
    title: "బాల కృష్ణుడు (Baby Krishna Leelas)",
    difficulty: "సులభం (Easy)",
    gridSize: 3,
    image: "krishna.png"
  },
  {
    id: 3,
    title: "బాల హనుమంతుడు (Young Hanuman)",
    difficulty: "సులభం (Easy)",
    gridSize: 3,
    image: "hanuman.png"
  },
  {
    id: 4,
    title: "సీతా కళ్యాణం (Sita Rama Kalyanam)",
    difficulty: "సులభం (Easy)",
    gridSize: 3,
    image: "rama.png"
  },
  {
    id: 5,
    title: "కాళీయ మర్దనం (Krishna & Kaliya Serpent)",
    difficulty: "మధ్యమం (Medium)",
    gridSize: 4, // Scales up to 4x4 Grid (15 Tiles + 1 Empty)
    image: "krishna.png"
  },
  {
    id: 6,
    title: "సంజీవని పర్వతం (Hanuman Carrying Mountain)",
    difficulty: "మధ్యమం (Medium)",
    gridSize: 4,
    image: "hanuman.png"
  },
  {
    id: 7,
    title: "గీతోపదేశం (Krishna Guiding Arjuna)",
    difficulty: "మధ్యమం (Medium)",
    gridSize: 4,
    image: "krishna.png"
  },
  {
    id: 8,
    title: "లంకా దహనం (Hanuman's Trail in Lanka)",
    difficulty: "మధ్యమం (Medium)",
    gridSize: 4,
    image: "hanuman.png"
  },
  {
    id: 9,
    title: "విశ్వరూప ప్రదర్శన (Vishwaroopa Darshanam)",
    difficulty: "కఠినం (Hard)",
    gridSize: 4,
    image: "krishna.png"
  },
  {
    id: 10,
    title: "సముద్ర లంఘనం (Hanuman Crossing Ocean)",
    difficulty: "కఠినం (Hard)",
    gridSize: 4,
    image: "hanuman.png"
  },
  {
    id: 11,
    title: "గోవర్ధన గిరిధారి (Krishna Lifting Mountain)",
    difficulty: "కఠినం (Hard)",
    gridSize: 4,
    image: "krishna.png"
  },
  {
    id: 12,
    title: "శ్రీరామ పట్టాభిషేకం (The Grand Coronation)",
    difficulty: "కఠినం (Hard)",
    gridSize: 4,
    image: "rama.png"
  }
];

function getLevel(id) {
  return LEVELS.find(l => l.id === Number(id));
}
