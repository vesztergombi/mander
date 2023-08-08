import { createSlice } from '@reduxjs/toolkit';


const createInitialPanel = () => ({
    fpath: '',
    showHidden: false,
    lastSelection: null,
})

export const dualPanelSlice = createSlice({
    name: 'dualPanel',
    initialState: {
        panels: [createInitialPanel(), createInitialPanel()]
    },
    reducers: {
        updatePanelPath: (state, action) => {
            const { panelId, fpath } = action.payload
            state.panels[panelId].fpath = fpath
        },
        setLastSelection: (state, action) => {
            const { panelId, fpath } = action.payload
            state.panels[panelId].lastSelection = fpath
        },
        toggleHiddenFiles: (state, action) => {
            const { panelId } = action.payload
            state.panels[panelId].showHidden = !state.panels[panelId].showHidden
        },
    }
});

export const getPath = panelId => state => state.dualPanel.panels[panelId].fpath

export const getShowHidden = panelId => state => state.dualPanel.panels[panelId].showHidden

export const {
    updatePanelPath,
    setLastSelection,
    toggleHiddenFiles
} = dualPanelSlice.actions;

export default dualPanelSlice.reducer;
