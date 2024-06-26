import {
  computed,
  getCurrentInstance,
  inject,
  onMounted,
  provide,
  type ComputedRef,
  type Ref,
} from "vue";
import { onKeyStroke, useLocalStorage } from "@vueuse/core";
import { BoardTile, type Action, type Level, type Direction } from "../types";
import { canMove, move, parseBoard, undo as boardUndo } from "../utils/sokoban";

const SOKOBAN_CTX_KEY = "sokoban";

const INPUT_MIN_INTERVAL = 100;
const UNDO_MIN_INTERVAL = 200;

export type SokobanContext = {
  level: Level;
  board: BoardTile[][];
  tiles: {
    x: number;
    y: number;
    isButton: boolean;
  }[];
  player: Ref<{
    x: number;
    y: number;
  }>;
  boxes: Ref<
    {
      x: number;
      y: number;
      id: number;
      isOnButton: boolean;
    }[]
  >;
  progress: Ref<number>;
  moves: Ref<number>;
  pushes: Ref<number>;
  score: ComputedRef<number>;
  movePlayer: (direction: Direction) => void;
  undo: () => void;
  restart: () => void;
};

let lastMoveInput: number | null = null;
let lastUndoInput: number | null = null;

const useStorageConfig = {
  initOnMounted: true,
};

export function createSokoban(level: Level) {
  const parsedLevel = parseBoard(level.map, level.width, level.height);

  const board = parsedLevel.tiles;
  const tiles: {
    x: number;
    y: number;
    isButton: boolean;
  }[] = [];
  parsedLevel.tiles.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === BoardTile.Block || cell === BoardTile.Empty) return;
      tiles.push({
        x,
        y,
        isButton: cell === BoardTile.Button,
      });
    });
  });

  const levelId = useLocalStorage<number | null>(
    "levelId",
    -1,
    useStorageConfig
  );

  const player = useLocalStorage(
    "player",
    parsedLevel.player,
    useStorageConfig
  );
  const boxes = useLocalStorage("boxes", parsedLevel.boxes, useStorageConfig);
  const progress = computed(() => {
    return Math.round(
      (boxes.value.filter((box) => box.isOnButton).length /
        parsedLevel.boxes.length) *
        100
    );
  });
  const moves = useLocalStorage("moves", 0, useStorageConfig);
  const pushes = useLocalStorage("pushes", 0, useStorageConfig);

  const score = computed(() => {
    return Math.min(
      Math.round(
        (level.moves / moves.value) * (level.pushes / pushes.value)**2 * 100
      ),
      100
    );
  });

  const undoStack = useLocalStorage<Action[]>(
    "undoStack",
    [],
    useStorageConfig
  );

  onMounted(() => {
    if (levelId.value !== level.id) {
      levelId.value = level.id;
      player.value = parsedLevel.player;
      boxes.value = parsedLevel.boxes;
      moves.value = 0;
      pushes.value = 0;
      undoStack.value = [];
    }
  });

  function movePlayer(direction: Direction) {
    const currBoard = {
      tiles: board,
      player: player.value,
      boxes: boxes.value,
    };
    if (!canMove(currBoard, direction)) return;

    const { next, hasPushed } = move(currBoard, direction);

    undoStack.value.push(next.action);

    player.value = next.player;
    boxes.value = next.boxes;
    moves.value++;
    if (hasPushed) pushes.value++;
  }

  function undo() {
    const lastAction = undoStack.value.pop();

    if (!lastAction) return;

    const currBoard = {
      tiles: board,
      player: player.value,
      boxes: boxes.value,
    };
    const next = boardUndo(currBoard, lastAction);

    player.value = next.player;
    boxes.value = next.boxes;
    moves.value--;
    if (lastAction.boxes.length) pushes.value--;
  }

  function restart() {
    player.value = parsedLevel.player;
    boxes.value = parsedLevel.boxes;
    undoStack.value = [];
    moves.value = 0;
    pushes.value = 0;
  }

  provide(SOKOBAN_CTX_KEY, {
    level,
    board,
    tiles,
    player,
    boxes,
    progress,
    moves,
    pushes,
    score,
    movePlayer,
    undo,
    restart,
  });
}

export function useSokoban() {
  const vm: any = getCurrentInstance();
  const sokoban: SokobanContext | undefined =
    vm?.provides[SOKOBAN_CTX_KEY] || inject(SOKOBAN_CTX_KEY, undefined);
  if (!sokoban) {
    throw new Error("useSokoban must be used within a SokobanProvider");
  }
  return sokoban;
}

export function useSokobanKeyControls() {
  const { movePlayer, undo, restart } = useSokoban();

  onKeyStroke(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], (e) => {
    e.preventDefault();
    const direction =
      {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      }[e.code] ?? null;
    if (direction === null) return;
    if (lastMoveInput && Date.now() - lastMoveInput < INPUT_MIN_INTERVAL)
      return;
    movePlayer(direction as Direction);
    lastMoveInput = Date.now();
  });

  onKeyStroke("z", (e) => {
    e.preventDefault();
    if (lastUndoInput && Date.now() - lastUndoInput < UNDO_MIN_INTERVAL) return;
    undo();
    lastUndoInput = Date.now();
  });

  onKeyStroke("r", (e) => {
    e.preventDefault();
    restart();
  });
}
