"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Sound } from "@/lib/sound";

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_CONFIG: Record<Difficulty, { rows: number; cols: number; mines: number }> = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 },
};

interface Cell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacentMines: number;
}

const NUMBER_COLORS: Record<number, string> = {
  1: "text-blue-600",
  2: "text-green-600",
  3: "text-red-600",
  4: "text-purple-700",
  5: "text-amber-700",
  6: "text-cyan-600",
  7: "text-gray-800",
  8: "text-gray-500",
};

function createEmptyBoard(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacentMines: 0,
    }))
  );
}

function placeMines(board: Cell[][], rows: number, cols: number, mines: number, safeR: number, safeC: number): Cell[][] {
  const newBoard = board.map((r) => r.map((c) => ({ ...c })));
  const safe = new Set<string>();
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      safe.add(`${safeR + dr},${safeC + dc}`);
    }
  }

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!newBoard[r][c].mine && !safe.has(`${r},${c}`)) {
      newBoard[r][c].mine = true;
      placed++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (newBoard[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && newBoard[nr][nc].mine) {
            count++;
          }
        }
      }
      newBoard[r][c].adjacentMines = count;
    }
  }

  return newBoard;
}

function floodReveal(board: Cell[][], rows: number, cols: number, r: number, c: number): Cell[][] {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  const queue: [number, number][] = [[r, c]];
  const visited = new Set<string>();
  visited.add(`${r},${c}`);

  while (queue.length > 0) {
    const [cr, cc] = queue.shift()!;
    if (newBoard[cr][cc].revealed || newBoard[cr][cc].flagged) continue;
    newBoard[cr][cc].revealed = true;

    if (newBoard[cr][cc].adjacentMines === 0 && !newBoard[cr][cc].mine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = cr + dr;
          const nc = cc + dc;
          const key = `${nr},${nc}`;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited.has(key) && !newBoard[nr][nc].mine) {
            visited.add(key);
            queue.push([nr, nc]);
          }
        }
      }
    }
  }

  return newBoard;
}

function checkWin(board: Cell[][], rows: number, cols: number, mines: number): boolean {
  let revealedCount = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].revealed) revealedCount++;
    }
  }
  return revealedCount === rows * cols - mines;
}

function getBestTimes(): Record<Difficulty, number | null> {
  if (typeof window === "undefined") return { easy: null, medium: null, hard: null };
  try {
    const raw = localStorage.getItem("qt-minesweeper-best");
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        easy: parsed.easy ?? null,
        medium: parsed.medium ?? null,
        hard: parsed.hard ?? null,
      };
    }
  } catch {}
  return { easy: null, medium: null, hard: null };
}

function saveBestTime(difficulty: Difficulty, time: number) {
  if (typeof window === "undefined") return;
  const current = getBestTimes();
  if (current[difficulty] === null || time < current[difficulty]!) {
    const updated = { ...current, [difficulty]: time };
    localStorage.setItem("qt-minesweeper-best", JSON.stringify(updated));
  }
}

export default function Minesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<"idle" | "playing" | "won" | "lost">("idle");
  const [timer, setTimer] = useState(0);
  const [bestTimes, setBestTimes] = useState<Record<Difficulty, number | null>>({ easy: null, medium: null, hard: null });
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { rows, cols, mines } = DIFFICULTY_CONFIG[difficulty];

  useEffect(() => {
    setBestTimes(getBestTimes());
  }, []);

  useEffect(() => {
    if (gameState === "playing" && !timerRef.current) {
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState]);

  const resetGame = useCallback(
    (diff: Difficulty) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setDifficulty(diff);
      setBoard(createEmptyBoard(DIFFICULTY_CONFIG[diff].rows, DIFFICULTY_CONFIG[diff].cols));
      setGameState("idle");
      setTimer(0);
    },
    []
  );

  useEffect(() => {
    resetGame(difficulty);
  }, []);

  const flagCount = board.reduce((acc, row) => acc + row.filter((c) => c.flagged).length, 0);
  const minesLeft = mines - flagCount;

  const handleLeftClick = useCallback(
    (r: number, c: number) => {
      if (gameState === "won" || gameState === "lost") return;
      if (board[r][c].flagged || board[r][c].revealed) return;

      let currentBoard = board;

      if (gameState === "idle") {
        currentBoard = placeMines(board, rows, cols, mines, r, c);
        setGameState("playing");
      }

      const newBoard = floodReveal(currentBoard, rows, cols, r, c);

      if (newBoard[r][c].mine) {
        for (let ir = 0; ir < rows; ir++) {
          for (let ic = 0; ic < cols; ic++) {
            if (newBoard[ir][ic].mine) newBoard[ir][ic].revealed = true;
          }
        }
      setBoard(newBoard);
      setGameState("lost");
      Sound.lose();
      if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        return;
      }

      setBoard(newBoard);
      Sound.click();

      if (checkWin(newBoard, rows, cols, mines)) {
        setGameState("won");
        Sound.win();
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        saveBestTime(difficulty, timer);
        setBestTimes(getBestTimes());
      }
    },
    [board, gameState, rows, cols, mines, difficulty, timer]
  );

  const handleRightClick = useCallback(
    (r: number, c: number) => {
      if (gameState === "won" || gameState === "lost" || gameState === "idle") return;
      if (board[r][c].revealed) return;

      const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
      newBoard[r][c].flagged = !newBoard[r][c].flagged;
      Sound.place();
      setBoard(newBoard);
    },
    [board, gameState]
  );

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const handleTouchStart = useCallback(
    (r: number, c: number) => {
      const timer = setTimeout(() => {
        handleRightClick(r, c);
      }, 500);
      setLongPressTimer(timer);
    },
    [handleRightClick]
  );

  const handleTouchEnd = useCallback(
    (r: number, c: number, e: React.TouchEvent) => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        setLongPressTimer(null);
      }
      if (e.cancelable) e.preventDefault();
      handleLeftClick(r, c);
    },
    [longPressTimer, handleLeftClick]
  );

  const handleShare = useCallback(async () => {
    const text = `💣 I cleared ${difficulty} in ${timer}s!`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  }, [difficulty, timer]);

  const cellSize = difficulty === "hard" ? "w-7 h-7 text-xs" : difficulty === "medium" ? "w-8 h-8 text-sm" : "w-10 h-10 text-base";

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
          <button
            key={diff}
            onClick={() => resetGame(diff)}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
              difficulty === diff
                ? "bg-accent-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
          <span className="text-lg">💣</span>
          <span className="font-mono font-bold text-lg">{minesLeft}</span>
        </div>
        <div className="font-mono font-bold text-lg bg-gray-100 rounded-lg px-4 py-2">
          {String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}
        </div>
        {bestTimes[difficulty] !== null && (
          <div className="text-sm text-gray-500 bg-gray-100 rounded-lg px-4 py-2">
            Best: {bestTimes[difficulty]}s
          </div>
        )}
      </div>

      <div
        className="inline-grid gap-0.5 bg-gray-400 p-1 rounded-lg select-none"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        onContextMenu={handleContextMenu}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              className={`${cellSize} flex items-center justify-center font-bold transition-colors ${
                cell.revealed
                  ? cell.mine
                    ? "bg-red-200"
                    : "bg-gray-100"
                  : cell.flagged
                  ? "bg-accent-100"
                  : "bg-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => handleLeftClick(r, c)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleRightClick(r, c);
              }}
              onTouchStart={() => handleTouchStart(r, c)}
              onTouchEnd={(e) => handleTouchEnd(r, c, e)}
            >
              {cell.flagged && !cell.revealed && <span>⚑</span>}
              {cell.revealed && cell.mine && <span>💣</span>}
              {cell.revealed && !cell.mine && cell.adjacentMines > 0 && (
                <span className={NUMBER_COLORS[cell.adjacentMines] || ""}>{cell.adjacentMines}</span>
              )}
            </button>
          ))
        )}
      </div>

      {(gameState === "won" || gameState === "lost") && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4">
            <h2 className="text-2xl font-bold mb-2">
              {gameState === "won" ? "🎉 You Win!" : "💥 Game Over"}
            </h2>
            <p className="text-gray-600 mb-6">
              {gameState === "won"
                ? `Cleared ${difficulty} in ${timer}s!`
                : "Better luck next time!"}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => resetGame(difficulty)}
                className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-700"
              >
                Play Again
              </button>
              {gameState === "won" && (
                <button
                  onClick={handleShare}
                  className="rounded-lg border-2 border-accent-600 px-5 py-2.5 text-sm font-semibold text-accent-600 hover:bg-accent-50"
                >
                  Share your score
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}