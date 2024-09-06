import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Components/Header'
import './App.css'
import Players from './Components/Players'
import Board from './Components/Board' 
import ErrorBoundary from './Components/ErrorBoundary'

function App() {

  const [gameStart, SetGameStart] = useState(false)
  const [isGameReset, SetGameReset] = useState(false)
  const [playersDetails,SetPlayersDetails] = useState({})
  const ResetGame = () => {
    SetGameReset(true)
    SetGameStart(false)
  }
  const StartGame = () => {
    SetGameStart(true)
    SetGameReset(false)
  }
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Players
        gameStart={gameStart} 
        isGameReset={isGameReset} 
        SetGameReset={SetGameReset} 
        SetPlayersDetails = {SetPlayersDetails}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <Board 
        gameStart={gameStart} 
        StartGame={StartGame} 
        ResetGame={ResetGame} 
        isGameReset={isGameReset} 
        playersDetails={playersDetails}
        />
      </ErrorBoundary>
    </>
  )
}

export default App
