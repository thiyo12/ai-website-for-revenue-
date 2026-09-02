"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Sound } from "@/lib/sound";

const COLS = 20;
const ROWS = 20;

type Difficulty = "normal" | "hard";
const SPEED_CONFIG: Record<Difficulty, { start: number; perScore: number; min: number }> = {
  normal: { start: 150, perScore: 2, min: 60 },
  hard: { start: 110, perScore: 3, min: 40 },
};

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const OPPOSITE: Record<Direction, Direction> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

function randomFood(snake: Point[]): Point {
  let p: Point;
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

export default function Snake() {
  const initialSnake: Point[] = [
    { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) },
  ];

  const [snake, setSnake] = useState<Point[]>(initialSnake);
  const [food, setFood] = useState<Point>(() => randomFood(initialSnake));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");

  const dirRef = useRef<Direction>("RIGHT");
  const snakeRef = useRef<Point[]>(snake);
  const foodRef = useRef<Point>(food);
  const scoreRef = useRef(score);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const difficultyRef = useRef<Difficulty>(difficulty);

  snakeRef.current = snake;
  foodRef.current = food;
  scoreRef.current = score;
  difficultyRef.current = difficulty;

  useEffect(() => {
    try {
      const stored = localStorage.getItem("qt-snake-best");
      if (stored) setBestScore(Number(stored));
    } catch {}
  }, []);

  useEffect(() => {
    if (bestScore > 0) {
      try {
        localStorage.setItem("qt-snake-best", String(bestScore));
      } catch {}
    }
  }, [bestScore]);

  const stopTick = useCallback(() => {
    if (tickRef.current !== null) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  const handleStart = useCallback(() => {
    stopTick();
    const fresh: Point[] = [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }];
    dirRef.current = "RIGHT";
    snakeRef.current = fresh;
    setSnake(fresh);
    const f = randomFood(fresh);
    foodRef.current = f;
    setFood(f);
    scoreRef.current = 0;
    setScore(0);
    setGameState("playing");
  }, [stopTick]);

  useEffect(() => {
    if (gameState !== "playing") {
      stopTick();
      return;
    }

    const tick = () => {
      const currentSnake = snakeRef.current;
      const currentFood = foodRef.current;
      const dir = dirRef.current;

      const head = currentSnake[0];
      let next: Point;
      if (dir === "UP") next = { x: head.x, y: head.y - 1 };
      else if (dir === "DOWN") next = { x: head.x, y: head.y + 1 };
      else if (dir === "LEFT") next = { x: head.x - 1, y: head.y };
      else next = { x: head.x + 1, y: head.y };

      if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
        stopTick();
        setGameState("over");
        Sound.lose();
        return;
      }

      if (currentSnake.some((s) => s.x === next.x && s.y === next.y)) {
        stopTick();
        setGameState("over");
        Sound.lose();
        return;
      }

      const ate = next.x === currentFood.x && next.y === currentFood.y;
      const newSnake = [next, ...currentSnake];
      if (!ate) newSnake.pop();

      snakeRef.current = newSnake;
      setSnake(newSnake);

      if (ate) {
        const newScore = scoreRef.current + 1;
        scoreRef.current = newScore;
        setScore(newScore);
        Sound.eat();
        setBestScore((prev) => {
          const nb = Math.max(prev, newScore);
          try { localStorage.setItem("qt-snake-best", String(nb)); } catch {}
          return nb;
        });
        const newFood = randomFood(newSnake);
        foodRef.current = newFood;
        setFood(newFood);

        stopTick();
        const cfg = SPEED_CONFIG[difficultyRef.current];
        const newSpeed = Math.max(cfg.min, cfg.start - newScore * cfg.perScore);
        tickRef.current = setInterval(tick, newSpeed);
      }
    };

    const cfg = SPEED_CONFIG[difficultyRef.current];
    const spd = Math.max(cfg.min, cfg.start - scoreRef.current * cfg.perScore);
    stopTick();
    tickRef.current = setInterval(tick, spd);

    return () => stopTick();
  }, [gameState, stopTick]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKey = (e: KeyboardEvent) => {
      const dir = dirRef.current;
      if (e.key === "ArrowUp" && dir !== "DOWN") dirRef.current = "UP";
      else if (e.key === "ArrowDown" && dir !== "UP") dirRef.current = "DOWN";
      else if (e.key === "ArrowLeft" && dir !== "RIGHT") dirRef.current = "LEFT";
      else if (e.key === "ArrowRight" && dir !== "LEFT") dirRef.current = "RIGHT";
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState]);

  const setDir = (d: Direction) => {
    if (dirRef.current !== OPPOSITE[d]) dirRef.current = d;
  };

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    const threshold = 24;
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;
    if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? "RIGHT" : "LEFT");
    else setDir(dy > 0 ? "DOWN" : "UP");
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(`🐍 I scored ${score} in Snake!`);
    } catch {}
  };

  const cellSet = new Set(snake.map((p) => `${p.x},${p.y}`));
  const foodKey = `${food.x},${food.y}`;

  return (
    <div className="game-bg-animated flex flex-col items-center gap-6 py-10 rounded-xl">
      <h1 className="text-3xl font-bold text-slate-800">Snake</h1>

      <div className="flex gap-8 text-lg font-semibold">
        <span className="text-slate-600">Score: <span className="text-slate-900">{score}</span></span>
        <span className="text-slate-600">Best: <span className="text-slate-900">{bestScore}</span></span>
      </div>

      <div
        className="grid border-2 border-slate-300 rounded-lg overflow-hidden touch-none select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
          width: "min(90vw, 480px)",
          aspectRatio: "1",
        }}
      >
        {Array.from({ length: ROWS }).map((_, y) =>
          Array.from({ length: COLS }).map((_, x) => {
            const key = `${x},${y}`;
            let bg = "bg-slate-100";
            if (cellSet.has(key)) bg = "bg-accent-600";
            else if (key === foodKey) bg = "bg-red-500";
            return <div key={key} className={`${bg} rounded-sm`} />;
          })
        )}
      </div>

      <div className="grid grid-cols-3 gap-1 w-36">
        <div />
        <button onClick={() => setDir("UP")} className="bg-slate-200 hover:bg-slate-300 rounded-lg p-3 text-lg font-bold">▲</button>
        <div />
        <button onClick={() => setDir("LEFT")} className="bg-slate-200 hover:bg-slate-300 rounded-lg p-3 text-lg font-bold">◀</button>
        <div className="bg-slate-100 rounded-lg" />
        <button onClick={() => setDir("RIGHT")} className="bg-slate-200 hover:bg-slate-300 rounded-lg p-3 text-lg font-bold">▶</button>
        <div />
        <button onClick={() => setDir("DOWN")} className="bg-slate-200 hover:bg-slate-300 rounded-lg p-3 text-lg font-bold">▼</button>
        <div />
      </div>

      {gameState === "idle" && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Difficulty:</span>
            <button
              type="button"
              onClick={() => setDifficulty("normal")}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
                difficulty === "normal"
                  ? "bg-accent-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => setDifficulty("hard")}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
                difficulty === "hard"
                  ? "bg-accent-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              Hard
            </button>
          </div>
          <button onClick={handleStart} className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-700">
            Start Game
          </button>
        </div>
      )}

      {gameState === "over" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-800">Game Over</h2>
            <p className="text-lg text-slate-600">Score: <span className="font-bold text-slate-900">{score}</span></p>
            <p className="text-lg text-slate-600">Best: <span className="font-bold text-slate-900">{bestScore}</span></p>
            <button onClick={handleStart} className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-700">
              Play Again
            </button>
            <button onClick={share} className="rounded-lg bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-300">
              Share your score
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
