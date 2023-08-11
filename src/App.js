import React, { useState, useEffect } from "react";

import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import './App.css';

const App = () => {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [xPlaying, setXPlaying] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setGameOver(true);
      setTimeout(() => {
        const updatedScores = { ...scores };
        updatedScores[winner === 'X' ? 'xScore' : 'oScore'] += 1;
        setScores(updatedScores);
        setBoard(Array(9).fill(null));
        setGameOver(false);
      }, 200); // Delay the reset by 0.5 seconds
    } else {
      setXPlaying(!xPlaying);
    }
  }, [board]);

  const checkWinner = (currentBoard) => {
    for (const combo of WIN_CONDITIONS) {
      const [x, y, z] = combo;
      if (currentBoard[x] && currentBoard[x] === currentBoard[y] && currentBoard[y] === currentBoard[z]) {
        return currentBoard[x];
      }
    }
    return null;
  };

  const handleBoxClick = (boxIdx) => {
    if (!gameOver && !board[boxIdx]) {
      const updatedBoard = board.map((value, idx) => {
        if (idx === boxIdx) {
          return xPlaying ? 'X' : 'O';
        } else {
          return value;
        }
      });

      setBoard(updatedBoard);
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
