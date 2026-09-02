"use client";

import { useState, useEffect, useCallback } from "react";
import { Sound } from "@/lib/sound";

type Board = number[][];

const GRID_SIZE = 4;

const tileColors: Record<number, { bg: string; text: string }> = {
  0: { bg: "#e5e7eb", text: "transparent" },
  2: { bg: "#e8e4f0", text: "#4a3f6b" },
  4: { bg: "#dcd3eb", text: "#4a3f6b" },
  8: { bg: "#f2b179", text: "#fff" },
  16: { bg: "#f59563", text: "#fff" },
  32: { bg: "#f67c5f", text: "#fff" },
  64: { bg: "#f65e3b", text: "#fff" },
  128: { bg: "#edcf72", text: "#fff" },
  256: { bg: "#edcc61", text: "#fff" },
  512: { bg: "#edc850", text: "#fff" },
  1024: { bg: "#edc53f", text: "#fff" },
  2048: { bg: "#edc22e", text: "#fff" },
};

function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

function getEmptyCells(board: Board): [number, number][] {
  const cells: [number, number][] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (board[r][c] === 0) cells.push([r, c]);
    }
  }
  return cells;
}

function addRandomTile(board: Board): Board {
  const next = cloneBoard(board);
  const empty = getEmptyCells(next);
  if (empty.length === 0) return next;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function initBoard(): Board {
  let board: Board = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0)
  );
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
}

function slide(row: number[]): { row: number[]; score: number; merged: boolean } {
  let filtered = row.filter((v) => v !== 0);
  let score = 0;
  let merged = false;
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      score += filtered[i];
      filtered.splice(i + 1, 1);
      merged = true;
    }
  }
  while (filtered.length < GRID_SIZE) filtered.push(0);
  return { row: filtered, score, merged };
}

function rotateLeft(board: Board): Board {
  const next: Board = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0)
  );
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      next[GRID_SIZE - 1 - c][r] = board[r][c];
    }
  }
  return next;
}

function rotateRight(board: Board): Board {
  const next: Board = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0)
  );
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      next[c][GRID_SIZE - 1 - r] = board[r][c];
    }
  }
  return next;
}

function moveLeft(board: Board): { board: Board; score: number; moved: boolean } {
  let totalScore = 0;
  let moved = false;
  const next = cloneBoard(board);
  for (let r = 0; r < GRID_SIZE; r++) {
    const result = slide(next[r]);
    if (JSON.stringify(result.row) !== JSON.stringify(next[r])) moved = true;
    next[r] = result.row;
    totalScore += result.score;
  }
  return { board: next, score: totalScore, moved };
}

function moveRight(board: Board): { board: Board; score: number; moved: boolean } {
  let rotated = rotateRight(rotateRight(board));
  const result = moveLeft(rotated);
  rotated = rotateRight(rotateRight(result.board));
  return { board: rotated, score: result.score, moved: result.moved };
}

function moveUp(board: Board): { board: Board; score: number; moved: boolean } {
  let rotated = rotateLeft(board);
  const result = moveLeft(rotated);
  rotated = rotateRight(result.board);
  return { board: rotated, score: result.score, moved: result.moved };
}

function moveDown(board: Board): { board: Board; score: number; moved: boolean } {
  let rotated = rotateRight(board);
  const result = moveLeft(rotated);
  rotated = rotateLeft(result.board);
  return { board: rotated, score: result.score, moved: result.moved };
}

function hasWon(board: Board): boolean {
  return board.some((row) => row.some((v) => v === 2048));
}

function canMove(board: Board): boolean {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (board[r][c] === 0) return true;
      if (c < GRID_SIZE - 1 && board[r][c] === board[r][c + 1]) return true;
      if (r < GRID_SIZE - 1 && board[r][c] === board[r + 1][c]) return true;
    }
  }
  return false;
}

export default function Game2048() {
  const [board, setBoard] = useState<Board>(initBoard);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("qt-2048-best");
    if (stored) setBest(parseInt(stored, 10) || 0);
  }, []);

  useEffect(() => {
    if (score > best) {
      setBest(score);
      window.localStorage.setItem("qt-2048-best", String(score));
    }
  }, [score, best]);

  const newGame = useCallback(() => {
    setBoard(initBoard());
    setScore(0);
    setGameOver(false);
    setWon(false);
  }, []);

  const keepGoing = useCallback(() => {
    setWon(false);
  }, []);

  const handleMove = useCallback(
    (dir: "left" | "right" | "up" | "down") => {
      if (gameOver) return;
      if (won) return;

      let result;
      if (dir === "left") result = moveLeft(board);
      else if (dir === "right") result = moveRight(board);
      else if (dir === "up") result = moveUp(board);
      else result = moveDown(board);

      if (!result.moved) return;

      Sound.move();
      if (result.score > 0) Sound.match();

      const updated = addRandomTile(result.board);
      setBoard(updated);
      setScore((prev) => prev + result.score);

      if (hasWon(updated)) {
        setWon(true);
        Sound.win();
      } else if (!canMove(updated)) {
        setGameOver(true);
        Sound.lose();
      }
    },
    [board, gameOver, won]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        e.preventDefault();
      }
      if (e.key === "ArrowLeft") handleMove("left");
      else if (e.key === "ArrowRight") handleMove("right");
      else if (e.key === "ArrowUp") handleMove("up");
      else if (e.key === "ArrowDown") handleMove("down");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleMove]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">2048</h1>
          <div className="flex gap-3">
            <div className="rounded-lg bg-gray-100 px-4 py-2 text-center">
              <div className="text-xs font-semibold uppercase text-gray-500">
                Score
              </div>
              <div className="text-xl font-bold text-gray-900">{score}</div>
            </div>
            <div className="rounded-lg bg-gray-100 px-4 py-2 text-center">
              <div className="text-xs font-semibold uppercase text-gray-500">
                Best
              </div>
              <div className="text-xl font-bold text-gray-900">{best}</div>
            </div>
          </div>
        </div>

        <div className="relative rounded-xl bg-gray-300 p-2">
          <div className="grid grid-cols-4 gap-2">
            {board.flat().map((val, i) => {
              const colors = tileColors[val] || tileColors[0];
              return (
                <div
                  key={i}
                  className="flex h-20 w-full items-center justify-center rounded-lg text-2xl font-bold transition-colors"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.text,
                  }}
                >
                  {val !== 0 ? val : ""}
                </div>
              );
            })}
          </div>

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
              <p className="mb-4 text-2xl font-bold text-gray-900">
                Game over!
              </p>
              <button
                onClick={newGame}
                className="rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4338ca]"
              >
                New game
              </button>
            </div>
          )}

          {won && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
              <p className="mb-4 text-2xl font-bold text-[#4f46e5]">
                You win!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={keepGoing}
                  className="rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4338ca]"
                >
                  Keep going
                </button>
                <button
                  onClick={newGame}
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  New game
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 md:hidden">
        <button
          onClick={() => handleMove("up")}
          className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white text-2xl font-bold text-gray-700 shadow-sm active:bg-gray-100"
        >
          ↑
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => handleMove("left")}
            className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white text-2xl font-bold text-gray-700 shadow-sm active:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={() => handleMove("down")}
            className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white text-2xl font-bold text-gray-700 shadow-sm active:bg-gray-100"
          >
            ↓
          </button>
          <button
            onClick={() => handleMove("right")}
            className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white text-2xl font-bold text-gray-700 shadow-sm active:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      <div className="flex w-full max-w-md justify-end md:hidden">
        <button
          onClick={newGame}
          className="rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4338ca]"
        >
          New game
        </button>
      </div>
    </div>
  );
}
