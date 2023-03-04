import { createSlice } from '@reduxjs/toolkit';

export const dualPanelSlice = createSlice({
    name: 'dualPanel',
    initialState: {
        panelA: {},
        panelB: {},
        value: 0,
    },
    reducers: {
        updateDirectoryBufferA: (state, action) => {
            state.panelA = action.payload
        },
        updateDirectoryBufferB: (state, action) => {
            state.panelB = action.payload
        },
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { 
    updateDirectoryBufferA,
    updateDirectoryBufferB,
    increment, 
    decrement, 
    incrementByAmount 
} = dualPanelSlice.actions;

export default dualPanelSlice.reducer;
