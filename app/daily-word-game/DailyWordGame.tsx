"use client";

import { useEffect, useMemo, useState } from "react";
import { Sound } from "@/lib/sound";

const WORDS = [
  "adobe", "adult", "agent", "angle", "apple", "award", "basic", "beach",
  "begin", "black", "block", "board", "brain", "bread", "break", "brick",
  "bring", "broad", "brush", "build", "cabin", "cable", "chain", "chair",
  "chalk", "champ", "charm", "chart", "check", "chest", "chief", "child",
  "chill", "chord", "civic", "claim", "class", "clean", "clear", "click",
  "climb", "clock", "close", "cloth", "cloud", "coach", "coast", "color",
  "count", "court", "cover", "craft", "cream", "crime", "cross", "crowd",
  "crown", "crush", "curve", "cycle", "daily", "dance", "dandy", "debut",
  "delay", "delta", "dense", "depth", "derive", "diary", "dirty", "dodge",
  "donor", "doubt", "draft", "drain", "drama", "drawn", "dream", "dress",
  "drift", "drill", "drink", "drive", "drove", "drown", "eager", "early",
  "earth", "eight", "elbow", "elder", "elect", "elegy", "elite", "empty",
  "enemy", "enjoy", "enter", "entry", "equal", "error", "event", "every",
  "exact", "excel", "exist", "extra", "fable", "facet", "faint", "faith",
  "false", "fancy", "fatal", "fault", "favor", "field", "fiery", "final",
  "first", "flame", "flash", "fleet", "flesh", "float", "flood", "floor",
  "flour", "fluid", "flush", "focus", "force", "forge", "forth", "forty",
  "found", "frame", "fresh", "front", "frost", "fruit", "fully", "funny",
  "gauge", "genre", "ghost", "giant", "given", "gladly", "glass", "globe",
  "glory", "gloss", "glove", "grand", "grant", "grape", "graph", "grasp",
  "grass", "grave", "great", "greed", "green", "grill", "grind", "group",
  "grown", "guard", "guess", "guide", "guilt", "habit", "happy", "harry",
  "haste", "health", "heart", "heavy", "hedge", "hello", "hence", "hinge",
  "hobby", "honey", "honor", "horse", "hotel", "house", "human", "humor",
  "ideal", "image", "imply", "index", "inner", "input", "irony", "issue",
  "ivory", "jelly", "jewel", "joint", "jolly", "judge", "juice", "juicy",
  "jumbo", "kayak", "kneel", "knife", "knock", "label", "labor", "latch",
  "laugh", "layer", "learn", "lease", "least", "leave", "legal", "lemon",
  "level", "lever", "light", "limit", "liver", "lobby", "local", "logic",
  "loose", "lower", "lucky", "lunar", "lunch", "lynch", "lyric", "magic",
  "major", "maker", "march", "marry", "match", "maybe", "mayor", "media",
  "mercy", "merry", "metal", "meter", "micro", "might", "minor", "minus",
  "model", "money", "month", "moral", "motor", "mount", "mouse", "mouth",
  "movie", "music", "myth", "naked", "names", "nasal", "naval", "needs",
  "nerve", "never", "newly", "night", "noise", "north", "noted", "novel",
  "nurse", "nylon", "oasis", "occur", "ocean", "offer", "often", "olive",
  "onion", "onset", "opera", "orbit", "order", "organ", "other", "outer",
  "owner", "ozone", "paint", "panel", "panic", "paper", "party", "pasta",
  "patch", "pause", "peace", "peach", "pearl", "penny", "piano", "piece",
  "pilot", "pitch", "pivot", "plane", "plant", "plate", "plaza", "point",
  "polar", "porch", "pound", "power", "press", "price", "pride", "prime",
  "print", "prior", "prize", "probe", "prone", "proof", "proud", "prove",
  "pulse", "punch", "pupil", "purse", "queen", "query", "quest", "queue",
  "quick", "quiet", "quilt", "quota", "quote", "radar", "radio", "raise",
  "rally", "ranch", "range", "rapid", "ratio", "reach", "react", "ready",
  "refer", "relax", "reply", "rhyme", "ridge", "rifle", "right", "rigid",
  "rival", "river", "roast", "robot", "rocky", "romance", "roof", "room",
  "rough", "round", "route", "royal", "rural", "rugby", "ruins", "ruler",
  "sales", "sauce", "scale", "scarf", "scene", "scope", "score", "scream",
  "screw", "scrub", "seeds", "sense", "seoul", "serve", "setup", "severe",
  "shade", "shake", "shall", "shape", "share", "shark", "sharp", "sheep",
  "sheet", "shelf", "shell", "shift", "shirt", "shock", "shoot", "shore",
  "short", "shout", "shove", "shown", "sight", "silly", "since", "sixth",
  "sixty", "skill", "skirt", "skull", "slate", "slave", "sleep", "slice",
  "slide", "slope", "small", "smart", "smell", "smile", "smoke", "snack",
  "snake", "snap", "sneak", "solar", "solid", "solve", "sorry", "sound",
  "south", "space", "spare", "spark", "speak", "speed", "spell", "spend",
  "spicy", "spike", "spine", "spirit", "split", "sport", "spray", "squad",
  "stack", "staff", "stage", "stain", "stake", "stamp", "stand", "stare",
  "start", "state", "stays", "steal", "steam", "steel", "steep", "steer",
  "stems", "steps", "stick", "still", "stock", "stoke", "stole", "stone",
  "stood", "stoop", "store", "storm", "story", "stove", "strap", "straw",
  "strip", "stuck", "study", "stuff", "style", "sugar", "suit", "summer",
  "sunny", "super", "sure", "surge", "sweet", "swift", "swing", "sword",
  "table", "taste", "teach", "tears", "tenth", "thank", "theft", "their",
  "theme", "there", "these", "thick", "thief", "thing", "think", "third",
  "thorn", "those", "three", "throw", "thumb", "tiger", "tight", "timer",
  "times", "tired", "title", "today", "token", "total", "touch", "tough",
  "towel", "tower", "toxic", "trace", "track", "trade", "trail", "train",
  "trait", "trash", "treat", "trend", "trial", "tribe", "trick", "tried",
  "tries", "truck", "truly", "trump", "trunk", "trust", "truth", "twice",
  "twin", "twist", "ultra", "under", "unify", "union", "unite", "unity",
  "until", "upper", "upset", "urban", "usage", "usual", "valid", "value",
  "vapor", "vault", "vegan", "venue", "verse", "video", "vigor", "villa",
  "vinyl", "viral", "virtue", "virus", "visit", "vital", "vivid", "vocal",
  "vodka", "voice", "voter", "vault", "wagon", "waste", "watch", "water",
  "weary", "weave", "wedge", "weird", "whale", "wheat", "wheel", "where",
  "which", "while", "whisper", "white", "whole", "whose", "width", "widen",
  "winds", "wine", "wings", "wipe", "wired", "wiser", "witch", "woman",
  "world", "worry", "worse", "worst", "worth", "would", "wound", "wrist",
  "write", "wrong", "yacht", "yeast", "yield", "young", "youth", "zebra",
  "zesty", "zones",
];

function seedNumber(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getWord(): string {
  const key = dateKey(new Date());
  const rand = seedNumber(key);
  return WORDS[rand % WORDS.length];
}

function matchesKey(attempts: string[], word: string): boolean {
  return attempts.some((a) => a === word);
}

interface Stats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
  lastGameKey: string;
  wonKey: string;
}

const STORAGE_KEY = "qt-dailyword-stats";

function loadStats(): Stats {
  if (typeof window === "undefined") {
    return { played: 0, won: 0, currentStreak: 0, maxStreak: 0, lastGameKey: "", wonKey: "" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { played: 0, won: 0, currentStreak: 0, maxStreak: 0, lastGameKey: "", wonKey: "" };
}

export default function DailyWordGame() {
  const word = useMemo(() => getWord(), []);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [stats, setStats] = useState<Stats>(() => loadStats());
  const [toast, setToast] = useState("");

  const key = dateKey(new Date());
  const solved = matchesKey(attempts, word);
  const gameOver = solved || attempts.length >= 6;

  useEffect(() => {
    if (!solved && !gameOver) return;
    if (stats.lastGameKey === key) return;
    const won = solved;
    const newStats: Stats = {
      ...stats,
      played: stats.played + 1,
      won: stats.won + (won ? 1 : 0),
      currentStreak: won
        ? stats.currentStreak + 1
        : 0,
      maxStreak: max(stats.maxStreak, won ? stats.currentStreak + 1 : stats.currentStreak),
      lastGameKey: key,
      wonKey: won ? key : stats.wonKey,
    };
    setStats(newStats);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, solved]);

  function max(...vals: number[]): number {
    return Math.max(...vals);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (current.length !== 5) {
        setToast("Not enough letters");
        Sound.wrong();
        return;
      }
      setToast("");
      setAttempts((prev) => [...prev, current.toLowerCase()]);
      setCurrent("");
      if (current.toLowerCase() === word) Sound.win();
      else Sound.correct();
    } else if (e.key === "Backspace") {
      setCurrent((c) => c.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(e.key) && current.length < 5) {
      setCurrent((c) => (c + e.key).toLowerCase());
      Sound.keypress();
    }
  };

  const evaluate = (attempt: string): Array<"correct" | "present" | "absent"> => {
    const result: Array<"correct" | "present" | "absent"> = [];
    const counts: Record<string, number> = {};
    for (const ch of word) counts[ch] = (counts[ch] || 0) + 1;

    // First pass: correct
    const wordArr = word.split("");
    const attemptArr = attempt.split("");
    const marks: ("correct" | "present" | "absent" | "unset")[] = attemptArr.map(() => "unset");
    for (let i = 0; i < 5; i++) {
      if (attemptArr[i] === wordArr[i]) {
        marks[i] = "correct";
        counts[attemptArr[i]]! -= 1;
      }
    }
    for (let i = 0; i < 5; i++) {
      if (marks[i] !== "correct") {
        if (counts[attemptArr[i]]! > 0) {
          marks[i] = "present";
          counts[attemptArr[i]]! -= 1;
        } else {
          marks[i] = "absent";
        }
      }
    }
    return marks as Array<"correct" | "present" | "absent">;
  };

  const colorFor = (state: "correct" | "present" | "absent", filled: boolean) => {
    if (!filled) return "border-gray-300 bg-white text-gray-900";
    if (state === "correct") return "border-green-600 bg-green-600 text-white";
    if (state === "present") return "border-yellow-500 bg-yellow-500 text-white";
    return "border-gray-500 bg-gray-500 text-white";
  };

  const share = () => {
    const resultLines = attempts
      .slice(0, solved ? attempts.length : 6)
      .map((a) =>
        evaluate(a)
          .map((s) => (s === "correct" ? "🟩" : s === "present" ? "🟨" : "⬛"))
          .join("")
      )
      .join("\n");
    navigator.clipboard.writeText(`Daily Word Game ${key} — ${solved ? `Won in ${attempts.length}/6` : "X/6"}\n\n${resultLines}`);
    setToast("Result copied to clipboard!");
  };

  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="space-y-5">
      <div className="grid gap-2" aria-label="Word grid">
        {Array.from({ length: 6 }).map((_, ri) => {
          const attempt = attempts[ri];
          const isCurrent = ri === attempts.length;
          const display = isCurrent ? current : (attempt ?? "");
          const marks = attempt ? evaluate(attempt) : null;
          return (
            <div key={ri} className="flex justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, ci) => {
                const filled = Boolean(display[ci]);
                const state = marks?.[ci] ?? "absent";
                return (
                  <span
                    key={ci}
                    className={`flex h-12 w-12 items-center justify-center rounded border-2 text-xl font-bold uppercase ${isCurrent ? "border-gray-400 text-gray-900" : colorFor(state, filled)} ${isCurrent && !filled ? "border-gray-300 text-gray-400" : ""}`}
                  >
                    {display[ci] ?? ""}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <input
          value={current}
          onKeyDown={onKeyDown}
          onChange={(e) => setCurrent(e.target.value.toLowerCase().slice(0, 5))}
          disabled={gameOver}
          placeholder="Type a 5-letter word"
          aria-label="Guess"
          className="w-48 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm text-gray-900 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200 disabled:bg-gray-50"
        />
        <button
          type="button"
          onClick={() => {
            if (current.length === 5) {
              setAttempts((prev) => [...prev, current]);
              setCurrent("");
              if (current === word) Sound.win();
              else Sound.correct();
            } else {
              setToast("Not enough letters");
              Sound.wrong();
            }
          }}
          disabled={gameOver}
          className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:bg-gray-300"
        >
          Guess
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {letters.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => {
              if (!gameOver && current.length < 5) {
                setCurrent((c) => c + l);
                Sound.keypress();
              }
            }}
            disabled={gameOver}
            className="h-8 w-8 rounded bg-gray-100 text-xs font-bold uppercase text-gray-700 transition-colors hover:bg-accent-100"
          >
            {l}
          </button>
        ))}
      </div>

      {toast && <p className="text-center text-sm text-accent-700">{toast}</p>}

      {gameOver && (
        <div className="rounded-xl border border-accent-200 bg-accent-50 p-5 text-center">
          {solved ? (
            <>
              <p className="text-lg font-bold text-green-700">You got it in {attempts.length}/6!</p>
              <p className="mt-1 text-sm text-gray-600">The word was {word.toUpperCase()}</p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-red-600">Game over</p>
              <p className="mt-1 text-sm text-gray-600">The word was {word.toUpperCase()}</p>
            </>
          )}
          <div className="mx-auto mt-3 grid max-w-xs grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-white p-3">
              <div className="text-lg font-bold text-gray-900">{stats.won} / {stats.played}</div>
              <div className="text-xs text-gray-500">Win streak</div>
            </div>
            <div className="rounded-lg bg-white p-3">
              <div className="text-lg font-bold text-gray-900">{stats.currentStreak}</div>
              <div className="text-xs text-gray-500">Current streak</div>
            </div>
          </div>
          <button
            type="button"
            onClick={share}
            className="mt-4 rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
          >
            Share your score
          </button>
        </div>
      )}
    </div>
  );
}
