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
  const [isGameReset, SetGameReset] = useState(false)
  const ResetGame = () => {
    SetUserData({...intialData})
    SetGameReset(true)
    SetGameStart(false)
  }
  const StartGame = ()=>{
    SetGameStart(true)
    SetGameReset(false)
  }
  return (
    <>
      <Header />
      <Players userData={userData} gameStart={gameStart} SetUserData={SetUserData} isGameReset={isGameReset} SetGameReset={SetGameReset} />
      <Board gameStart={gameStart} StartGame={StartGame} userData={userData} ResetGame={ResetGame} isGameReset={isGameReset} />
    </>
  )
}

export default App
