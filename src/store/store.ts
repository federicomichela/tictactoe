import {configureStore} from '@reduxjs/toolkit';
import matchReducer from "../slices/MatchSlice";

export const store = configureStore({
    reducer: {
        match: matchReducer
    }
})