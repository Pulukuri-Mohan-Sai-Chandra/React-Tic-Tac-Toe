import { useState } from "react"
import './Players.css'

const Player = ({ gameReset, input_text, userData, SetUserData }) => {

    const [name, SetName] = useState("")
    const [isConfirm, SetConfirm] = useState(false)
    const options = [{
        name: "Choose your option",
        value: ""
    }, {
        name: "X",
        value: "X"
    }, {
        name: "O",
        value: "O"
    }]
    const isValid = (option)=>{
        if(userData){
            for(const userObj of Object.values(userData)){
                if(userObj.type != ""){
                    if(userObj.type === option.value){
                        return true;
                    }
                }
            }
        }
        return false;
    }
    return (
        <h2>
            <input disabled={(gameReset) ? false : isConfirm} type="text" name="name" id="" value={name} onChange={(e) => { SetName(e.target.value) }} placeholder={input_text} />
            <select disabled={(gameReset)?false:isConfirm} onChange={(e) => SetUserData({...userData,input_text:{name:userData[input_text].name,type:e.target.value}})}>
                {
                    options.map((option,index)=>(
                        <option disabled={isValid(option)} key={index} value={option.value}>{option.name}</option>
                    ))
                }
            </select>
            <button onClick={() => { SetConfirm(true) }}>Ok</button>

        </h2>
    )
}

const Players = ({ gameReset, userData, SetUserData }) => {
    return (
        <div className="players">
            <Player input_text="Player - 1" gameReset={gameReset} userData={userData} SetUserData={SetUserData} />
            <Player input_text="Player - 2" gameReset={gameReset} userData={userData} SetUserData={SetUserData} />
        </div>
    )
}
export default Players;