"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAMES: Record<string, string> = {
  "/daily-word-game": "Daily Word Game",
  "/daily-sudoku": "Daily Sudoku",
  "/2048": "2048",
  "/snake": "Snake",
  "/minesweeper": "Minesweeper",
  "/memory-match": "Memory Match",
  "/tetris": "Tetris",
  "/tic-tac-toe": "Tic Tac Toe",
  "/connect-four": "Connect Four",
  "/reaction-time-test": "Reaction Time Test",
  "/typing-speed-test": "Typing Speed Test",
  "/daily-trivia": "Daily Trivia",
};

const RELATED: Record<string, string[]> = {
  "/daily-word-game": ["/daily-trivia", "/daily-sudoku", "/typing-speed-test"],
  "/daily-sudoku": ["/daily-word-game", "/daily-trivia", "/minesweeper"],
  "/2048": ["/snake", "/tetris", "/minesweeper"],
  "/snake": ["/2048", "/tetris", "/connect-four"],
  "/minesweeper": ["/2048", "/memory-match", "/daily-sudoku"],
  "/memory-match": ["/minesweeper", "/tic-tac-toe", "/connect-four"],
  "/tetris": ["/2048", "/snake", "/connect-four"],
  "/tic-tac-toe": ["/connect-four", "/memory-match", "/minesweeper"],
  "/connect-four": ["/tic-tac-toe", "/tetris", "/snake"],
  "/reaction-time-test": ["/typing-speed-test", "/daily-word-game", "/2048"],
  "/typing-speed-test": ["/reaction-time-test", "/daily-word-game", "/daily-trivia"],
  "/daily-trivia": ["/daily-word-game", "/daily-sudoku", "/typing-speed-test"],
};

export default function GamesRelated() {
  const pathname = usePathname();
  const related = RELATED[pathname] ?? [];
  if (!related.length) return null;

  return (
    <section
      aria-labelledby="related-games-heading"
      className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6"
    >
      <h2
        id="related-games-heading"
        className="mb-3 text-xl font-bold tracking-tight text-gray-900"
      >
        More games you might enjoy…
      </h2>
      <ul className="grid gap-2 sm:grid-cols-3">
        {related.map((path) => (
          <li key={path}>
            <Link
              href={path}
              className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-accent-600 transition-colors hover:border-accent-300 hover:bg-accent-50"
            >
              {NAMES[path]}
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
