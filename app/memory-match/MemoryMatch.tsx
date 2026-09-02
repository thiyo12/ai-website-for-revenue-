"use client";

import { useEffect, useRef, useState } from "react";
import { Sound } from "@/lib/sound";

const SYMBOLS = ["🍎", "🍌", "🍇", "🍓", "🥝", "🍒", "🥥", "🍑"];

type Card = {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
};

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildDeck(): Card[] {
  const pairs = SYMBOLS.flatMap((symbol, index) => [
    { symbol, sort: index },
    { symbol, sort: index },
  ]);
  return shuffle(pairs).map((p, index) => ({
    id: index,
    symbol: p.symbol,
    flipped: false,
    matched: false,
  }));
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>(buildDeck);
  const [moves, setMoves] = useState(0);
  const [pairsMatched, setPairsMatched] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const [won, setWon] = useState(false);
  const flipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstIndex = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("qt-memory-best");
      if (stored) setBest(Number(stored));
    }
    return () => {
      if (flipTimer.current) clearTimeout(flipTimer.current);
    };
  }, []);

  useEffect(() => {
    if (pairsMatched === SYMBOLS.length) {
      Sound.win();
      setWon(true);
      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("qt-memory-best");
        if (stored === null || moves < Number(stored)) {
          window.localStorage.setItem("qt-memory-best", String(moves));
          setBest(moves);
        }
      }
    }
  }, [pairsMatched, moves]);

  function handleFlip(index: number) {
    const card = cards[index];
    if (card.flipped || card.matched || won) return;
    if (firstIndex.current !== null && flipTimer.current) return;

    if (firstIndex.current === null) {
      setCards((prev) =>
        prev.map((c, i) => (i === index ? { ...c, flipped: true } : c))
      );
      Sound.flip();
      firstIndex.current = index;
      return;
    }

    const first = firstIndex.current;
    setMoves((m) => m + 1);
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, flipped: true } : c))
    );
    Sound.flip();

    const firstCard = cards[first];
    const secondCard = cards[index];
    const isMatch = firstCard.symbol === secondCard.symbol;

    if (isMatch) {
      Sound.match();
      setCards((prev) =>
        prev.map((c, i) =>
          i === first || i === index ? { ...c, matched: true } : c
        )
      );
      setPairsMatched((p) => p + 1);
      firstIndex.current = null;
      flipTimer.current = null;
    } else {
      Sound.wrong();
      flipTimer.current = setTimeout(() => {
        setCards((prev) =>
          prev.map((c, i) =>
            i === first || i === index ? { ...c, flipped: false } : c
          )
        );
        firstIndex.current = null;
        flipTimer.current = null;
      }, 800);
    }
  }

  function resetGame() {
    if (flipTimer.current) clearTimeout(flipTimer.current);
    flipTimer.current = null;
    firstIndex.current = null;
    setCards(buildDeck());
    setMoves(0);
    setPairsMatched(0);
    setWon(false);
  }

  async function shareScore() {
    const text = `🧠 Memory Match: ${pairsMatched} pairs in ${moves} moves!`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-6 text-sm sm:text-base">
        <div className="rounded-xl bg-accent-600 px-4 py-2 text-white">
          Pairs: {pairsMatched} / {SYMBOLS.length}
        </div>
        <div className="rounded-xl bg-accent-600 px-4 py-2 text-white">
          Moves: {moves}
        </div>
        {best !== null && (
          <div className="rounded-xl bg-gray-800 px-4 py-2 font-semibold text-white">
            Best: {best}
          </div>
        )}
      </div>

      <div className="grid w-full max-w-xl grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => handleFlip(index)}
            className="flex aspect-square items-center justify-center rounded-2xl text-3xl sm:text-4xl transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent-600"
            style={{
              backgroundColor: card.flipped || card.matched ? "#ffffff" : "#4f46e5",
              boxShadow:
                card.flipped || card.matched
                  ? "0 2px 8px rgba(0,0,0,0.1)"
                  : "0 4px 12px rgba(79,70,229,0.35)",
              transform: card.flipped || card.matched ? "scale(1)" : "scale(1)",
            }}
          >
            {card.flipped || card.matched ? (
              card.symbol
            ) : (
              <span className="size-6 rounded-full bg-white/20" />
            )}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={resetGame}
        className="rounded-xl bg-accent-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-accent-700"
      >
        New Game
      </button>

      {won && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mb-3 text-5xl">🎉</div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              You Win!
            </h2>
            <p className="mb-6 text-gray-600">
              {pairsMatched} pairs in {moves} moves
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={resetGame}
                className="rounded-xl bg-accent-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-700"
              >
                Play again
              </button>
              <button
                type="button"
                onClick={shareScore}
                className="rounded-xl border-2 border-accent-600 px-6 py-3 font-semibold text-accent-600 transition-colors hover:bg-accent-50"
              >
                Share your score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
