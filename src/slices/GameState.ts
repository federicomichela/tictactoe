import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum TicTacToeSymbols { // TODO: customise mapping
    X = 'X',
    O = 'O'
}

export enum GameStateStatus {
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
            Object.assign(state, initialState);
        },
        makeMove(state: GameStateIF, action: PayloadAction<{x:number, y:number}>) {
            const { x, y } = action.payload;

            if (state.status === GameStateStatus.IDLE) {
                state.status = GameStateStatus.PLAYING;
            }

            if (state.status === GameStateStatus.PLAYING && state.board[x][y] === null) {
                state.board[x][y] = state.currentPlayer;
                state.status = checkGameStatus(state.board, state.currentPlayer);

                if (state.status === GameStateStatus.PLAYING) {
                    state.currentPlayer = state.currentPlayer === TicTacToeSymbols.X ? TicTacToeSymbols.O : TicTacToeSymbols.X;
                }
            }
        },

    }
})

function checkGameStatus(board: (string|null)[][], symbol: TicTacToeSymbols):GameStateStatus {
    const boardSize = board.length;

    // check for idle
    if (board.every((row) => row.every((cell) => cell === null))) {
        return GameStateStatus.IDLE
    }

    for (let index = 0; index < boardSize; index++) {
        // check rows
        if (board[index].every((cell) => cell === symbol)) {
            return GameStateStatus.WIN;
        }

        // check cols
        if (board.every((row) => row[index] !== null && row[index] === symbol)) {
            return GameStateStatus.WIN;
        }
    }

    // check diagonals
    const leftDiagonal = board.every((row, i) => row[i] === symbol);
    const rightDiagonal = board.every((row, i) => row[boardSize - i - 1] === symbol)
    const movesLeft = board.some(row => row.includes(null));

    console.log(movesLeft);

    if (leftDiagonal || rightDiagonal) {
        return GameStateStatus.WIN;
    }

    if (!movesLeft) {
        return GameStateStatus.GAME_OVER;
    }

    return GameStateStatus.PLAYING;
}

export const gameStateActions = gameStateSlice.actions;
export default gameStateSlice.reducer;