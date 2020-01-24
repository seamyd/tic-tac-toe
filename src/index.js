//
// @flow
//
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type Squares = Array<string | null>;

const calculateWinner = (squares: Squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  };
  return null;
}

type SquareProps = {
  value?: string | null,
  click?: Function
}

const Square = (props: SquareProps) => (
  <button className="square" onClick={props.click} >
    {props.value}
  </button>
);

type BoardProps = {
  player: string,
  updateGameState: Function
}

const Board = (props: BoardProps) => {
  const [squares, setSquares] = useState<Squares>(new Array(9).fill(null));

  const renderSquare = pos => {
    return (
      <Square
        value={squares[pos]} 
        click={() => {
          const updatedSquares = [
            ...squares.slice(0, pos),
            props.player,
            ...squares.slice(pos + 1)
          ];
          setSquares(updatedSquares);
          props.updateGameState(updatedSquares);
        }} 
      />
    )
  }

  const status = `Next player: ${props.player}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const Game = () => {
  const [player, setPlayer] = useState<string>("X");
  const [status, setStatus] = useState<string>("");

  const togglePlayer = () => {
    player === "X" ? setPlayer("O") : setPlayer("X");
  }

  const updateGameState = squares => {
    const winner = calculateWinner(squares);
    winner ?
      setStatus(`And the winner is ${winner}!!`) :
      togglePlayer();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board player={player} updateGameState={updateGameState} />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
}

// ========================================
const root = document.getElementById('root')

if (root !== null) {
  ReactDOM.render(<Game /> , root)
}

