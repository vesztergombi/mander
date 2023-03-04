import { createSlice } from '@reduxjs/toolkit';


const createInitialPanel = () => ({
  fpath: '',
  lastSelection: null,
})

export const dualPanelSlice = createSlice({
  name: 'dualPanel',
  initialState: {
    panels: [ createInitialPanel(), createInitialPanel() ]
  },
  reducers: {
    updatePanelPath: (state, action) => {
      const {panelId, fpath} = action.payload
      state.panels[panelId].fpath = fpath
    },
    setLastSelection: (state, action) => {
      const { panelId, fpath } = action.payload
      state.panels[panelId].lastSelection = fpath
    }
  }
});

export const getPath = panelId => state => state.dualPanel.panels[panelId].fpath

export const { 
  updatePanelPath,
  setLastSelection
} = dualPanelSlice.actions;

export default dualPanelSlice.reducer;
