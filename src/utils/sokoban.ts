import { BoardTile, type Board, type Direction, type Point, type Action, LevelTile } from "../types";

export function getDirectionVector(direction: Direction): Point {
    return {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
    }[direction];
}

export function canMove(board: Board, direction: Direction): boolean {
    const player = board.player;
    const vector = getDirectionVector(direction);
    const nextTile = board.tiles[player.y + vector.y][player.x + vector.x];

    if (nextTile === BoardTile.Block || nextTile === BoardTile.Empty) {
        return false;
    }

    const nextBox = board.boxes.find((box) => box.x === player.x + vector.x && box.y === player.y + vector.y);

    if (nextBox) {
        const nextBoxTile = board.tiles[nextBox.y + vector.y][nextBox.x + vector.x];
        if (nextBoxTile === BoardTile.Block || nextBoxTile === BoardTile.Empty) {
            return false;
        }

        const nextNextBox = board.boxes.find((box) => box.x === nextBox.x + vector.x && box.y === nextBox.y + vector.y);
        if (nextNextBox) {
            return false;
        }
    }

    return true;
}

export function move(board: Board, direction: Direction): Board & { action: Action }{
    const player = board.player;
    const vector = getDirectionVector(direction);
    const action: Action = { player: direction, boxes: [] };

    const newPlayer = { x: player.x + vector.x, y: player.y + vector.y };
    const newBoxes = board.boxes.map((box) => {
        if (box.x === newPlayer.x && box.y === newPlayer.y) {
            const newPoint = { x: box.x + vector.x, y: box.y + vector.y };
            action.boxes.push({ id: box.id, direction });
            return { ...box, x: newPoint.x, y: newPoint.y, isOnButton: board.tiles[newPoint.y][newPoint.x] === BoardTile.Button }; 
        }
        return box;
    });

    return {
        ...board,
        player: newPlayer,
        boxes: newBoxes,
        action,
    };
}

export function isSolved(board: Board): boolean {
    return board.boxes.every((box) => box.isOnButton);
}

export function undo(board: Board, action: Action): Board {
    const player = board.player;
    const vector = getDirectionVector(action.player);
    const newPlayer = { x: player.x - vector.x, y: player.y - vector.y };
    const newBoxes = board.boxes.map((box) => {
        const boxAction = action.boxes.find((boxAction) => boxAction.id === box.id);
        if (boxAction) {
            const boxVector = getDirectionVector(boxAction.direction);
            return { ...box, x: box.x - boxVector.x, y: box.y - boxVector.y, isOnButton: board.tiles[box.y - boxVector.y][box.x - boxVector.x] === BoardTile.Button };
        }
        return box;
    });

    return {
        ...board,
        player: newPlayer,
        boxes: newBoxes,
    };
}

export function parseBoard(encodedBoard: string, width: number, height: number): Board {
    const tiles: Board['tiles'] = [];
    const boxes: Board['boxes'] = [];
    const player: Board['player'] = { x: 0, y: 0 };

    for (let y = 0; y < height; y++) {
        tiles[y] = [];
        for (let x = 0; x < width; x++) {
            const index = y * width + x;
            const tile = encodedBoard[index] as LevelTile;
            tiles[y][x] = {
                [LevelTile.Floor]: BoardTile.Floor,
                [LevelTile.Block]: BoardTile.Block,
                [LevelTile.Player]: BoardTile.Floor,
                [LevelTile.Box]: BoardTile.Floor,
                [LevelTile.Button]: BoardTile.Button,
                [LevelTile.ButtonBox]: BoardTile.Button,
                [LevelTile.ButtonPlayer]: BoardTile.Button,
                [LevelTile.Void]: BoardTile.Empty,
            }[tile];
            
            if (tile === LevelTile.Player || tile === LevelTile.ButtonPlayer) {
                player.x = x;
                player.y = y;
            }

            if (tile === LevelTile.Box || tile === LevelTile.ButtonBox) {
                boxes.push({ x, y, id: boxes.length, isOnButton: tile === LevelTile.ButtonBox });
            }
        }
    }

    return {
        tiles,
        player,
        boxes,
    };
}