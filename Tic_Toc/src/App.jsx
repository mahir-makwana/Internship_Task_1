import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [isXTurn, setIsXTurn] = useState(true);

  const winnigCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];
  const getWinner = (square) => {
    for (let combination of winnigCombo) {
      const [a, b, c] = combination;

      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  };

  const handelSquareClick = (index) => {
    if (board[index] || getWinner(board)) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = isXTurn ? "X" : "O";

    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);
  };

  const getGameStatus = () => {
    const winner = getWinner(board);
    if (winner) {
      return `${winner} wins!`;
    }

    if (board.every((square) => square !== null)) {
      return "It's a draw!";
    }

    return `Next Player: ${isXTurn ? "X" : "O"} `;
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };
  return (
    <div className=" bg-orange-100 flex items-center justify-center">
      <div className="w-full max-w-[400px] mx-5">
        <h1 className="text-5xl font-semibold text-brown-800 mb-8 text-center">
          Tic Tac Toe
        </h1>

        <div
          className={`text-center mb-6 ${
            getWinner(board)
              ? "text-2xl font-bold text-red-500 animate-bounce"
              : "text-xl text-brown-700"
          }`}
        >
          {getGameStatus()}
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
          {board.map((square, index) => (
            <button
              key={index}
              onClick={() => handelSquareClick(index)}
              className={`h-32 w-full bg-orange-300 rounded-md text-6xl font-light transition-colors duration-200 hover:bg-orange-400 ${
                square === "X" ? "text-brown-800" : "text-brown-600"
              }`}
            >
              {square}
            </button>
          ))}
        </div>

        <button
          className="w-full py-3 text-lg text-brown-800 border rounded-xl hover:bg-orange-400 hover:text-white transition-colors duration-200"
          onClick={resetGame}
        >
          NEW GAME
        </button>
      </div>
    </div>
  );
}

export default App;
