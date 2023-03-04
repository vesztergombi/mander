import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getPath, 
  updatePanelPath,
  setLastSelection
} from '../../Chromander/Store/DualPanelSlice';
import { useGetDirQuery } from '../../Chromander/Store/apiSlice';
import { DirectoryModel } from './directoryModel';
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

  const keyHandler = ({key}, model) => {
    if (key === 'H') console.log(`key=${key}`)
    if (key === 'k') {
      console.log(`key=${key} selection=${selection}`)
      const next = model.getPrev(selection)
      console.log(next)
      setSelection(next)
    }
    if (key === 'j') {
      console.log(`key=${key} selection=${selection}`)
      const next = model.getNext(selection)
      console.log(next)
      setSelection(next)
    }
  };
  const dirModel = new DirectoryModel(directory_dto)

  const entryList = () => {
    return dirModel.getView().map(entry =>
      <li key={entry.path}
        className={ (selection === entry.path)? styles.selected : undefined }
        onMouseEnter={() => { 
          setSelection(entry.path) 
          dispatch(setLastSelection({ panelId: id, fpath: entry.path }))
        }}
        onClick={() => entry['isDir'] && updatePath(entry.path)}
      >
        { entry.displayName }
      </li>);
  }

  return <div className={styles.panel}
      tabIndex={id}
      onKeyDown={ e => keyHandler(e, dirModel)}
    >
    <h2>Directory { fpath }</h2>
    <ul> { !isFetching && entryList() } </ul>
    <p> { selection }</p>
    <p> { props.selectionIndex }</p>
    </div>
}


export default DirectoryPanel;
