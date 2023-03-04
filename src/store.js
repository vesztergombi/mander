import { configureStore } from '@reduxjs/toolkit'
import dualPanelReducer from './TwoPanelView/DualPanelSlice.js'
import {apiSlice} from './Chromander/Store/apiSlice'

export default configureStore({
    reducer: {
        dualPanel: dualPanelReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});
