"use client";

import { useMemo, useState } from "react";
import { Sound } from "@/lib/sound";

interface Q {
  q: string;
  options: string[];
  answer: number;
}

const POOL: Q[] = [
  { q: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
  { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
  { q: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2 },
  { q: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
  { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Rembrandt"], answer: 1 },
  { q: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: 2 },
  { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: 1 },
  { q: "Which country is home to the kangaroo?", options: ["South Africa", "Australia", "New Zealand", "Brazil"], answer: 1 },
  { q: "What is the tallest mountain in the world?", options: ["K2", "Kangchenjunga", "Everest", "Makalu"], answer: 2 },
  { q: "Which instrument has 88 keys?", options: ["Guitar", "Violin", "Piano", "Flute"], answer: 2 },
  { q: "What gas do plants absorb from the air?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: 1 },
  { q: "How many bones does an adult human have?", options: ["206", "300", "150", "250"], answer: 0 },
  { q: "Which is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: 1 },
  { q: "What is the fastest land animal?", options: ["Lion", "Cheetah", "Horse", "Gazelle"], answer: 1 },
  { q: "In which year did the Titanic sink?", options: ["1905", "1912", "1920", "1898"], answer: 1 },
  { q: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Onion", "Pepper"], answer: 1 },
  { q: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Earth", "Mars"], answer: 1 },
  { q: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], answer: 2 },
  { q: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: 1 },
  { q: "What is the freezing point of water in Celsius?", options: ["0", "32", "100", "50"], answer: 0 },
  { q: "Which animal is known as the 'king of the jungle'?", options: ["Tiger", "Lion", "Elephant", "Bear"], answer: 1 },
  { q: "What is the largest organ of the human body?", options: ["Liver", "Heart", "Skin", "Brain"], answer: 2 },
  { q: "How many players are on a soccer team?", options: ["9", "10", "11", "12"], answer: 2 },
  { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2 },
  { q: "Which gas do we breathe in to live?", options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"], answer: 2 },
  { q: "What is the square root of 81?", options: ["7", "8", "9", "11"], answer: 2 },
  { q: "Which country has the largest population?", options: ["USA", "India", "China", "Indonesia"], answer: 2 },
  { q: "What is the hardest natural substance?", options: ["Iron", "Gold", "Diamond", "Quartz"], answer: 2 },
  { q: "Which sea creature has eight arms?", options: ["Shark", "Octopus", "Dolphin", "Crab"], answer: 1 },
  { q: "What color do you get by mixing red and blue?", options: ["Green", "Orange", "Purple", "Black"], answer: 2 },
  { q: "Which is the largest planet in our solar system?", options: ["Saturn", "Jupiter", "Neptune", "Uranus"], answer: 1 },
  { q: "How many strings does a standard guitar have?", options: ["4", "5", "6", "8"], answer: 2 },
  { q: "What is the capital of Italy?", options: ["Milan", "Venice", "Rome", "Naples"], answer: 2 },
  { q: "Which bird cannot fly?", options: ["Eagle", "Ostrich", "Falcon", "Sparrow"], answer: 1 },
  { q: "What is the boiling point of water in Celsius?", options: ["90", "100", "110", "120"], answer: 1 },
  { q: "How many minutes are in an hour?", options: ["50", "60", "90", "100"], answer: 1 },
  { q: "Which continent is the Sahara Desert in?", options: ["Asia", "Africa", "Australia", "South America"], answer: 1 },
  { q: "What do bees produce?", options: ["Milk", "Honey", "Silk", "Wax only"], answer: 1 },
  { q: "Which is the tallest animal?", options: ["Elephant", "Giraffe", "Ostrich", "Camel"], answer: 1 },
  { q: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: 2 },
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

function pickDaily(seed: string, count: number): Q[] {
  const shuffled = [...POOL];
  let rand = seedNumber(seed);
  // Fisher-Yates with seeded rand
  for (let i = shuffled.length - 1; i > 0; i--) {
    rand = Math.imul(rand, 1664525) + 1013904223;
    rand = rand >>> 0;
    const j = rand % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

const STREAK_KEY = "qt-trivia-streak";
const LAST_KEY = "qt-trivia-last";

export default function DailyTrivia() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [wholeStreak, setWholeStreak] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [started, setStarted] = useState(false);

  const key = dateKey(new Date());
  const questions = useMemo(() => pickDaily(key, 10), [key]);

  const start = () => {
    setStarted(true);
    setAnswers([]);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    Sound.click();
  };

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === questions[current].answer;
    if (correct) Sound.correct();
    else Sound.wrong();
    const newScore = score + (correct ? 1 : 0);
    setScore(newScore);
    const newAnswers = [...answers.slice(0, current + 1)];
    newAnswers[current] = i;
    setAnswers(newAnswers);
    if (correct) setStreak((s) => s + 1);

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
        // update persistent streak
        const today = localStorage.getItem(LAST_KEY) === key;
        const prev = Number(localStorage.getItem(STREAK_KEY) || "0");
        let nextStreak;
        if (today) {
          nextStreak = prev;
        } else if (newScore >= 7) {
          nextStreak = prev + 1;
        } else {
          nextStreak = prev;
        }
        setWholeStreak(nextStreak);
        localStorage.setItem(STREAK_KEY, String(nextStreak));
        localStorage.setItem(LAST_KEY, key);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 900);
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-gray-600">
          10 general-knowledge questions. Answer them all to see your score and
          keep your daily streak alive.
        </p>
        <button
          type="button"
          onClick={start}
          className="rounded-lg bg-accent-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
        >
          Start today&apos;s quiz
        </button>
      </div>
    );
  }

  if (finished) {
    const passed = score >= 7;
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-3xl font-bold text-gray-900">
          {score} / {questions.length}
        </p>
        <p className="text-gray-600">
          {passed ? "Great job! Quiz passed." : "Keep practicing — try again tomorrow!"}
        </p>
        <div className="rounded-xl border border-accent-200 bg-accent-50 px-6 py-3">
          <p className="text-sm text-gray-600">Daily streak</p>
          <p className="text-2xl font-bold text-accent-700">{wholeStreak}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText(`Daily Trivia ${key}: I scored ${score}/10 🎯`)
            }
            className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
          >
            Share your score
          </button>
          <button
            type="button"
            onClick={start}
            className="rounded-lg border border-accent-200 px-5 py-2.5 text-sm font-semibold text-accent-700 transition-colors hover:bg-accent-50"
          >
            Review answers
          </button>
        </div>
        {answers.length > 0 && (
          <div className="mt-2 w-full space-y-2 text-left">
            {questions.map((q, i) => {
              const chosen = answers[i];
              const correct = q.answer;
              return (
                <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">
                  <p className="font-medium text-gray-800">{q.q}</p>
                  <p className={chosen === correct ? "mt-1 text-green-600" : "mt-1 text-red-600"}>
                    Your answer: {q.options[chosen] ?? "—"} · Correct: {q.options[correct]}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full items-center justify-between text-sm text-gray-500">
        <span>
          Question {current + 1} of {questions.length}
        </span>
        <span>Score: {score}</span>
      </div>
      <div className="flex gap-1">
        {questions.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-6 rounded-full ${
              i === current ? "bg-accent-600" : answers[i] !== undefined ? "bg-gray-400" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="w-full rounded-xl border border-gray-200 bg-gray-50 p-5 text-center">
        <p className="text-lg font-semibold text-gray-900">{q.q}</p>
      </div>
      <div className="grid w-full gap-2 sm:grid-cols-2">
        {q.options.map((opt, i) => {
          let cls =
            "rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-800 transition-colors hover:border-accent-300 hover:bg-accent-50";
          if (selected !== null) {
            if (i === q.answer) cls += " border-green-500 bg-green-50";
            else if (i === selected) cls += " border-red-500 bg-red-50";
            else cls += " opacity-50";
          }
          return (
            <button key={i} type="button" onClick={() => choose(i)} disabled={selected !== null} className={cls}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
