"use client";

import { useState, useCallback, useRef } from "react";
import { Sound } from "@/lib/sound";

type Cell = 0 | 1 | 2;
type Board = Cell[][];
type WinCells = [number, number][];

const ROWS = 6;
const COLS = 7;

const createBoard = (): Board =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0) as Cell[]);

const checkWin = (board: Board, r: number, c: number): WinCells | null => {
  const player = board[r][c];
  if (player === 0) return null;
  const dirs: [number, number][] = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (const [dr, dc] of dirs) {
    const cells: [number, number][] = [[r, c]];
    for (let d of [1, -1]) {
      let nr = r + dr * d;
      let nc = c + dc * d;
      while (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === player) {
        cells.push([nr, nc]);
        nr += dr * d;
        nc += dc * d;
      }
    }
    if (cells.length >= 4) return cells;
  }
  return null;
};

const isDraw = (board: Board): boolean => board[0].every((c) => c !== 0);

const heuristicScore = (board: Board, player: 1 | 2): number => {
  const opponent = player === 1 ? 2 : 1;
  let score = 0;
  const centerCol = Math.floor(COLS / 2);
  let centerCount = 0;
  for (let r = 0; r < ROWS; r++) if (board[r][centerCol] === player) centerCount++;
  score += centerCount * 3;

  const allWindows: Cell[][] = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c <= COLS - 4; c++)
      allWindows.push([board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]]);
  for (let c = 0; c < COLS; c++)
    for (let r = 0; r <= ROWS - 4; r++)
      allWindows.push([board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]]);
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 0; c <= COLS - 4; c++)
      allWindows.push([board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3]]);
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 3; c < COLS; c++)
      allWindows.push([board[r][c], board[r + 1][c - 1], board[r + 2][c - 2], board[r + 3][c - 3]]);

  for (const w of allWindows) {
    const pCount = w.filter((c) => c === player).length;
    const oCount = w.filter((c) => c === opponent).length;
    const empty = w.filter((c) => c === 0).length;
    if (pCount === 4) score += 100;
    else if (pCount === 3 && empty === 1) score += 5;
    else if (pCount === 2 && empty === 2) score += 2;
    if (oCount === 3 && empty === 1) score -= 4;
  }
  return score;
};

const minimax = (
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
  aiPlayer: 1 | 2,
  maxDepth: number
): number => {
  const human = aiPlayer === 1 ? 2 : 1;
  const winner = findWinner(board);
  if (winner === aiPlayer) return 10000;
  if (winner === human) return -10000;
  if (isDraw(board) || depth >= maxDepth) return heuristicScore(board, aiPlayer);

  const cols = [...Array(COLS).keys()].sort((a, b) => {
    const ca = Math.abs(a - Math.floor(COLS / 2));
    const cb = Math.abs(b - Math.floor(COLS / 2));
    return ca - cb;
  });

  if (maximizing) {
    let value = -Infinity;
    for (const c of cols) {
      const r = getLowestRow(board, c);
      if (r === -1) continue;
      board[r][c] = aiPlayer;
      value = Math.max(value, minimax(board, depth + 1, alpha, beta, false, aiPlayer, maxDepth));
      board[r][c] = 0;
      alpha = Math.max(alpha, value);
      if (alpha >= beta) break;
    }
    return value;
  } else {
    let value = Infinity;
    for (const c of cols) {
      const r = getLowestRow(board, c);
      if (r === -1) continue;
      board[r][c] = human;
      value = Math.min(value, minimax(board, depth + 1, alpha, beta, true, aiPlayer, maxDepth));
      board[r][c] = 0;
      beta = Math.min(beta, value);
      if (alpha >= beta) break;
    }
    return value;
  }
};

const getLowestRow = (board: Board, col: number): number => {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === 0) return r;
  }
  return -1;
};

const findWinner = (board: Board): 1 | 2 | null => {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = board[r][c];
      if (cell !== 0 && checkWin(board, r, c)) return cell as 1 | 2;
    }
  }
  return null;
};

const getAIMove = (board: Board, aiPlayer: 1 | 2): number => {
  const cols = [...Array(COLS).keys()].sort((a, b) => {
    const ca = Math.abs(a - Math.floor(COLS / 2));
    const cb = Math.abs(b - Math.floor(COLS / 2));
    return ca - cb;
  });
  let bestScore = -Infinity;
  let bestCol = 3;
  const maxDepth = 5;
  const opponent = aiPlayer === 1 ? 2 : 1;

  for (const c of cols) {
    const r = getLowestRow(board, c);
    if (r === -1) continue;
    board[r][c] = aiPlayer;
    if (checkWin(board, r, c)) {
      board[r][c] = 0;
      return c;
    }
    board[r][c] = 0;
  }

  for (const c of cols) {
    const r = getLowestRow(board, c);
    if (r === -1) continue;
    board[r][c] = opponent;
    if (checkWin(board, r, c)) {
      board[r][c] = 0;
      return c;
    }
    board[r][c] = 0;
  }

  for (const c of cols) {
    const r = getLowestRow(board, c);
    if (r === -1) continue;
    board[r][c] = aiPlayer;
    const score = minimax(board, 0, -Infinity, Infinity, false, aiPlayer, maxDepth);
    board[r][c] = 0;
    if (score > bestScore) {
      bestScore = score;
      bestCol = c;
    }
  }
  return bestCol;
};

export default function ConnectFour() {
  const [board, setBoard] = useState<Board>(createBoard);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [winCells, setWinCells] = useState<WinCells>([]);
  const [mode, setMode] = useState<"1p" | "2p">("1p");
  const [aiThinking, setAiThinking] = useState(false);
  const [score, setScore] = useState({ p1: 0, p2: 0, draws: 0 });
  const [discAnimations, setDiscAnimations] = useState<Set<string>>(new Set());
  const boardRef = useRef<Board>(createBoard());

  const dropDisc = useCallback(
    (col: number) => {
      if (gameOver || aiThinking) return;
      const r = getLowestRow(board, col);
      if (r === -1) return;

      const newBoard = board.map((row) => [...row]);
      newBoard[r][col] = currentPlayer;
      boardRef.current = newBoard;
      Sound.drop();

      setDiscAnimations((prev) => {
        const next = new Set(prev);
        next.add(`${r}-${col}`);
        return next;
      });
      setTimeout(() => {
        setDiscAnimations((prev) => {
          const next = new Set(prev);
          next.delete(`${r}-${col}`);
          return next;
        });
      }, 300);

      const winC = checkWin(newBoard, r, col);
      if (winC) {
        setBoard(newBoard);
        setWinner(currentPlayer);
        setGameOver(true);
        setWinCells(winC);
        setScore((s) => ({
          ...s,
          p1: currentPlayer === 1 ? s.p1 + 1 : s.p1,
          p2: currentPlayer === 2 ? s.p2 + 1 : s.p2,
        }));
        Sound.win();
        return;
      }
      if (isDraw(newBoard)) {
        setBoard(newBoard);
        setGameOver(true);
        setScore((s) => ({ ...s, draws: s.draws + 1 }));
        Sound.wrong();
        return;
      }

      setBoard(newBoard);

      if (mode === "1p" && currentPlayer === 1) {
        setCurrentPlayer(2);
        setAiThinking(true);
        setTimeout(() => {
          const aiCol = getAIMove(newBoard, 2);
          const aiRow = getLowestRow(newBoard, aiCol);
          if (aiRow === -1) {
            setAiThinking(false);
            setCurrentPlayer(1);
            return;
          }
          const aiBoard = newBoard.map((row) => [...row]);
          aiBoard[aiRow][aiCol] = 2;
          boardRef.current = aiBoard;
          Sound.drop();

          setDiscAnimations((prev) => {
            const next = new Set(prev);
            next.add(`${aiRow}-${aiCol}`);
            return next;
          });
          setTimeout(() => {
            setDiscAnimations((prev) => {
              const next = new Set(prev);
              next.delete(`${aiRow}-${aiCol}`);
              return next;
            });
          }, 300);

          const aiWin = checkWin(aiBoard, aiRow, aiCol);
          if (aiWin) {
            setBoard(aiBoard);
            setWinner(2);
            setGameOver(true);
            setWinCells(aiWin);
            setScore((s) => ({ ...s, p2: s.p2 + 1 }));
            Sound.lose();
            setAiThinking(false);
            return;
          }
          if (isDraw(aiBoard)) {
            setBoard(aiBoard);
            setGameOver(true);
            setScore((s) => ({ ...s, draws: s.draws + 1 }));
            Sound.wrong();
            setAiThinking(false);
            return;
          }
          setBoard(aiBoard);
          setCurrentPlayer(1);
          setAiThinking(false);
        }, 400);
      } else {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    },
    [board, currentPlayer, gameOver, aiThinking, mode]
  );

  const resetGame = () => {
    Sound.click();
    const b = createBoard();
    setBoard(b);
    boardRef.current = b;
    setCurrentPlayer(1);
    setGameOver(false);
    setWinner(null);
    setWinCells([]);
    setAiThinking(false);
  };

  const shareResult = () => {
    let text = "";
    if (winner === 1) {
      text = mode === "1p" ? "I won Connect Four! Can you beat me?" : "Player 1 won Connect Four!";
    } else if (winner === 2) {
      text = mode === "1p" ? "The AI beat me at Connect Four... can you do better?" : "Player 2 won Connect Four!";
    } else {
      text = "We drew at Connect Four! Want a rematch?";
    }
    if (mode === "1p") text = winner === 1 ? "I won Connect Four! Can you beat me?" : text;
    navigator.clipboard.writeText(text);
  };

  const isWinCell = (r: number, c: number) => winCells.some(([wr, wc]) => wr === r && wc === c);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 select-none">
      <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Connect Four</h1>

      <div className="flex gap-3 mb-5">
        <button
          onClick={() => {
            setMode("1p");
            resetGame();
            setScore({ p1: 0, p2: 0, draws: 0 });
          }}
          className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
            mode === "1p"
              ? "bg-indigo-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          vs Computer
        </button>
        <button
          onClick={() => {
            setMode("2p");
            resetGame();
            setScore({ p1: 0, p2: 0, draws: 0 });
          }}
          className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
            mode === "2p"
              ? "bg-indigo-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          2 Player
        </button>
      </div>

      <div className="flex items-center gap-8 mb-4 text-sm text-gray-400">
        <span>
          {mode === "1p" ? "You" : "P1"}:{" "}
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 align-middle" /> {score.p1}
        </span>
        <span>
          Draws: {score.draws}
        </span>
        <span>
          {mode === "1p" ? "AI" : "P2"}:{" "}
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 align-middle" /> {score.p2}
        </span>
      </div>

      <div className="text-base font-medium mb-3 h-6">
        {gameOver ? (
          <span className={winner ? (winner === 1 ? "text-red-400" : "text-yellow-400") : "text-gray-400"}>
            {winner
              ? mode === "1p"
                ? winner === 1
                  ? "You win!"
                  : "AI wins!"
                : `Player ${winner} wins!`
              : "Draw!"}
          </span>
        ) : aiThinking ? (
          <span className="text-yellow-400">AI is thinking...</span>
        ) : (
          <span className={currentPlayer === 1 ? "text-red-400" : "text-yellow-400"}>
            {mode === "1p"
              ? currentPlayer === 1
                ? "Your turn"
                : "AI's turn"
              : `Player ${currentPlayer}'s turn`}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center gap-0">
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <div key={r} className="flex gap-0">
            {[0, 1, 2, 3, 4, 5, 6].map((c) => {
              const cell = board[r][c];
              const winning = isWinCell(r, c);
              const animating = discAnimations.has(`${r}-${c}`);
              return (
                <div key={c} className="relative">
                  <button
                    onClick={() => dropDisc(c)}
                    disabled={gameOver || aiThinking || board[0][c] !== 0}
                    className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform hover:scale-105 disabled:cursor-not-allowed"
                    aria-label={`Column ${c + 1}, Row ${r + 1}`}
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200 ${
                        cell === 0
                          ? "bg-gray-900 shadow-inner"
                          : cell === 1
                          ? "bg-red-500"
                          : "bg-yellow-400"
                      } ${
                        winning
                          ? "ring-4 ring-white shadow-lg shadow-white/30 scale-110"
                          : ""
                      } ${animating ? "animate-bounce" : ""}`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="w-full max-w-[448px] h-4 bg-indigo-900/60 rounded-b-2xl" />

      <div className="flex gap-3 mt-5">
        <button
          onClick={resetGame}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          New Game
        </button>
        {gameOver && (
          <button
            onClick={shareResult}
            className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-semibold text-gray-200 hover:bg-gray-700 transition-colors"
          >
            Share
          </button>
        )}
      </div>
    </div>
  );
}
