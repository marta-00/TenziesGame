import React from 'react'
import Die from "./components/Die"
import './App.css'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice())

  const buttonRef = React.useRef(null)

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }
  , [gameWon])

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }))
  }

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice())
    } else {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    }))}
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }
  
  const diceElements = dice.map((die) => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={holdDice}
      id={die.id}
    />
  ))


  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live='polite' className='sr-only'>
        {gameWon && <p> Congratulations! You Won! Press "New Game" to start again.</p>}
      </div>
      <div className="active">
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='container'>
          {diceElements}
        </div>
        <button ref={buttonRef} className='roll-dice' onClick={rollDice}>
          {gameWon ? "New Game" : "Roll dice"}
        </button>
      </div>
    </main>
  )
}

export default App
