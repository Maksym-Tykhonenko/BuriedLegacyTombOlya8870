export type TriangleCell = {
  id: number;
  row: number;
  col: number;
};

export type TrianglePiece = {
  id: string;
  label: string;
  cells: number[];
  color: string;
};

export type RelicAssemblyLevel = {
  id: number;
  title: string;
  pieces: TrianglePiece[];
};

export const triangleCells: TriangleCell[] = Array.from(
  {length: 15},
  (_, index) => {
    let row = 0;
    let start = 0;
    while (index >= start + row + 1) {
      start += row + 1;
      row += 1;
    }
    return {id: index, row, col: index - start};
  },
);

const palette = ['#d39424', '#1aa391', '#b9332e', '#8a5e20', '#c78321'];

export const relicAssemblyLevels: RelicAssemblyLevel[] = [
  {
    id: 1,
    title: 'First Capstone',
    pieces: [
      {id: 'a', label: 'Crown', cells: [0, 1, 2], color: palette[0]},
      {id: 'b', label: 'Left Wing', cells: [3, 6, 7, 10], color: palette[1]},
      {id: 'c', label: 'Center Lock', cells: [4, 8, 11, 12], color: palette[2]},
      {id: 'd', label: 'Right Wing', cells: [5, 9, 13, 14], color: palette[3]},
    ],
  },
  {
    id: 2,
    title: 'Broken Facade',
    pieces: [
      {id: 'a', label: 'Spire', cells: [0, 2, 5], color: palette[2]},
      {id: 'b', label: 'Left Steps', cells: [1, 3, 6, 10], color: palette[0]},
      {id: 'c', label: 'Inner Steps', cells: [4, 7, 8, 11], color: palette[4]},
      {id: 'd', label: 'Right Base', cells: [9, 12, 13, 14], color: palette[1]},
    ],
  },
  {
    id: 3,
    title: 'Sun Door',
    pieces: [
      {id: 'a', label: 'Top Flame', cells: [0, 1, 3], color: palette[1]},
      {id: 'b', label: 'Right Flame', cells: [2, 4, 5, 9], color: palette[0]},
      {id: 'c', label: 'Left Gate', cells: [6, 7, 10, 11], color: palette[3]},
      {id: 'd', label: 'Seal Bar', cells: [8, 12, 13, 14], color: palette[2]},
    ],
  },
  {
    id: 4,
    title: 'Hidden Shaft',
    pieces: [
      {id: 'a', label: 'Needle', cells: [0, 1, 4, 8], color: palette[4]},
      {id: 'b', label: 'Left Brace', cells: [2, 3, 6], color: palette[2]},
      {id: 'c', label: 'Lower Brace', cells: [5, 9, 13, 14], color: palette[0]},
      {id: 'd', label: 'Floor Plate', cells: [7, 10, 11, 12], color: palette[1]},
    ],
  },
  {
    id: 5,
    title: 'Temple Crown',
    pieces: [
      {id: 'a', label: 'Crown Tip', cells: [0, 1, 2, 4], color: palette[0]},
      {id: 'b', label: 'Left Wall', cells: [3, 6, 10, 11], color: palette[3]},
      {id: 'c', label: 'Right Wall', cells: [5, 8, 9, 14], color: palette[1]},
      {id: 'd', label: 'Base Key', cells: [7, 12, 13], color: palette[2]},
    ],
  },
  {
    id: 6,
    title: 'Serpent Path',
    pieces: [
      {id: 'a', label: 'Top Coil', cells: [0, 2, 4, 7], color: palette[1]},
      {id: 'b', label: 'Left Coil', cells: [1, 3, 6, 10], color: palette[2]},
      {id: 'c', label: 'Lower Coil', cells: [5, 8, 11, 12], color: palette[4]},
      {id: 'd', label: 'Tail', cells: [9, 13, 14], color: palette[0]},
    ],
  },
  {
    id: 7,
    title: 'Royal Seal',
    pieces: [
      {id: 'a', label: 'Apex Seal', cells: [0, 1, 3, 6], color: palette[3]},
      {id: 'b', label: 'Moon Seal', cells: [2, 5, 9], color: palette[1]},
      {id: 'c', label: 'Core Seal', cells: [4, 7, 8, 12], color: palette[0]},
      {id: 'd', label: 'Ground Seal', cells: [10, 11, 13, 14], color: palette[2]},
    ],
  },
  {
    id: 8,
    title: 'Stair of Isis',
    pieces: [
      {id: 'a', label: 'High Stair', cells: [0, 2, 5, 9], color: palette[4]},
      {id: 'b', label: 'Low Stair', cells: [1, 4, 8, 13], color: palette[0]},
      {id: 'c', label: 'Left Stone', cells: [3, 6, 7, 10], color: palette[1]},
      {id: 'd', label: 'Base Stone', cells: [11, 12, 14], color: palette[2]},
    ],
  },
  {
    id: 9,
    title: 'Afterlife Gate',
    pieces: [
      {id: 'a', label: 'Gate Top', cells: [0, 1, 2], color: palette[2]},
      {id: 'b', label: 'Left Gate', cells: [3, 4, 7, 11], color: palette[3]},
      {id: 'c', label: 'Right Gate', cells: [5, 8, 9, 13], color: palette[1]},
      {id: 'd', label: 'Threshold', cells: [6, 10, 12, 14], color: palette[0]},
    ],
  },
  {
    id: 10,
    title: 'Golden Apex',
    pieces: [
      {id: 'a', label: 'Light Tip', cells: [0, 1, 2, 5], color: palette[0]},
      {id: 'b', label: 'Shadow Left', cells: [3, 6, 10], color: palette[2]},
      {id: 'c', label: 'Heart Block', cells: [4, 7, 8, 11, 12], color: palette[1]},
      {id: 'd', label: 'Shadow Right', cells: [9, 13, 14], color: palette[3]},
    ],
  },
];

export function validateRelicAssemblyLevel(level: RelicAssemblyLevel): boolean {
  const cells = level.pieces.flatMap(piece => piece.cells);
  const unique = new Set(cells);
  return (
    cells.length === triangleCells.length &&
    unique.size === triangleCells.length &&
    triangleCells.every(cell => unique.has(cell.id))
  );
}
