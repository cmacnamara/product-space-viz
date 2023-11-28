// components
import { NetworkDiagram } from './components/NetworkDiagram/NetworkDiagram'

// styles
import './App.css'
import 'react-tooltip/dist/react-tooltip.css'

const data: number[] = []

function App() {
  return (
    <div className='mainContainer'>
      <h1>Product Space Visualization</h1>
      <NetworkDiagram 
        width={3000}
        height={3000}
        data={data}
      />
    </div>
  )
}

export default App
