import {configureStore} from '@reduxjs/toolkit';
import gameStateReducer from "../slices/GameState";

export const store = configureStore({
    reducer: {
        gameState: gameStateReducer
    }
})