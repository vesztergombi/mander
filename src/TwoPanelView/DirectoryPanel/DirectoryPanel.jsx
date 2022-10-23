import styles from './DirectoryPanel.module.css'


const DirectoryPanel = (props) => {
    return <div className={styles.panel}>
        <h2>Directory Panel Placeholder</h2>
        <ul>
            {props.dir.map(entry => <li>{entry.path}</li>)}
        </ul>
    </div>
}

export default DirectoryPanel;