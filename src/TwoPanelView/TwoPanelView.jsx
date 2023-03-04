import DirectoryPanel from "./DirectoryPanel/DirectoryPanel.jsx";
import style from './TwoPanelView.module.css';

const TwoPanelView = () => {

  return <div className={style['two-panel-container']} tabIndex={0}>
      <DirectoryPanel panelId={0} />
      <DirectoryPanel panelId={1} />
    </div>
}

export default TwoPanelView
