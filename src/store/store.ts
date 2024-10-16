import {configureStore} from '@reduxjs/toolkit';
import gameStateSlice from "../slices/GameState";

export const store = configureStore({
    reducer: {
        gameState: gameStateSlice
    }
})

console.log(store.getState().gameState)