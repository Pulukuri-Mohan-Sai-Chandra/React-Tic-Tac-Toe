import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Components/Header'
import './App.css'
import Players from './Components/Players'
import Board from './Components/Board'
import ErrorBoundary from './Components/ErrorBoundary'
import crownImage from '../public/crown.png'

function App() {
  const [gameStart, SetGameStart] = useState(false)
  const [isGameReset, SetGameReset] = useState(false)
  const [playersDetails, SetPlayersDetails] = useState({})
  const [currPlayer, SetCurrPlayer] = useState("Player - 1")
  const [winner, SetWinner] = useState("");
  const ResetGame = () => {
    SetGameReset(true)
    SetGameStart(false)
    SetWinner("")
  }
  const StartGame = () => {
    SetGameStart(true)
    SetGameReset(false)
    SetWinner("")
  }
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Players
          gameStart={gameStart}
          isGameReset={isGameReset}
          SetGameReset={SetGameReset}
          SetPlayersDetails={SetPlayersDetails}
          currPlayer={currPlayer}
          SetCurrPlayer={SetCurrPlayer}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <Board
          gameStart={gameStart}
          StartGame={StartGame}
          ResetGame={ResetGame}
          isGameReset={isGameReset}
          playersDetails={playersDetails}
          currPlayer={currPlayer}
          SetCurrPlayer={SetCurrPlayer}
          SetWinner={SetWinner}
        />
        <div className="results">
          {
            (winner != "") ? <h1>Winner 👑: {winner}</h1> : <></>
          }
        </div>
      </ErrorBoundary>
    </>
  )
}

export default App
