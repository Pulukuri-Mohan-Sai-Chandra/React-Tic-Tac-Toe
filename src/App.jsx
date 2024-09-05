import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Components/Header'
import './App.css'
import Players from './Components/Players'

function App() {
  const [userData, SetUserData] = useState({
    "Player - 1": {
      name: "",
      type: ""
    },
    "Player - 2": {
      name: "",
      type: ""
    }
  })
  return (
    <>
      <Header />
      <Players userData={userData} SetUserData={SetUserData} />
    </>
  )
}

export default App
