import {GridCell} from "./GridCell";
import './TicTacToe.css';
import React from "react";
import { useDispatch } from 'react-redux';
import {store} from "./store/store";
import {gameStateActions} from "./slices/GameState";

interface TicTacToeProps {
    size: number;
}

export function TicTacToe({size} : TicTacToeProps) {
    const dispatch = useDispatch();
    document.documentElement.style.setProperty('--grid-size', `${size}`);

    const gameBoard = store.getState().gameState.board;

    const generateGrid = () => {
        let grid = [];

        for (let row = 0; row < size; row++) {
            let rowElements = [];

            for (let col = 0; col < size; col++) {
                rowElements.push(
                    <GridCell
                        key={`${row}-${col}`}
                        symbol={gameBoard[row][col]}
                        onClick={() => dispatch(gameStateActions.makeMove({x: row, y: col}))}
                    />
                );
            }
            grid.push(<div key={row} className="grid-row">{rowElements}</div>);
        }
        return grid;
    };

    return <div className="grid-container">{generateGrid()}</div>;
}