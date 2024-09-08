import { useEffect, useState } from "react"
import './Players.css'

const Player = (props) => {
    const { input_text, playersData, SetPlayersData, SetGameReset, isGameReset, currPlayer, gameStart} = props;
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
    useEffect(() => {
        if (isGameReset) {
            SetConfirm(false)
        }
    }, [isGameReset])
    const [isConfirm, SetConfirm] = useState(false);
    const [options, SetOptions] = useState(initialOptions)
    const isValid = (option) => {
        if (playersData) {
            for (const userObj of Object.values(playersData)) {
                if (userObj.type != "") {
                    if (userObj.type === option.value) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    const handleChange = (e) => {
        switch (e.target.name) {
            case 'name':
                SetPlayersData({
                    ...playersData, [input_text]: {
                        name: e.target.value,
                        type: playersData[input_text].type
                    }
                })
                break;
            case 'type':
                SetPlayersData({
                    ...playersData,
                    [input_text]: {
                        name: playersData[input_text].name,
                        type: e.target.value
                    }
                })
                break;
        }
    }
    const getComputedStyles = () => {
        if (gameStart) {
            if (input_text === currPlayer) {
                return { border: '2px solid #16423c',
                    padding:"1rem"
                 }
            }
        }

        return {}
    }
    return (
        <h2 style={getComputedStyles()}>
            <input
                disabled={isConfirm}
                type="text" name="name"
                id=""
                value={playersData[input_text].name}
                onChange={(e) => {
                    handleChange(e)
                    SetGameReset(false)
                }} placeholder={input_text} />
            <select
                name="type"
                disabled={isConfirm}
                onChange={(e) => {
                    handleChange(e)
                    SetGameReset(false);
                }} value={playersData[input_text].type}>
                {
                    options.map((option, index) => (
                        <option
                            disabled={isValid(option)}
                            key={index}
                            value={option.value}
                        >
                            {option.name}
                        </option>
                    ))
                }
            </select>
            <button
                disabled={isConfirm}
                onClick={() => {
                    SetConfirm(true)
                }}>Ok</button>

        </h2>
    )
}

const Players = (props) => {

    const { isGameReset, SetGameReset, gameStart, SetPlayersDetails,currPlayer} = props

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
    const [playersData, SetPlayersData] = useState(intialData);
    useEffect(() => {
        if (isGameReset) {
            SetPlayersData(intialData)
        }
    }, [isGameReset])
    useEffect(() => {
        SetPlayersDetails(playersData)
    }, [playersData])
    return (
        <div className="players">
            <Player
                input_text="Player - 1"
                playersData={playersData}
                SetPlayersData={SetPlayersData}
                SetGameReset={SetGameReset}
                gameStart={gameStart}
                isGameReset={isGameReset}
                currPlayer={currPlayer}
            />
            <Player
                input_text="Player - 2"
                playersData={playersData}
                SetPlayersData={SetPlayersData}
                SetGameReset={SetGameReset}
                gameStart={gameStart}
                isGameReset={isGameReset}
                currPlayer={currPlayer}
            />
        </div>
    )
}
export default Players;