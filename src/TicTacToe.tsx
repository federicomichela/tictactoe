import {GridCell} from "./GridCell";
import './TicTacToe.css';
import React from "react";
import {store} from "./store/store";

interface TicTacToeProps {
    size: number;
}

export function TicTacToe({size} : TicTacToeProps) {
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
                        onClick={() => {}}
                    />
                );
            }
            grid.push(<div key={row} className="grid-row">{rowElements}</div>);
        }
        return grid;
    };

    return <div className="grid-container">{generateGrid()}</div>;
}