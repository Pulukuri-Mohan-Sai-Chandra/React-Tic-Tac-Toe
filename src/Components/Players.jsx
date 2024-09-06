import { useEffect, useState } from "react"
import './Players.css'

const Player = ({ isGameReset, input_text, userData, SetUserData, gameStart, SetGameReset }) => {

    const [name, SetName] = useState("")
    const [isConfirm, SetConfirm] = useState(false)
    const initialOptions = [{
        name: "Choose your option",
        value: ""
    }, {
        name: "X",
        value: "X"
    }, {
        name: "O",
        value: "O"
    }]

    useEffect(()=>{
        if(isGameReset){
            SetName("")
            SetConfirm(false)
        }
    },[isGameReset])
    const [options, SetOptions] = useState(initialOptions)
    const isValid = (option) => {
        if (userData) {
            for (const userObj of Object.values(userData)) {
                if (userObj.type != "") {
                    if (userObj.type === option.value) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    const isEditable = () => {
        if (gameStart) return true;
        return isConfirm;
    }
    return (
        <h2>
            <input disabled={isEditable()} type="text" name="name" id="" value={name} onChange={(e) => { 
                SetName(e.target.value)
                SetGameReset(false)
             }} placeholder={input_text} />
            <select disabled={isEditable()} onChange={(e) => SetUserData({ ...userData, [input_text]: { name: userData[input_text].name, type: e.target.value } })} value={userData[input_text].type}>
                {
                    options.map((option, index) => (
                        <option disabled={isValid(option)} key={index} value={option.value}>{option.name}</option>
                    ))
                }
            </select>
            <button disabled={isEditable()} onClick={() => {
                SetConfirm(true)
                SetUserData({
                    ...userData, [input_text]: {
                        name: name,
                        type: userData[input_text].type
                    }
                })
            }}>Ok</button>

        </h2>
    )
}

const Players = ({ isGameReset, userData, SetUserData, SetGameReset, gameStart }) => {

    return (
        <div className="players">
            <Player input_text="Player - 1" userData={userData} SetUserData={SetUserData} isGameReset={isGameReset} SetGameReset={SetGameReset} gameStart={gameStart} />
            <Player input_text="Player - 2" userData={userData} SetUserData={SetUserData} isGameReset={isGameReset} SetGameReset={SetGameReset} gameStart={gameStart} />
        </div>
    )
}
export default Players;