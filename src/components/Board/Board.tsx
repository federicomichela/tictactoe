import React from "react";
import './Board.scss';
import {BoardCell} from "../BoardCell/BoardCell";
import {matchActions, MatchStatus} from "../../slices/MatchSlice";
import {useDispatch, useSelector} from "react-redux";

export function Board() {
    const dispatch = useDispatch();

    const gameBoard = useSelector((state: any) => state.match.board);
    const gameStatus = useSelector((state: any) => state.match.status);
    const gameActive = [MatchStatus.IDLE, MatchStatus.PLAYING].includes(gameStatus);
    const size = gameBoard.length;

    let grid = [];

    for (let row = 0; row < size; row++) {
        let rowElements = [];

        for (let col = 0; col < size; col++) {
            rowElements.push(
                <BoardCell
                    key={`${row}-${col}`}
                    symbol={gameBoard[row][col]}
                    disabled={!gameActive}
                    onClick={() => dispatch(matchActions.makeMove({x: row, y: col}))}
                />
            );
        }
        grid.push(<div key={row} className="board_row">{rowElements}</div>);
    }
    return (
        <div className="board_container">
            {grid}
        </div>
    )
}