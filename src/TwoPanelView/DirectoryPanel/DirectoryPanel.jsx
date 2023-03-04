import styles from './DirectoryPanel.module.css'
import {useState} from "react";
import { useLazyGetDirQuery } from '../../Chromander/Store/apiSlice';
// import {useDispatch, useSelector} from "react-redux";

const DirectoryPanel = (props) => {
    const [selection, setSelection] = useState('placeholder');
    const [trigger, {data} ] = useLazyGetDirQuery()
    const dualipa_load = (selection) => {
      props.load(selection)
      trigger({ fpath: selection })
    }
    const entryList = () => {
        return props.dirModel.getView().map(entry =>
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
            { entryList() }
        </ul>
        <p>{selection}</p>
        <p>{props.selectionIndex}</p>
    </div>
}

export default DirectoryPanel;
