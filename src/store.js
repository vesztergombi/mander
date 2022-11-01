import { configureStore } from '@reduxjs/toolkit'
import dualPanelReducer from './TwoPanelView/DualPanelSlice.js'

export default configureStore({
    reducer: {
        dualPanel: dualPanelReducer,
    }
});