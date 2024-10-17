import './TicTacToe.scss';
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {text} from "./text";
import {matchActions, MatchStatus} from "./slices/MatchSlice";
import {Board} from "./components/Board/Board";

interface TicTacToeProps {
    size: number;
}

export function TicTacToe({size} : TicTacToeProps) {
    const dispatch = useDispatch();
    document.documentElement.style.setProperty('--grid-size', `${size}`);

    const currentPlayer = useSelector((state: any) => state.match.currentPlayer);
    const gameStatus = useSelector((state: any) => state.match.status);

    const gameStatusMessage = () => {
        if (gameStatus === MatchStatus.GAME_OVER) {
            return (
                <>
                    <h1>{text.GAME_OVER}</h1>
                    <button
                        className="game_btn--default"
                        onClick={() => dispatch(matchActions.resetBoard())}
                    >
                        {text.NEW_GAME}
                    </button>
                </>
            )
        } else if (gameStatus === MatchStatus.WIN) {
            return (
                <>
                    <h1>{text.GAME_WON}</h1>
                    <button
                        className="game_btn--default"
                        onClick={() => dispatch(matchActions.resetBoard())}
                    >
                        {text.NEW_GAME}
                    </button>
                </>
            )
        } else if (gameStatus === MatchStatus.PLAYING) {
            return (
                <>
                    <h2>{text.CURRENT_PLAYER} {currentPlayer}</h2>
                    <button
                        className="game_btn--default"
                        onClick={() => dispatch(matchActions.resetBoard())}
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
            <Board />
            <div>{gameStatusMessage()}</div>
        </>
    );
}