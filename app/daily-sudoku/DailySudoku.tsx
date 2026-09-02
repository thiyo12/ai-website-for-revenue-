"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Sound } from "@/lib/sound";

type Cell = { value: number; given: boolean; pencil: number[] };
type Difficulty = "easy" | "medium" | "hard";
type PuzzleData = {
  solved: number[][];
  puzzle: number[][];
  difficulty: Difficulty;
  date: string;
};
type BestTimes = { easy: string | null; medium: string | null; hard: string | null };

function mulberry32(seed: number): () => number {
  let t = seed | 0;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let n = Math.imul(t ^ (t >>> 15), 1 | t);
    n ^= n + Math.imul(n ^ (n >>> 7), 61 | n);
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
  };
}

function dateToSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash + dateStr.charCodeAt(i)) | 0;
  }
  return hash;
}

function isValid(grid: number[][], row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }
  const br = Math.floor(row / 3) * 3;
  const bc = Math.floor(col / 3) * 3;
  for (let r = br; r < br + 3; r++) {
    for (let c = bc; c < bc + 3; c++) {
      if (grid[r][c] === num) return false;
    }
  }
  return true;
}

function countSolutions(grid: number[][], limit: number = 2): number {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] === 0) {
        let count = 0;
        for (let n = 1; n <= 9; n++) {
          if (isValid(grid, r, c, n)) {
            grid[r][c] = n;
            count += countSolutions(grid, limit - count);
            grid[r][c] = 0;
            if (count >= limit) return count;
          }
        }
        return count;
      }
    }
  }
  return 1;
}

function generateSolved(rng: () => number): number[][] {
  const grid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  function fill(pos: number): boolean {
    if (pos === 81) return true;
    const r = Math.floor(pos / 9);
    const c = pos % 9;
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 8; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    for (const n of nums) {
      if (isValid(grid, r, c, n)) {
        grid[r][c] = n;
        if (fill(pos + 1)) return true;
        grid[r][c] = 0;
      }
    }
    return false;
  }
  fill(0);
  return grid;
}

function createPuzzle(
  solved: number[][],
  difficulty: Difficulty,
  rng: () => number
): number[][] {
  const targets: Record<Difficulty, number> = { easy: 45, medium: 35, hard: 27 };
  const target = targets[difficulty];
  const puzzle = solved.map((r) => [...r]);
  let givens = 81;

  const positions = Array.from({ length: 81 }, (_, i) => i);
  for (let i = 80; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  for (const pos of positions) {
    if (givens <= target) break;
    const r = Math.floor(pos / 9);
    const c = pos % 9;
    const backup = puzzle[r][c];
    puzzle[r][c] = 0;
    if (countSolutions(puzzle.map((row) => [...row])) === 1) {
      givens--;
    } else {
      puzzle[r][c] = backup;
    }
  }
  return puzzle;
}

function formatTime(sec: number): string {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function DailySudoku() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [puzzleData, setPuzzleData] = useState<PuzzleData | null>(null);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [pencilMode, setPencilMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [solved, setSolved] = useState(false);
  const [bestTimes, setBestTimes] = useState<BestTimes>({
    easy: null,
    medium: null,
    hard: null,
  });
  const [showWin, setShowWin] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const gridRef = useRef(grid);
  gridRef.current = grid;
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const pencilModeRef = useRef(pencilMode);
  pencilModeRef.current = pencilMode;
  const solvedRef = useRef(solved);
  solvedRef.current = solved;
  const puzzleDataRef = useRef(puzzleData);
  puzzleDataRef.current = puzzleData;
  const timerRunningRef = useRef(timerRunning);
  timerRunningRef.current = timerRunning;
  const timerValRef = useRef(timer);
  timerValRef.current = timer;
  const difficultyRef = useRef(difficulty);
  difficultyRef.current = difficulty;

  useEffect(() => {
    try {
      const stored = localStorage.getItem("qt-sudoku-best");
      if (stored) setBestTimes(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("qt-sudoku-best", JSON.stringify(bestTimes));
    } catch {}
  }, [bestTimes]);

  const generatePuzzle = useCallback((diff: Difficulty) => {
    const dateStr = getTodayString();
    const seed = dateToSeed(`${dateStr}-${diff}`);
    let solvedGrid: number[][] | null = null;
    for (let attempt = 0; attempt < 10; attempt++) {
      const g = generateSolved(mulberry32(seed + attempt));
      if (g.every((r) => r.every((v) => v !== 0))) {
        solvedGrid = g;
        break;
      }
    }
    if (!solvedGrid) solvedGrid = generateSolved(mulberry32(seed));
    const puzzle = createPuzzle(
      solvedGrid,
      diff,
      mulberry32(seed + 1000)
    );
    setPuzzleData({
      solved: solvedGrid,
      puzzle,
      difficulty: diff,
      date: dateStr,
    });
    setGrid(
      puzzle.map((r) =>
        r.map((v) => ({ value: v, given: v !== 0, pencil: [] }))
      )
    );
    setSelected(null);
    setTimer(0);
    setTimerRunning(false);
    setSolved(false);
    setShowWin(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    generatePuzzle(difficulty);
  }, [generatePuzzle, difficulty]);

  useEffect(() => {
    if (timerRunning && !solved) {
      intervalRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning, solved]);

  useEffect(() => {
    const pd = puzzleDataRef.current;
    const g = gridRef.current;
    const s = solvedRef.current;
    if (!pd || s || g.length === 0) return;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (g[r][c].value === 0 || g[r][c].value !== pd.solved[r][c])
          return;
      }
    }
    setSolved(true);
    setTimerRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => setShowWin(true), 300);
    Sound.win();
    const t = timerValRef.current;
    const timeStr = formatTime(t);
    const diff = difficultyRef.current;
    setBestTimes((prev) => {
      const best = prev[diff];
      if (!best) return { ...prev, [diff]: timeStr };
      const [bm, bs] = best.split(":").map(Number);
      if (t < bm * 60 + bs) return { ...prev, [diff]: timeStr };
      return prev;
    });
  }, [grid]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (solvedRef.current) return;
      const key = e.key;
      if (key >= "1" && key <= "9") {
        const num = parseInt(key);
        const sel = selectedRef.current;
        const g = gridRef.current;
        const pm = pencilModeRef.current;
        if (!sel) return;
        const [r, c] = sel;
        if (g[r][c].given) return;
        if (!timerRunningRef.current) setTimerRunning(true);
        Sound.place();
        setGrid((prev) => {
          const ng = prev.map((row) =>
            row.map((cell) => ({ ...cell, pencil: [...cell.pencil] }))
          );
          if (pm) {
            if (ng[r][c].value !== 0) {
              ng[r][c].value = 0;
              ng[r][c].pencil = [];
            }
            const idx = ng[r][c].pencil.indexOf(num);
            if (idx >= 0) ng[r][c].pencil.splice(idx, 1);
            else {
              ng[r][c].pencil.push(num);
              ng[r][c].pencil.sort();
            }
          } else {
            ng[r][c].value = num;
            ng[r][c].pencil = [];
            for (let i = 0; i < 9; i++) {
              if (i !== c)
                ng[r][i].pencil = ng[r][i].pencil.filter((n) => n !== num);
              if (i !== r)
                ng[i][c].pencil = ng[i][c].pencil.filter((n) => n !== num);
            }
            const br = Math.floor(r / 3) * 3;
            const bc = Math.floor(c / 3) * 3;
            for (let rr = br; rr < br + 3; rr++)
              for (let cc = bc; cc < bc + 3; cc++)
                if (rr !== r || cc !== c)
                  ng[rr][cc].pencil = ng[rr][cc].pencil.filter(
                    (n) => n !== num
                  );
          }
          return ng;
        });
      } else if (key === "Backspace" || key === "Delete") {
        const sel = selectedRef.current;
        const g = gridRef.current;
        if (!sel) return;
        const [r, c] = sel;
        if (g[r][c].given) return;
        setGrid((prev) => {
          const ng = prev.map((row) =>
            row.map((cell) => ({ ...cell, pencil: [...cell.pencil] }))
          );
          ng[r][c].value = 0;
          ng[r][c].pencil = [];
          return ng;
        });
      } else if (key === "Shift") {
        setPencilMode((p) => !p);
      } else if (key.startsWith("Arrow") && selectedRef.current) {
        const [r, c] = selectedRef.current;
        if (key === "ArrowUp") setSelected([Math.max(0, r - 1), c]);
        else if (key === "ArrowDown")
          setSelected([Math.min(8, r + 1), c]);
        else if (key === "ArrowLeft")
          setSelected([r, Math.max(0, c - 1)]);
        else if (key === "ArrowRight")
          setSelected([r, Math.min(8, c + 1)]);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function numInput(num: number) {
    const sel = selectedRef.current;
    const g = gridRef.current;
    const pm = pencilModeRef.current;
    if (!sel || solvedRef.current) return;
    const [r, c] = sel;
    if (g[r][c].given) return;
    if (!timerRunningRef.current) setTimerRunning(true);
    Sound.place();
    setGrid((prev) => {
      const ng = prev.map((row) =>
        row.map((cell) => ({ ...cell, pencil: [...cell.pencil] }))
      );
      if (pm) {
        if (ng[r][c].value !== 0) {
          ng[r][c].value = 0;
          ng[r][c].pencil = [];
        }
        const idx = ng[r][c].pencil.indexOf(num);
        if (idx >= 0) ng[r][c].pencil.splice(idx, 1);
        else {
          ng[r][c].pencil.push(num);
          ng[r][c].pencil.sort();
        }
      } else {
        ng[r][c].value = num;
        ng[r][c].pencil = [];
        for (let i = 0; i < 9; i++) {
          if (i !== c)
            ng[r][i].pencil = ng[r][i].pencil.filter((n) => n !== num);
          if (i !== r)
            ng[i][c].pencil = ng[i][c].pencil.filter((n) => n !== num);
        }
        const br = Math.floor(r / 3) * 3;
        const bc = Math.floor(c / 3) * 3;
        for (let rr = br; rr < br + 3; rr++)
          for (let cc = bc; cc < bc + 3; cc++)
            if (rr !== r || cc !== c)
              ng[rr][cc].pencil = ng[rr][cc].pencil.filter((n) => n !== num);
      }
      return ng;
    });
  }

  function eraseCell() {
    const sel = selectedRef.current;
    const g = gridRef.current;
    if (!sel || solvedRef.current) return;
    const [r, c] = sel;
    if (g[r][c].given) return;
    setGrid((prev) => {
      const ng = prev.map((row) =>
        row.map((cell) => ({ ...cell, pencil: [...cell.pencil] }))
      );
      ng[r][c].value = 0;
      ng[r][c].pencil = [];
      return ng;
    });
  }

  function hintCell() {
    const sel = selectedRef.current;
    const g = gridRef.current;
    const pd = puzzleDataRef.current;
    if (!sel || solvedRef.current || !pd) return;
    const [r, c] = sel;
    if (g[r][c].given || g[r][c].value === pd.solved[r][c]) return;
    if (!timerRunningRef.current) setTimerRunning(true);
    setGrid((prev) => {
      const ng = prev.map((row) =>
        row.map((cell) => ({ ...cell, pencil: [...cell.pencil] }))
      );
      ng[r][c].value = pd.solved[r][c];
      ng[r][c].pencil = [];
      return ng;
    });
  }

  function handleShare() {
    const text = `🧩 I solved today's ${difficulty} Sudoku in ${formatTime(timerValRef.current)}!`;
    navigator.clipboard.writeText(text).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  }

  if (!puzzleData || grid.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-500">
        Loading puzzle…
      </div>
    );
  }

  const [sr, sc] = selected ?? [-1, -1];
  const selectedVal = sr >= 0 ? grid[sr]?.[sc]?.value ?? 0 : 0;

  return (
    <div className="flex flex-col items-center gap-5 p-4 max-w-lg mx-auto select-none">
      <h1 className="text-2xl font-bold text-gray-900">Daily Sudoku</h1>

      <div className="flex gap-2">
        {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => {
              setDifficulty(d);
              generatePuzzle(d);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              difficulty === d
                ? "bg-accent-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {d[0].toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      <div className="text-lg font-mono text-gray-600 tabular-nums">
        {formatTime(timer)}
      </div>

      <div className="inline-grid grid-cols-9 border-2 border-gray-900 rounded-sm">
        {grid.flatMap((row, r) =>
          row.map((cell, c) => {
            const isGiven = cell.given;
            const isWrong =
              !isGiven &&
              cell.value !== 0 &&
              puzzleData.solved[r][c] !== cell.value;
            const isSel = r === sr && c === sc;
            const isSameNum =
              selectedVal !== 0 && cell.value === selectedVal;
            const isPeer =
              sr >= 0 &&
              (r === sr ||
                c === sc ||
                (Math.floor(r / 3) === Math.floor(sr / 3) &&
                  Math.floor(c / 3) === Math.floor(sc / 3)));

            let bg = "bg-white";
            if (isSel) bg = "bg-accent-100";
            else if (isSameNum && cell.value !== 0) bg = "bg-indigo-50";
            else if (isPeer) bg = "bg-gray-50";

            return (
              <button
                key={`${r}-${c}`}
                onClick={() => {
                  setSelected([r, c]);
                  if (!timerRunning && !solved) setTimerRunning(true);
                }}
                className={`w-10 h-10 flex items-center justify-center text-lg ${bg}
                  ${
                    c < 8
                      ? c % 3 === 2
                        ? "border-r-2 border-r-gray-900"
                        : "border-r border-r-gray-300"
                      : ""
                  }
                  ${
                    r < 8
                      ? r % 3 === 2
                        ? "border-b-2 border-b-gray-900"
                        : "border-b border-b-gray-300"
                      : ""
                  }
                  ${
                    isGiven
                      ? "font-bold text-gray-900"
                      : isWrong
                        ? "text-red-500 font-semibold"
                        : "text-accent-600"
                  }`}
              >
                {cell.value !== 0 ? (
                  cell.value
                ) : cell.pencil.length > 0 ? (
                  <div className="grid grid-cols-3 w-full h-full">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <span
                        key={n}
                        className="text-[8px] text-gray-400 flex items-center justify-center"
                      >
                        {cell.pencil.includes(n) ? n : ""}
                      </span>
                    ))}
                  </div>
                ) : null}
              </button>
            );
          })
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={eraseCell}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-semibold"
        >
          Erase
        </button>
        <button
          onClick={() => setPencilMode((p) => !p)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            pencilMode
              ? "bg-accent-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Pencil {pencilMode ? "ON" : "OFF"}
        </button>
        <button
          onClick={hintCell}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-semibold"
        >
          Hint
        </button>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => numInput(n)}
            className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold text-lg transition-colors"
          >
            {n}
          </button>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        Best: Easy {bestTimes.easy || "—"} · Medium {bestTimes.medium || "—"} ·{" "}
        Hard {bestTimes.hard || "—"}
      </div>

      {showWin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Puzzle Complete!
            </h2>
            <p className="text-gray-600 mb-1">
              {difficulty[0].toUpperCase() + difficulty.slice(1)}
            </p>
            <p className="text-3xl font-mono font-bold text-accent-600 mb-6">
              {formatTime(timer)}
            </p>
            {showCopied && (
              <p className="text-sm text-green-600 font-medium mb-4">
                Copied to clipboard!
              </p>
            )}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleShare}
                className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-700"
              >
                Share your score
              </button>
              <button
                onClick={() => {
                  setShowWin(false);
                  generatePuzzle(difficulty);
                }}
                className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200"
              >
                Play again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
