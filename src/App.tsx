// components
import { NetworkDiagram } from './components/NetworkDiagram'

// styles
import './App.css'

const data: number[] = []

function App() {
  return (
    <>
      <NetworkDiagram 
        width={3000}
        height={3000}
        data={data}
      />
    </>
  )
}

export default App
