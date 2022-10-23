import DirectoryPanel from "./DirectoryPanel/DirectoryPanel.jsx";
import style from './TwoPanelView.module.css'
import {useEffect, useState} from "react";

let dir_path = []

const fetchParams = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"path": ""})
};


const TwoPanelView = () => {

    const [dirContent, updateDirContent] = useState([]);
    const [dirPath, updateDirPath] = useState('directory placeholder');

    const getRemoteList = () => {
            fetch('/ls/', fetchParams)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    updateDirContent(data['directory_content']);
                    updateDirPath(data['directory_path']);
                })
                .catch(error => console.error(error));
        };
    useEffect(getRemoteList, []);

    return <div className={style['two-panel-container']}>
        <DirectoryPanel dir={dirContent} path={dirPath}/>
        <DirectoryPanel dir={dirContent} path={dirPath}/>
    </div>
}

export default TwoPanelView
