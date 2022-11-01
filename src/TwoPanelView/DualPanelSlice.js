import { createSlice } from '@reduxjs/toolkit';

export const dualPanelSlice = createSlice({
    name: 'dualPanel',
    initialState: {
        panelA: {},
        panelB: {},
        value: 0,
    },
    reducers: {
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

export const { increment, decrement, incrementByAmount } = dualPanelSlice.actions;

export default dualPanelSlice.reducer;