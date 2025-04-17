import Main from "./components/Main"
import './App.css'

function App() {
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
    }))
  }

  return (
    <>
      <Main />
    </>
  )
}

export default App
