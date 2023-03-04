import { configureStore } from '@reduxjs/toolkit'
import  dualPanelReducer  from './Chromander/Store/DualPanelSlice'
import { dirExplorerSlice } from './Chromander/Store/apiSlice'

export default configureStore({
    reducer: {
        dualPanel: dualPanelReducer,
        [dirExplorerSlice.reducerPath]: dirExplorerSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(dirExplorerSlice.middleware)
});
