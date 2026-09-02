"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sound } from "@/lib/sound";

const COLS = 10;
const ROWS = 20;
const EMPTY = 0;

type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

const PIECE_COLORS: Record<PieceType, string> = {
  I: "#06b6d4",
  O: "#eab308",
  T: "#a855f7",
  S: "#22c55e",
  Z: "#ef4444",
  J: "#3b82f6",
  L: "#f97316",
};

const SHAPES: Record<PieceType, number[][][]> = {
  I: [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],
  O: [
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
  ],
  T: [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  S: [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  Z: [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  ],
  J: [
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
  ],
  L: [
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
  ],
};

const PIECE_TYPES: PieceType[] = ["I", "O", "T", "S", "Z", "J", "L"];

function createEmptyBoard(): (number | string)[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSpeed(level: number): number {
  return Math.max(100, 800 - level * 70);
}

function getPoints(lines: number, level: number): number {
  const base = [0, 100, 300, 500, 800];
  return (base[lines] || 0) * (level + 1);
}

interface Piece {
  type: PieceType;
  shape: number[][];
  row: number;
  col: number;
  rotation: number;
}

function getShape(type: PieceType, rotation: number): number[][] {
  return SHAPES[type][rotation % SHAPES[type].length];
}

function collides(
  board: (number | string)[][],
  shape: number[][],
  row: number,
  col: number
): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const nr = row + r;
        const nc = col + c;
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return true;
        if (board[nr][nc] !== EMPTY) return true;
      }
    }
  }
  return false;
}

function lockPiece(
  board: (number | string)[][],
  piece: Piece
): (number | string)[][] {
  const newBoard = board.map((row) => [...row]);
  const shape = getShape(piece.type, piece.rotation);
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const nr = piece.row + r;
        const nc = piece.col + c;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
          newBoard[nr][nc] = PIECE_COLORS[piece.type];
        }
      }
    }
  }
  return newBoard;
}

function clearRows(
  board: (number | string)[][]
): { board: (number | string)[][]; cleared: number } {
  const remaining = board.filter((row) => row.some((cell) => cell === EMPTY));
  const cleared = ROWS - remaining.length;
  const emptyRows = Array.from({ length: cleared }, () =>
    Array(COLS).fill(EMPTY)
  );
  return { board: [...emptyRows, ...remaining], cleared };
}

function getGhostRow(
  board: (number | string)[][],
  piece: Piece
): number {
  let ghostRow = piece.row;
  const shape = getShape(piece.type, piece.rotation);
  while (!collides(board, shape, ghostRow + 1, piece.col)) {
    ghostRow++;
  }
  return ghostRow;
}

export default function Tetris() {
  const [board, setBoard] = useState<(number | string)[][]>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextBag, setNextBag] = useState<PieceType[]>([]);
  const [nextPreview, setNextPreview] = useState<PieceType | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [linesCleared, setLinesCleared] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">(
    "idle"
  );
  const [bestScore, setBestScore] = useState(0);

  const boardRef = useRef(board);
  const pieceRef = useRef(currentPiece);
  const bagRef = useRef(nextBag);
  const nextPreviewRef = useRef(nextPreview);
  const scoreRef = useRef(score);
  const levelRef = useRef(level);
  const linesRef = useRef(linesCleared);
  const gameStateRef = useRef(gameState);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    boardRef.current = board;
  }, [board]);
  useEffect(() => {
    pieceRef.current = currentPiece;
  }, [currentPiece]);
  useEffect(() => {
    bagRef.current = nextBag;
  }, [nextBag]);
  useEffect(() => {
    nextPreviewRef.current = nextPreview;
  }, [nextPreview]);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    levelRef.current = level;
  }, [level]);
  useEffect(() => {
    linesRef.current = linesCleared;
  }, [linesCleared]);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("qt-tetris-best");
      if (stored) setBestScore(parseInt(stored, 10) || 0);
    } catch {}
  }, []);

  const saveBest = useCallback((s: number) => {
    setBestScore(s);
    try {
      localStorage.setItem("qt-tetris-best", String(s));
    } catch {}
  }, []);

  const getNextFromBag = useCallback(
    (currentBag: PieceType[]): [PieceType, PieceType[]] => {
      let bag = [...currentBag];
      if (bag.length === 0) {
        bag = shuffleArray(PIECE_TYPES);
      }
      const next = bag.shift()!;
      return [next, bag];
    },
    []
  );

  const spawnPiece = useCallback(
    (
      bag: PieceType[],
      b: (number | string)[][]
    ): { piece: Piece; bag: PieceType[]; canSpawn: boolean } => {
      const [nextType, remainingBag] = getNextFromBag(bag);
      const shape = getShape(nextType, 0);
      const col = Math.floor((COLS - shape[0].length) / 2);
      const row = 0;

      let previewType: PieceType;
      let finalBag: PieceType[];
      [previewType, finalBag] = getNextFromBag(remainingBag);

      if (collides(b, shape, row, col)) {
        return { piece: { type: nextType, shape, row, col, rotation: 0 }, bag: finalBag, canSpawn: false };
      }

      return {
        piece: { type: nextType, shape, row, col, rotation: 0 },
        bag: finalBag,
        canSpawn: true,
      };
    },
    [getNextFromBag]
  );

  const tick = useCallback(() => {
    const b = boardRef.current;
    const p = pieceRef.current;
    const gs = gameStateRef.current;

    if (gs !== "playing" || !p) return;

    const shape = getShape(p.type, p.rotation);
    if (!collides(b, shape, p.row + 1, p.col)) {
      const updated = { ...p, row: p.row + 1 };
      setCurrentPiece(updated);
    } else {
      const locked = lockPiece(b, p);
      Sound.lock();
      const { board: cleared, cleared: count } = clearRows(locked);
      if (count > 0) Sound.clearLine();
      const pts = getPoints(count, levelRef.current);
      const newLines = linesRef.current + count;
      const newLevel = Math.floor(newLines / 10);
      const newScore = scoreRef.current + pts;

      const currentBag = bagRef.current;
      const { piece: nextPiece, bag: newBag, canSpawn } = spawnPiece(
        currentBag,
        cleared
      );

      if (!canSpawn) {
        setBoard(cleared);
        setCurrentPiece(null);
        setScore(newScore);
        setLevel(newLevel);
        setLinesCleared(newLines);
        setGameState("over");
        setNextPreview(null);
        Sound.lose();
        if (newScore > bestScore) saveBest(newScore);
        if (tickRef.current) {
          clearInterval(tickRef.current);
          tickRef.current = null;
        }
        return;
      }

      setBoard(cleared);
      setCurrentPiece(nextPiece);
      setNextBag(newBag);
      setNextPreview(null);
      setScore(newScore);
      setLevel(newLevel);
      setLinesCleared(newLines);
    }
  }, [spawnPiece, saveBest, bestScore]);

  const startGame = useCallback(() => {
    Sound.click();
    const empty = createEmptyBoard();
    const initialBag = shuffleArray(PIECE_TYPES);
    const { piece: firstPiece, bag: remainingBag, canSpawn } = spawnPiece(
      initialBag,
      empty
    );

    if (!canSpawn) return;

    setBoard(empty);
    setCurrentPiece(firstPiece);
    setNextBag(remainingBag);
    setNextPreview(null);
    setScore(0);
    setLevel(0);
    setLinesCleared(0);
    setGameState("playing");

    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(tick, getSpeed(0));
  }, [spawnPiece, tick]);

  useEffect(() => {
    if (gameState === "playing" && tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = setInterval(tick, getSpeed(level));
    }
    return () => {
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, [gameState, level, tick]);

  const movePiece = useCallback(
    (dr: number, dc: number) => {
      const p = pieceRef.current;
      const b = boardRef.current;
      if (!p || gameStateRef.current !== "playing") return;

      const shape = getShape(p.type, p.rotation);
      if (!collides(b, shape, p.row + dr, p.col + dc)) {
        const updated = { ...p, row: p.row + dr, col: p.col + dc };
        setCurrentPiece(updated);
        if (dc !== 0) Sound.move();
      }
    },
    []
  );

  const rotatePiece = useCallback(() => {
    const p = pieceRef.current;
    const b = boardRef.current;
    if (!p || gameStateRef.current !== "playing") return;

    const newRotation = (p.rotation + 1) % 4;
    const shape = getShape(p.type, newRotation);

    const kicks = [
      [0, 0],
      [0, -1],
      [0, 1],
      [0, -2],
      [0, 2],
      [-1, 0],
      [-1, -1],
      [-1, 1],
    ];

    for (const [dr, dc] of kicks) {
      if (!collides(b, shape, p.row + dr, p.col + dc)) {
        setCurrentPiece({
          ...p,
          row: p.row + dr,
          col: p.col + dc,
          rotation: newRotation,
        });
        Sound.rotate();
        return;
      }
    }
  }, []);

  const hardDrop = useCallback(() => {
    const p = pieceRef.current;
    const b = boardRef.current;
    if (!p || gameStateRef.current !== "playing") return;

    const ghostRow = getGhostRow(b, p);
    const dropDistance = ghostRow - p.row;
    const dropped = { ...p, row: ghostRow };
    const locked = lockPiece(b, dropped);
    Sound.drop();
    const { board: cleared, cleared: count } = clearRows(locked);
    if (count > 0) Sound.clearLine();
    const pts = getPoints(count, levelRef.current) + dropDistance * 2;
    const newLines = linesRef.current + count;
    const newLevel = Math.floor(newLines / 10);
    const newScore = scoreRef.current + pts;

    const currentBag = bagRef.current;
    const { piece: nextPiece, bag: newBag, canSpawn } = spawnPiece(
      currentBag,
      cleared
    );

    if (!canSpawn) {
      setBoard(cleared);
      setCurrentPiece(null);
      setScore(newScore);
      setLevel(newLevel);
      setLinesCleared(newLines);
      setGameState("over");
      setNextPreview(null);
      Sound.lose();
      if (newScore > bestScore) saveBest(newScore);
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
      return;
    }

    setBoard(cleared);
    setCurrentPiece(nextPiece);
    setNextBag(newBag);
    setNextPreview(null);
    setScore(newScore);
    setLevel(newLevel);
    setLinesCleared(newLines);
  }, [spawnPiece, saveBest, bestScore]);

  const softDrop = useCallback(() => {
    movePiece(1, 0);
  }, [movePiece]);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swipeableRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      touchStart.current = null;
      const threshold = 24;
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;
      if (Math.abs(dx) > Math.abs(dy)) movePiece(0, dx > 0 ? 1 : -1);
      else if (dy > 0) softDrop();
      else rotatePiece();
    };
    node.addEventListener("touchstart", onTouchStart, { passive: true });
    node.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      node.removeEventListener("touchstart", onTouchStart);
      node.removeEventListener("touchend", onTouchEnd);
    };
  }, [movePiece, softDrop, rotatePiece]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current !== "playing") return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          movePiece(0, -1);
          break;
        case "ArrowRight":
          e.preventDefault();
          movePiece(0, 1);
          break;
        case "ArrowDown":
          e.preventDefault();
          softDrop();
          break;
        case "ArrowUp":
          e.preventDefault();
          rotatePiece();
          break;
        case " ":
          e.preventDefault();
          hardDrop();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePiece, rotatePiece, softDrop, hardDrop]);

  const shareScore = useCallback(() => {
    const text = `🎮 Tetris score: ${scoreRef.current}, level ${levelRef.current}!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }, []);

  const renderCell = (cell: number | string, isGhost?: boolean) => {
    if (cell === EMPTY) {
      return (
        <div
          className="border border-gray-700/20"
          style={{ aspectRatio: "1", backgroundColor: isGhost ? undefined : "#1a1a2e" }}
        />
      );
    }
    return (
      <div
        className="rounded-sm"
        style={{
          aspectRatio: "1",
          backgroundColor: String(cell),
          opacity: isGhost ? 0.3 : 1,
          boxShadow: isGhost ? undefined : `inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3)`,
        }}
      />
    );
  };

  const displayBoard = createEmptyBoard();
  const boardClone = board.map((row) => [...row]);

  if (currentPiece) {
    const shape = getShape(currentPiece.type, currentPiece.rotation);
    const ghostRow = getGhostRow(boardClone, currentPiece);

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const gr = ghostRow + r;
          const gc = currentPiece.col + c;
          if (gr >= 0 && gr < ROWS && gc >= 0 && gc < COLS) {
            if (boardClone[gr][gc] === EMPTY) {
              boardClone[gr][gc] = "ghost";
            }
          }
          const pr = currentPiece.row + r;
          const pc = currentPiece.col + c;
          if (pr >= 0 && pr < ROWS && pc >= 0 && pc < COLS) {
            boardClone[pr][pc] = PIECE_COLORS[currentPiece.type];
          }
        }
      }
    }
  }

  const previewType = nextPreview || (currentPiece && bagRef.current.length > 0 ? bagRef.current[0] : null);

  return (
    <div className="game-bg-animated flex flex-col items-center gap-6 select-none rounded-xl">
      <div className="flex flex-col md:flex-row gap-8 md:items-start items-center">
        <div className="flex flex-col gap-3 items-center">
          <div
            ref={swipeableRef}
            className="rounded-lg overflow-hidden border-2 border-accent-600/30 touch-none"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
              width: "min(300px, 80vw)",
              aspectRatio: `${COLS}/${ROWS}`,
            }}
          >
            {boardClone.map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`${ri}-${ci}`}>
                  {renderCell(cell, cell === "ghost")}
                </div>
              ))
            )}
          </div>

          {gameState === "idle" && (
            <button
              onClick={startGame}
              className="w-full rounded-lg bg-accent-600 py-3 text-lg font-bold text-white transition hover:bg-accent-700 active:scale-95"
            >
              Start Game
            </button>
          )}

          {gameState === "over" && (
            <div className="relative rounded-lg overflow-hidden" style={{ width: "min(300px, 80vw)" }}>
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 p-6 z-10">
                <p className="text-2xl font-extrabold text-white">Game Over</p>
                <p className="text-lg text-gray-300">
                  Score: <span className="font-bold text-white">{score}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Level {level} &middot; Lines {linesCleared}
                </p>
                {score > bestScore && (
                  <p className="text-sm font-bold text-yellow-400">New Best Score!</p>
                )}
                <button
                  onClick={startGame}
                  className="w-full rounded-lg bg-accent-600 py-2.5 font-bold text-white transition hover:bg-accent-700 active:scale-95"
                >
                  Play Again
                </button>
                <button
                  onClick={shareScore}
                  className="w-full rounded-lg border border-accent-600 py-2.5 font-bold text-accent-600 transition hover:bg-accent-50 active:scale-95"
                >
                  Share your score
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 pt-1 md:items-stretch items-center">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Score
            </span>
            <span className="text-xl font-bold tabular-nums text-gray-900">
              {score}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Level
            </span>
            <span className="text-xl font-bold tabular-nums text-gray-900">
              {level}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Lines
            </span>
            <span className="text-xl font-bold tabular-nums text-gray-900">
              {linesCleared}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Best
            </span>
            <span className="text-xl font-bold tabular-nums text-gray-900">
              {bestScore}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 mt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Next
            </span>
            <div
              className="rounded border border-gray-200 p-1"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(4, minmax(0, 1fr))`,
                width: 80,
                aspectRatio: "1",
                backgroundColor: "#f9fafb",
              }}
            >
              {previewType
                ? (() => {
                    const shape = getShape(previewType, 0);
                    const cells: React.ReactNode[] = [];
                    for (let r = 0; r < 4; r++) {
                      for (let c = 0; c < 4; c++) {
                        if (r < shape.length && c < shape[r].length && shape[r][c]) {
                          cells.push(
                            <div
                              key={`prev-${r}-${c}`}
                              className="rounded-sm"
                              style={{
                                aspectRatio: "1",
                                backgroundColor: PIECE_COLORS[previewType],
                                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3)`,
                              }}
                            />
                          );
                        } else {
                          cells.push(
                            <div
                              key={`prev-${r}-${c}`}
                              style={{ aspectRatio: "1" }}
                            />
                          );
                        }
                      }
                    }
                    return cells;
                  })()
                : Array.from({ length: 16 }).map((_, i) => (
                    <div key={`empty-${i}`} style={{ aspectRatio: "1" }} />
                  ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xs grid grid-cols-3 gap-2 mt-2 md:hidden select-none">
        <button
          type="button"
          onPointerDown={(e) => { e.preventDefault(); movePiece(0, -1); }}
          className="rounded-lg bg-slate-800 py-3 text-lg font-bold text-white active:bg-slate-600"
        >
          ◀
        </button>
        <button
          type="button"
          onPointerDown={(e) => { e.preventDefault(); rotatePiece(); }}
          className="rounded-lg bg-slate-800 py-3 text-lg font-bold text-white active:bg-slate-600"
        >
          ↻
        </button>
        <button
          type="button"
          onPointerDown={(e) => { e.preventDefault(); movePiece(0, 1); }}
          className="rounded-lg bg-slate-800 py-3 text-lg font-bold text-white active:bg-slate-600"
        >
          ▶
        </button>
        <button
          type="button"
          onPointerDown={(e) => { e.preventDefault(); softDrop(); }}
          className="col-span-3 rounded-lg bg-slate-700 py-3 text-base font-bold text-white active:bg-slate-500"
        >
          Soft Drop (▼)
        </button>
      </div>

      <div className="flex flex-col items-center gap-1 text-xs text-gray-400">
        <p className="md:hidden">Swipe the board or use the buttons below</p>
        <p className="hidden md:block">Arrow keys to move &middot; Up to rotate &middot; Space to drop</p>
      </div>
    </div>
  );
}
