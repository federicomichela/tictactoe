import {GridCell} from "./GridCell";
import './TicTacToe.scss';
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import GameState, {gameStateActions, GameStateStatus} from "./slices/GameState";
import {text} from "./text";
import gameState from "./slices/GameState";

interface TicTacToeProps {
    size: number;
}

export function TicTacToe({size} : TicTacToeProps) {
    const dispatch = useDispatch();
    document.documentElement.style.setProperty('--grid-size', `${size}`);

    const currentPlayer = useSelector((state: any) => state.gameState.currentPlayer);
    const gameBoard = useSelector((state: any) => state.gameState.board);
    const gameStatus = useSelector((state: any) => state.gameState.status);
    const gameActive = [GameStateStatus.IDLE, GameStateStatus.PLAYING].includes(gameStatus);

    const generateGrid = () => {
        let grid = [];

        for (let row = 0; row < size; row++) {
            let rowElements = [];

            for (let col = 0; col < size; col++) {
                rowElements.push(
                    <GridCell
                        key={`${row}-${col}`}
                        symbol={gameBoard[row][col]}
                        disabled={!gameActive}
                        onClick={() => dispatch(gameStateActions.makeMove({x: row, y: col}))}
                    />
                );
            }
            grid.push(<div key={row} className="grid-row">{rowElements}</div>);
        }
        return grid;
    };

    const gameStatusMessage = () => {
        if (gameStatus === GameStateStatus.GAME_OVER) {
            return (
                <>
                    <h1>{text.GAME_OVER}</h1>
                    <button
                        className="game_btn--default"
                        onClick={() => dispatch(gameStateActions.resetBoard())}
                    >
                        {text.NEW_GAME}
                    </button>
                </>
            )
        } else if (gameStatus === GameStateStatus.WIN) {
            return (
                <>
                    <h1>{text.GAME_WON}</h1>
                    <button
                        className="game_btn--default"
                        onClick={() => dispatch(gameStateActions.resetBoard())}
                    >
                        {text.NEW_GAME}
                    </button>
                </>
            )
        } else if (gameStatus === GameStateStatus.PLAYING) {
            return (
                <>
                    <h2>{text.CURRENT_PLAYER} {currentPlayer}</h2>
                    <button
                        className="game_btn--default"
                        onClick={() => dispatch(gameStateActions.resetBoard())}
                    >
                        {text.GAME_RESET}
                    </button>
                </>
            )
        } else {
            return <h2>{text.CURRENT_PLAYER} {currentPlayer}</h2>;
        }
    }

    return (
        <>
            <div className="grid-container">{generateGrid()}</div>
            <div>{gameStatusMessage()}</div>
        </>
    );
}