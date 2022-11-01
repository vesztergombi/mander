import {useEffect, useState} from "react";
import DirectoryPanel from "./DirectoryPanel/DirectoryPanel.jsx";
import style from './TwoPanelView.module.css'
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
    const [dirPath, updateDirPath] = useState('directory placeholder');
    const [showHidden, setShowHidden] = useState(true);
    const [selectionIndex, setSelectionIndex] = useState(0);
    const [model, updateModel] = useState(new DirectoryModel());

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
