import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import type { State } from '../store';

export enum AppScreen {
    Menu = 'Menu',
    Game = 'Game',
    End = 'End',
}

interface UIState {
    screen: AppScreen;
}

const initialState: UIState = {
    screen: AppScreen.End,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScreen: (state, action: PayloadAction<AppScreen>) => {
            state.screen = action.payload;
        },
    },
});

export const { setScreen } = uiSlice.actions;

export const getUIState = (state: State) => state.ui;
export const getAppScreen = createSelector(getUIState, (state) => state.screen);

export default uiSlice.reducer;
