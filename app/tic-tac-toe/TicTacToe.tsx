"use client";

import { useState, useCallback, useEffect } from "react";
import { Sound } from "@/lib/sound";

type Player = "X" | "O";
type Cell = Player | null;
type Board = Cell[];
type Mode = "computer" | "2player";

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(board: Board): Player | null {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

function minimax(board: Board, isMaximizing: boolean): number {
  const winner = checkWinner(board);
  if (winner === "O") return 1;
  if (winner === "X") return -1;
  if (isDraw(board)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        best = Math.max(best, minimax(board, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        best = Math.min(best, minimax(board, true));
        board[i] = null;
      }
    }
    return best;
  }
}

function getComputerMove(board: Board): number {
  let bestScore = -Infinity;
  let bestMove = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O";
      const score = minimax(board, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function getShareMessage(winner: Player, mode: Mode): string {
  if (mode === "computer") {
    if (winner === "X") return "⭕ X won Tic Tac Toe! Can you beat me?";
    return "❌ O won Tic Tac Toe! Can you beat me?";
  }
  return `${winner === "X" ? "❌" : "⭕"} ${winner} won Tic Tac Toe! Can you beat me?`;
}

const MESSAGES = {
  win: ["Unstoppable!", "GG!", "Brilliant move!", "Well played!"],
  lose: ["Computer wins!", "Almost had it!", "Nice try!"],
  draw: ["It's a tie!", "So close!", "No winner this time!"],
};

function randomMessage(type: keyof typeof MESSAGES): string {
  const arr = MESSAGES[type];
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function TicTacToe() {
  const [mode, setMode] = useState<Mode>("computer");
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDrawState, setIsDrawState] = useState(false);
  const [scores, setScores] = useState<{ X: number; O: number; draw: number }>({
    X: 0,
    O: 0,
    draw: 0,
  });
  const [computerThinking, setComputerThinking] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const gameOver = winner !== null || isDrawState;

  useEffect(() => {
    if (mode === "computer" && currentPlayer === "O" && !gameOver) {
      setComputerThinking(true);
      const timer = setTimeout(() => {
        const boardCopy = [...board];
        const move = getComputerMove(boardCopy);
        if (move !== -1) {
          const newBoard = [...boardCopy];
          newBoard[move] = "O";
          setBoard(newBoard);
          const w = checkWinner(newBoard);
          if (w) {
            setWinner(w);
            setScores((s) => ({ ...s, [w]: s[w] + 1 }));
            Sound.lose();
            setOverlayMessage(randomMessage("lose"));
            setShowOverlay(true);
          } else if (isDraw(newBoard)) {
            setIsDrawState(true);
            setScores((s) => ({ ...s, draw: s.draw + 1 }));
            Sound.wrong();
            setOverlayMessage(randomMessage("draw"));
            setShowOverlay(true);
          } else {
            setCurrentPlayer("X");
          }
        }
        setComputerThinking(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, board, mode, gameOver]);

  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] !== null || gameOver || computerThinking) return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      Sound.place();

      const w = checkWinner(newBoard);
      if (w) {
        setWinner(w);
        setScores((s) => ({ ...s, [w]: s[w] + 1 }));
        if (w === "X") {
          Sound.win();
          setOverlayMessage(mode === "computer" ? randomMessage("win") : randomMessage("win"));
        } else {
          Sound.lose();
          setOverlayMessage(randomMessage("lose"));
        }
        setShowOverlay(true);
      } else if (isDraw(newBoard)) {
        setIsDrawState(true);
        setScores((s) => ({ ...s, draw: s.draw + 1 }));
        Sound.wrong();
        setOverlayMessage(randomMessage("draw"));
        setShowOverlay(true);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    },
    [board, currentPlayer, gameOver, computerThinking, mode]
  );

  const resetRound = () => {
    Sound.click();
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDrawState(false);
    setShowOverlay(false);
    setOverlayMessage("");
    setComputerThinking(false);
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    resetRound();
    setScores({ X: 0, O: 0, draw: 0 });
  };

  const handleShare = async () => {
    if (!winner) return;
    const msg = getShareMessage(winner, mode);
    try {
      await navigator.clipboard.writeText(msg);
    } catch {
      // Fallback: do nothing silently
    }
  };

  const cellColor = (cell: Cell) => {
    if (cell === "X") return "text-[#4f46e5] font-bold text-4xl";
    if (cell === "O") return "text-rose-500 font-bold text-4xl";
    return "text-transparent";
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <button
          onClick={() => switchMode("computer")}
          className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
            mode === "computer"
              ? "bg-[#4f46e5] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          vs Computer
        </button>
        <button
          onClick={() => switchMode("2player")}
          className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
            mode === "2player"
              ? "bg-[#4f46e5] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          2 Player
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleCellClick(i)}
            disabled={cell !== null || gameOver || computerThinking}
            className={`aspect-square rounded-xl text-4xl font-bold transition-all duration-150 flex items-center justify-center
              ${
                cell === null && !gameOver
                  ? "bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  : "bg-gray-100 cursor-default"
              }
            `}
          >
            <span className={cellColor(cell)}>
              {cell ?? ""}
            </span>
          </button>
        ))}
      </div>

      <div className="text-center h-10">
        {!gameOver && (
          <p className="text-gray-600 text-sm font-medium">
            {computerThinking
              ? "Computer is thinking..."
              : mode === "computer"
              ? currentPlayer === "X"
                ? "Your turn (X)"
                : "Computer's turn (O)"
              : `Player ${currentPlayer}'s turn`}
          </p>
        )}
        {gameOver && !showOverlay && (
          <p className="text-gray-700 font-semibold">
            {winner ? `${winner} wins!` : "It's a draw!"}
          </p>
        )}
      </div>

      <div className="flex gap-6 text-sm text-gray-600">
        <span>
          X: <strong>{scores.X}</strong>
        </span>
        <span>
          O: <strong>{scores.O}</strong>
        </span>
        <span>
          Draws: <strong>{scores.draw}</strong>
        </span>
      </div>

      {showOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center gap-4">
            <p className="text-2xl font-bold text-gray-800">
              {overlayMessage}
            </p>
            <p className="text-lg text-gray-600">
              {winner ? `${winner} wins the round!` : "No winner this time!"}
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleShare}
                className="rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Share
              </button>
              <button
                onClick={resetRound}
                className="rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4338ca] transition-colors"
              >
                New round
              </button>
            </div>
          </div>
        </div>
      )}

      {gameOver && !showOverlay && (
        <button
          onClick={resetRound}
          className="rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4338ca] transition-colors"
        >
          New round
        </button>
      )}
    </div>
  );
}
