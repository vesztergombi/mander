import { createSlice } from '@reduxjs/toolkit';


const createInitialPanel = () => ({
  fpath: ''
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
    }
  }
});

export const getPath = panelId => state => state.dualPanel.panels[panelId].fpath

export const { 
  updatePanelPath
} = dualPanelSlice.actions;

export default dualPanelSlice.reducer;
