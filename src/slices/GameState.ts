import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum TicTacToeSymbols { // TODO: customise mapping
    X = 'X',
    O = 'O'
}

enum GameStateStatus {
    IDLE,
    PLAYING,
    GAME_OVER,
    WIN,
}

export interface GameStateIF {
    status: GameStateStatus;
    currentPlayer: TicTacToeSymbols,
    boardSize: number,
    board: (string|null)[][]
}

const initialState: GameStateIF = {
    status: GameStateStatus.IDLE,
    currentPlayer: TicTacToeSymbols.X,
    boardSize: 3,
    board: Array(3).fill(null).map(() => Array(3).fill(null)),
}

export const gameStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        setBoardSize(state: GameStateIF, action: PayloadAction<number>) {
            if (state.status === GameStateStatus.IDLE) {
                state.boardSize = action.payload;
            }
        },
        resetBoard(state: GameStateIF) {
            state = { ...initialState };
        },
        makeMove(state: GameStateIF, action: PayloadAction<{x:number, y:number}>) {
            const { x, y } = action.payload;

            if (state.status === GameStateStatus.PLAYING && state.board[x][y] === null) {
                state.board[x][y] = state.currentPlayer;
                state.status = checkGameStatus(state.board);

                if (state.status === GameStateStatus.PLAYING) {
                    state.currentPlayer = state.currentPlayer === TicTacToeSymbols.X ? TicTacToeSymbols.O : TicTacToeSymbols.X;
                }
            }
        },

    }
})

function checkGameStatus(board: (string|null)[][]):GameStateStatus {
    const boardSize = board.length;

    // check for idle
    if (board.every((row) => row.every((cell) => cell === null))) {
        return GameStateStatus.IDLE
    }

    for (let index = 0; index < boardSize; index++) {
        // check rows
        if (board[index].every((cell) => cell === board[index][0])) {
            return GameStateStatus.WIN;
        }

        // check cols
        if (board.every((row) => row[index] !== null && row[index] === board[0][index])) {
            return GameStateStatus.WIN;
        }
    }

    // check diagonals
    const leftDiagonal = board.every((row, i) => row[i] === board[0][0]);
    const rightDiagonal = board.every((row, i) => row[boardSize - i - 1] === board[0][boardSize - 1])

    if ( leftDiagonal || rightDiagonal) {
        return GameStateStatus.WIN;
    }

    return GameStateStatus.GAME_OVER;
}

export const gameStateActions = gameStateSlice.actions;
export default gameStateSlice.reducer;