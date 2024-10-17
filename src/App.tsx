import React from 'react';
import {TicTacToe} from "./TicTacToe";
import './App.css';
import {store} from "./store/store";
import {MatchProps} from "./slices/MatchSlice";

function App() {
  const game:MatchProps = store.getState().match as MatchProps;
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
          href="https://github.com/federicomichela/tictactoe"
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
