import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Components/Header'
import './App.css'
import Players from './Components/Players'
import Board from './Components/Board'

function App() {
  const intialData = {
    "Player - 1": {
      name: "",
      type: ""
    },
    "Player - 2": {
      name: "",
      type: ""
    }
  }
  const [userData, SetUserData] = useState(intialData)
  const [gameStart, SetGameStart] = useState(false)
  const [isGameReset, GameReset] = useState(false)
  const ResetGame = () => {
    SetUserData(intialData)
    GameReset(true)
    SetGameStart(false)
  }
  return (
    <>
      <Header />
      <Players userData={userData} SetUserData={SetUserData} isGameReset={isGameReset} />
      <Board gameStart={gameStart} SetGameStart={SetGameStart} userData={userData} ResetGame={ResetGame} isGameReset={isGameReset} />
    </>
  )
}

export default App
