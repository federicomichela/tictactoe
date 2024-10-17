import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum TicTacToeSymbols { // TODO: customise mapping
    X = 'X',
    O = 'O'
}

export enum MatchStatus {
    IDLE,
    PLAYING,
    GAME_OVER,
    WIN,
}

export interface MatchProps {
    status: MatchStatus;
    currentPlayer: TicTacToeSymbols,
    boardSize: number,
    board: (string|null)[][]
}

const initialState: MatchProps = {
    status: MatchStatus.IDLE,
    currentPlayer: TicTacToeSymbols.X,
    boardSize: 3,
    board: Array(3).fill(null).map(() => Array(3).fill(null)),
}

export const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        setBoardSize(state: MatchProps, action: PayloadAction<number>) {
            if (state.status === MatchStatus.IDLE) {
                state.boardSize = action.payload;
            }
        },
        resetBoard(state: MatchProps) {
            Object.assign(state, initialState);
        },
        makeMove(state: MatchProps, action: PayloadAction<{x:number, y:number}>) {
            const { x, y } = action.payload;

            if (state.status === MatchStatus.IDLE) {
                state.status = MatchStatus.PLAYING;
            }

            if (state.status === MatchStatus.PLAYING && state.board[x][y] === null) {
                state.board[x][y] = state.currentPlayer;
                state.status = checkGameStatus(state.board, state.currentPlayer);

                if (state.status === MatchStatus.PLAYING) {
                    state.currentPlayer = state.currentPlayer === TicTacToeSymbols.X ? TicTacToeSymbols.O : TicTacToeSymbols.X;
                }
            }
        },

    }
})

function checkGameStatus(board: (string|null)[][], symbol: TicTacToeSymbols):MatchStatus {
    const boardSize = board.length;

    // check for idle
    if (board.every((row) => row.every((cell) => cell === null))) {
        return MatchStatus.IDLE
    }

    for (let index = 0; index < boardSize; index++) {
        // check rows
        if (board[index].every((cell) => cell === symbol)) {
            return MatchStatus.WIN;
        }

        // check cols
        if (board.every((row) => row[index] !== null && row[index] === symbol)) {
            return MatchStatus.WIN;
        }
    }

    // check diagonals
    const leftDiagonal = board.every((row, i) => row[i] === symbol);
    const rightDiagonal = board.every((row, i) => row[boardSize - i - 1] === symbol)
    const movesLeft = board.some(row => row.includes(null));

    console.log(movesLeft);

    if (leftDiagonal || rightDiagonal) {
        return MatchStatus.WIN;
    }

    if (!movesLeft) {
        return MatchStatus.GAME_OVER;
    }

    return MatchStatus.PLAYING;
}

export const matchActions = matchSlice.actions;
export default matchSlice.reducer;