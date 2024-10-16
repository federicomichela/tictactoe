import React from 'react';
import {TicTacToe} from "./TicTacToe";
import './App.css';
import {store} from "./store/store";
import {GameStateIF} from "./slices/GameState";

function App() {
  const game:GameStateIF = store.getState().gameState as GameStateIF;
  const boardSize = game.boardSize;

  return (
    <div className="App">
      <header className="App-header">
        <TicTacToe size={boardSize} />
        <p>
          Tic Tac Toe
        </p>
        <a
          className="App-link"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Github
        </a>
      </header>
    </div>
  );
}

export default App;
