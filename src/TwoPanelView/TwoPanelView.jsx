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
    const [dir, updateDir] = useState([])
    const getRemoteList = () => {
            fetch('/ls/', fetchParams)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    updateDir(data)
                })
                .catch(error => console.error(error));
        };
    useEffect(getRemoteList, []);

    return <div className={style['two-panel-container']}>
        <DirectoryPanel dir={dir}/>
        <DirectoryPanel dir={dir}/>
    </div>
}

export default TwoPanelView
