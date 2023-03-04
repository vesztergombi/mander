import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPath, updatePanelPath } from '../../Chromander/Store/DualPanelSlice';
import { useGetDirQuery } from '../../Chromander/Store/apiSlice';
import { DirectoryModel } from '../directoryModel';
import styles from './DirectoryPanel.module.css'


const DirectoryPanel = (props) => {
  const id = props.panelId
  const fpath = useSelector(getPath(id))
  const dispatch = useDispatch()
  const [selection, setSelection] = useState('placeholder');
  const { data: directory_dto, isFetching } = useGetDirQuery({ fpath })

  const updatePath = (selection) => {
    dispatch(updatePanelPath({ panelId: id, fpath: selection }))
  }

  const entryList = () => {
    const dirModel = new DirectoryModel(directory_dto)
    return dirModel.getView().map(entry =>
      <li key={entry.path}
        onMouseEnter={() => setSelection(entry.path)}
        onClick={() => entry['isDir'] && updatePath(selection)}
      >
        { entry.displayName }
      </li>);
  }

  return <div className={styles.panel}>
    <h2>Directory { fpath }</h2>
    <ul> { !isFetching && entryList() } </ul>
    <p> { selection }</p>
    <p> { props.selectionIndex }</p>
    </div>
}


export default DirectoryPanel;
