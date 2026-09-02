import GameCard from "@/components/GameCard";
import AdSlot from "@/components/AdSlot";

const games = [
  {
    href: "/daily-word-game",
    name: "Daily Word Game",
    description:
      "Guess a new 5-letter word every day. A brand-new puzzle worldwide, reset each day.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    href: "/daily-sudoku",
    name: "Daily Sudoku",
    description:
      "A fresh Sudoku puzzle every day with difficulty levels and a stopwatch timer.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm6 0v14m8-7h-8m0-7v14" />
      </svg>
    ),
  },
  {
    href: "/2048",
    name: "2048",
    description:
      "Slide numbered tiles and combine them to reach 2048. Addictive and simple.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    href: "/snake",
    name: "Snake",
    description:
      "Grow your snake by eating food without hitting the walls or yourself.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    href: "/minesweeper",
    name: "Minesweeper",
    description:
      "Clear the minefield without detonating any mines. Easy, medium, or hard.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1m0-12.8l-2.1 2.1M5.6 18.4l2.1-2.1" />
      </svg>
    ),
  },
  {
    href: "/memory-match",
    name: "Memory Match",
    description:
      "Flip cards to find matching pairs before your moves run out.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
      </svg>
    ),
  },
  {
    href: "/tetris",
    name: "Tetris",
    description:
      "Stack falling blocks and clear lines in this classic arcade puzzle.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zM13 13h7v7h-7v-7z" />
      </svg>
    ),
  },
  {
    href: "/tic-tac-toe",
    name: "Tic Tac Toe",
    description:
      "Play the classic 3-in-a-row game against the computer or a friend.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
      </svg>
    ),
  },
  {
    href: "/connect-four",
    name: "Connect Four",
    description:
      "Drop discs and line up four in a row against a challenging AI or a friend.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm3 6h8m-4 4h4m-6 0h1" />
      </svg>
    ),
  },
  {
    href: "/reaction-time-test",
    name: "Reaction Time Test",
    description:
      "Test your reflexes — click the moment the color changes. Share your score.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    href: "/typing-speed-test",
    name: "Typing Speed Test",
    description:
      "Measure your words per minute and accuracy on a timed typing challenge.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M3 15h18M6 12h.01M12 12h.01M18 12h.01M6 18h.01M12 18h.01M18 18h.01" />
      </svg>
    ),
  },
  {
    href: "/daily-trivia",
    name: "Daily Trivia",
    description:
      "Answer 10 general-knowledge questions in a rotating daily quiz. Build a streak.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export const metadata = {
  title:
    "Free Browser Games - Play Online for Fun - QuicTools",
  description:
    "Play free browser games online - Daily Word Game, Sudoku, 2048, Snake, Minesweeper, Tetris, Tic Tac Toe, Connect Four, Reaction Time, Typing Speed and Trivia. No downloads, no sign-up.",
  alternates: { canonical: "/games" },
  openGraph: {
    title: "Free Browser Games - QuicTools",
    description:
      "Play free browser games online - Daily Word Game, Sudoku, 2048, Snake, Minesweeper, Tetris and more.",
  },
};

export default function GamesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Free Browser <span className="text-accent-600">Games</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Take a break with our collection of classic arcade, puzzle, and
          brain games. Every game runs entirely in your browser — no downloads,
          no sign-up, and new daily puzzles every single day.
        </p>
      </section>

      <AdSlot label="top" className="mb-8" />

      <section
        aria-labelledby="games-heading"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <h2 id="games-heading" className="sr-only">
          All games
        </h2>
        {games.map((game) => (
          <GameCard key={game.href} {...game} />
        ))}

        <AdSlot label="inline" className="col-span-full mt-2" />
      </section>

      <AdSlot label="bottom" className="mt-10" />
      <AdSlot label="footer" className="mt-5" />
    </div>
  );
}
