import styles from './DirectoryPanel.module.css'
import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPath, updatePanelPath } from '../../Chromander/Store/DualPanelSlice';
import { useGetDirQuery } from '../../Chromander/Store/apiSlice';
import { DirectoryModel } from '../directoryModel';

const DirectoryPanel = (props) => {
  const id = props.panelId
  const fpath = useSelector(getPath(id))

  const [selection, setSelection] = useState('placeholder');
  const dispatch = useDispatch()
  const dualipa_load = (selection) => {
    dispatch(updatePanelPath({ panelId: id, fpath: selection || ''}))
    console.log(`selected dir: ${selection}`)
  }
  const { data: directory_dto, isFetching } = useGetDirQuery({ fpath })
  // console.log(directory_dto)
  console.log('Now for the directory model')


  const entryList = () => {
    console.log(`isFetching=${isFetching}`)
    const dirModel = new DirectoryModel(directory_dto)
    console.log(`isFetching=${isFetching} dirModel ${dirModel}`)
    return dirModel.getView().map(entry =>
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
    { !isFetching && entryList() }
    </ul>
    <p>{selection}</p>
    <p>{props.selectionIndex}</p>
    </div>
}

export default DirectoryPanel;
