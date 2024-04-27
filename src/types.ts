export enum BoardTile {
  Empty = 0,
  Block = 1,
  Floor = 2,
  Button = 3,
}

export type Direction = "up" | "down" | "left" | "right";

export type Point = {
  x: number;
  y: number;
};

export type Box = Point & {
  id: number;
  isOnButton: boolean;
};

export type Board = {
  tiles: BoardTile[][];
  player: Point;
  boxes: Box[];
};

export type Action = {
  player: Direction;
  boxes: { id: number; direction: Direction }[];
};

export type Level = {
  id: number;
  height: number;
  width: number;
  map: string;
  moves: number;
  pushes: number;
};

export enum LevelTile {
    Floor = '0',
    Block = '1',
    Player = '2',
    Box = '3',
    Button = '4',
    ButtonBox = '5',
    ButtonPlayer = '6',
    Void = '7',
  }
