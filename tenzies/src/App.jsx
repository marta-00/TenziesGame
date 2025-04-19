import React from 'react'
import Die from "./components/Die"
import './App.css'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice())

  const buttonRef = React.useRef(null)

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  const [time, setTime] = React.useState(0); 
  const [rolls, setRolls] = React.useState(0); 
  const [isRunning, setIsRunning] = React.useState(false); 

  React.useEffect(() => {
    let timer;
    if (!gameWon && isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (gameWon) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameWon, isRunning]);

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
    if (!isRunning) setIsRunning(true); // Inicia el temporizador al primer lanzamiento
    if (gameWon) {
      setDice(generateAllNewDice());
      setTime(0); // Reinicia el tiempo
      setRolls(0); // Reinicia los lanzamientos
      setIsRunning(false); // Detiene el temporizador
    } else {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) };
      }));
      setRolls(prevRolls => prevRolls + 1); // Incrementa los lanzamientos
    }
  }

  function holdDice(id) {
    if (!isRunning) setIsRunning(true); // Inicia el temporizador si no está corriendo
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
    }));
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
      <div className="scoreboard">
        <p className='time'>Time: {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}</p>
        <p className='rolls'>Rolls: {rolls}</p>
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
