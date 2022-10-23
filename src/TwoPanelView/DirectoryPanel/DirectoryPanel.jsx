import styles from './DirectoryPanel.module.css'
import {useState} from "react";


const DirectoryPanel = (props) => {
    const [selection, setSelection] = useState('placeholder');
    return <div className={styles.panel}>
        <h2>Directory {props.path}</h2>
        <ul>
            {props.dir.map(entry =>
                <li key={entry.path}
                    onMouseEnter={() => setSelection(entry.path)}
                >
                    {entry.path}
                </li>)}
        </ul>
        <p>{selection}</p>
    </div>
}

export default DirectoryPanel;