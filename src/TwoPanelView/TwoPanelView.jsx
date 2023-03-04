import DirectoryPanel from "./DirectoryPanel/DirectoryPanel.jsx";
import style from './TwoPanelView.module.css';
import { useEffect, useState } from 'react'
import { toSortedViewModel, DirectoryModel } from "./directoryModel.js";

const fetchParams = (dir_path = '') =>  ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({path: dir_path})
} );


const TwoPanelView = () => {

  const [dirContent, updateDirContent] = useState([]);
  const [selectionIndex, setSelectionIndex] = useState(0);

  const keyHandler = (({key}) => {
    if (key === 'H') {
    }
    if (key === 'j') setSelectionIndex((selectionIndex + 1) % dirContent.length)
  });

  return <div 
            className={style['two-panel-container']} 
            tabIndex={0}
            onKeyDown={ e => keyHandler(e)}>
      <DirectoryPanel panelId={0} />
      <DirectoryPanel panelId={1} />
    </div>
}

export default TwoPanelView
