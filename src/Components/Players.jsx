import { useState } from "react"
import './Players.css'

const Player = ({ gameReset, input_text }) => {

    const [name, SetName] = useState("")
    const [isConfirm, SetConfirm] = useState(false)

    return (
        <h2>
            <input disabled={(gameReset) ? false : isConfirm} type="text" name="name" id="" value={name} onChange={(e) => { SetName(e.target.value) }} placeholder={input_text} />
            <button onClick={() => { SetConfirm(true) }}>Ok</button>
        </h2>
    )
}

const Players = ({gameReset}) => {

    return (
        <div className="players">
            <Player input_text="Player - 1" gameReset={gameReset}/>
            <Player input_text="Player - 2"  gameReset={gameReset}/>
        </div>
    )
}
export default Players;