import styles from './DirectoryPanel.module.css'
import {useState} from "react";


const DirectoryPanel = (props) => {
    const [selection, setSelection] = useState('placeholder');
    const entryList = () => {
        // const filtered_dir = (props.showHidden) ?
        //     props.dir :
        //     props.dir.filter(e => e.displayName === '..' || !e.displayName.startsWith('.'));

        // return filtered_dir.map(entry =>
        // console.log('Csá');
        // console.log(props.dirModel.getView());
        return props.dirModel.getView().map(entry =>
            <li key={entry.path}
                onMouseEnter={() => setSelection(entry.path)}
                onClick={() => entry['isDir'] && props.load(selection)}
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