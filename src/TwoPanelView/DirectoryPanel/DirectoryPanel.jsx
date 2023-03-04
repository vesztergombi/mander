import styles from './DirectoryPanel.module.css'
import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPath, updatePanelPath } from '../../Chromander/Store/DualPanelSlice';
import { useGetDirQuery } from '../../Chromander/Store/apiSlice';

const DirectoryPanel = (props) => {
  const id = props.panelId
  const fpath = useSelector(getPath(id))

  const [selection, setSelection] = useState('placeholder');
  const dispatch = useDispatch()
  const dualipa_load = (selection) => {
    // props.load(selection)
    dispatch(updatePanelPath({ panelId: id, fpath: selection || ''}))
  }
  const { data: directory_dto } = useGetDirQuery({ fpath })
  // console.log(directory_dto)
  const entryList = () => {
    return props.dirModel.getView().map(entry =>
      <li key={entry.path}
      onMouseEnter={() => setSelection(entry.path)}
      onClick={() => entry['isDir'] && dualipa_load(selection)}
      >
      { entry.displayName }
      </li>);
  }
  return <div className={styles.panel}>
    <h2>Directory {props.path}</h2>
    <ul>
    { entryList() }
    </ul>
    <p>{selection}</p>
    <p>{props.selectionIndex}</p>
    </div>
}

export default DirectoryPanel;
