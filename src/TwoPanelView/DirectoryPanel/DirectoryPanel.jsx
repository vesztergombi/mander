import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPath,
    updatePanelPath,
    setLastSelection,
    toggleHiddenFiles,
    getShowHidden
} from '../../Chromander/Store/DualPanelSlice';
import { useGetDirQuery } from '../../Chromander/Store/apiSlice';
import { DirectoryModel } from './directoryModel';
import styles from './DirectoryPanel.module.css'


const DirectoryPanel = (props) => {
    const id = props.panelId
    const fpath = useSelector(getPath(id))
    const showHidden = useSelector(getShowHidden(id))
    const dispatch = useDispatch()
    const [selection, setSelection] = useState({ path: '', isDir: false });
    console.log(`At the start of rendering selection=${JSON.stringify(selection)}`)
    const { data: directory_dto, isFetching } = useGetDirQuery({ fpath })

    const updatePath = (entry) => {
        if (entry['isDir']) {
            dispatch(updatePanelPath({ panelId: id, fpath: entry.path }))
        }
    }

    const keyHandler = ({ key }, model) => {
        console.log(`key=${key}`)
        if (key === 'H') {
            console.log(`key=${key}`)
            dispatch(toggleHiddenFiles({ panelId: id }))
        }
        if (key === 'k') {
            const next = model.getPrev(selection.path)
            next && setSelection(next)
        }
        if (key === 'j') {
            const next = model.getNext(selection.path)
            if (next) setSelection(next)
            else {
                const first = model.getFirst()
                first && setSelection(first)
            }
        }
        if (key === 'Enter') {
            console.log('Enter indeed!')
            updatePath(selection)
        }
    };
    const dirModel = new DirectoryModel(directory_dto, showHidden)

    const entryList = () => {
        return dirModel.getView().map(entry =>
            <li key={entry.path}
                className={(selection.path === entry.path) ? styles.selected : undefined}
                onMouseEnter={() => {
                    setSelection(entry)
                    dispatch(setLastSelection({ panelId: id, fpath: entry.path }))
                }}
                onClick={() => entry['isDir'] && updatePath(entry.path)}
            >
                {entry.displayName}
            </li>);
    }

    const inputReference = useRef(null)
    useEffect(() => {
        inputReference.current.focus()
    }, [])


    return <div className={styles.panel}
        ref={inputReference}
        tabIndex={id}
        onKeyDown={e => keyHandler(e, dirModel)}
    >
        <h2>Directory {fpath}</h2>
        <ul> {!isFetching && entryList()} </ul>
        <p> {selection.path}</p>
        <p> {props.selectionIndex}</p>
    </div>
}


export default DirectoryPanel;
