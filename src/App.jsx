import { useState } from 'react'
import TwoPanelView from './TwoPanelView/TwoPanelView.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Chromander</h1>
      <TwoPanelView/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Chromander file browser front-end
      </p>
    </div>
  )
}

export default App
