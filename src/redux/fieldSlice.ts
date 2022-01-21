import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import type { State } from './store';

interface FieldState {
    test: number;
}

const initialState: FieldState = {
    test: 1,
};

export const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        setTest: (state, action: PayloadAction<number>) => {
            state.test = action.payload;
        },
    },
});

export const { setTest } = fieldSlice.actions;

export const getFieldState = (state: State) => state.field;
export const getFieldTest = createSelector(
    getFieldState,
    (state) => state.test
);

export default fieldSlice.reducer;
