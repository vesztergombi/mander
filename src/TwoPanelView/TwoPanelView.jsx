import DirectoryPanel from "./DirectoryPanel/DirectoryPanel.jsx";
import style from './TwoPanelView.module.css';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toSortedViewModel, DirectoryModel } from "./directoryModel.js";
// import {decrement, increment, useGetPostsQuery} from "./DualPanelSlice.js";
import { useGetDirQuery } from '../Chromander/Store/apiSlice'

const fetchParams = (dir_path = '') =>  ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({path: dir_path})
} );


const TwoPanelView = () => {

    const [dirContent, updateDirContent] = useState([]);
    const [dirPath, updateDirPath] = useState('directory placeholder');
    const [showHidden, setShowHidden] = useState(true);
    const [selectionIndex, setSelectionIndex] = useState(0);
    const [model, updateModel] = useState(new DirectoryModel());

    const a = useGetDirQuery({fpath: 'projects'})
    console.log('Get query from RTK toolkit', a)
    const getRemoteList = (dir_path = '') => {
            fetch('/ls/', fetchParams(dir_path))
                .then(response => response.json())
                .then(data => {
                    updateDirContent(toSortedViewModel(data));
                    updateDirPath(data['directory_path']);
                    updateModel(new DirectoryModel(data));
                })
                .catch(error => console.error(error));
        };
    const toggleShowHidden = () => setShowHidden(!showHidden);
    const keyHandler = (({key}) => {
        if (key === 'H') {
            console.log(`Keyhandler model=${JSON.stringify(model)}`);
            updateModel(new DirectoryModel(model.rawDto, !model.showHidden()));
        }
        if (key === 'j') setSelectionIndex((selectionIndex + 1) % dirContent.length)
    });
    useEffect(getRemoteList, []);
    const count = useSelector((state) => state.dualPanel.value);
    const dispatch = useDispatch();

    return <div className={style['two-panel-container']} tabIndex={0} onKeyDown={ e => keyHandler(e)}>
        <DirectoryPanel
            selectionIndex={selectionIndex}
            showHidden={showHidden}
            dirModel={model}
            dir={dirContent}
            path={dirPath}
            load={getRemoteList}/>
        <DirectoryPanel
            selectionIndex={selectionIndex}
            showHidden={showHidden}
            dirModel={model}
            dir={dirContent}
            path={dirPath}
            load={getRemoteList}/>
    </div>
}

export default TwoPanelView
