import { useEffect, useState } from "react";
import './Board.css';
const Row = ({ row, rowindex, gameStart }) => {

    return (
        <div className="row">
            {
                row.map((col, colindex) => (
                    <input key={`${rowindex}-${colindex}`} disabled={!gameStart} className="cell" row={rowindex} col={colindex} value={col} />
                ))
            }
        </div>
    )
}

const Board = ({ gameStart, StartGame, userData = {},ResetGame,isGameReset}) => {
    const intialBoard = [["", "", ""], ["", "", ""], ["", "", ""]]
    const [board, SetBoard] = useState(intialBoard)
    const isPlayersReady = () => {
        if (userData) {
            for (const obj of Object.values(userData)) {
                if(obj.name == "" || obj.type == "") return false;
            }
        }
        return true;
    }
    useEffect(()=>{
        SetBoard(intialBoard)
    },[isGameReset])
    return (
        <div className="board">
            <div className="board_container">
                {
                    board.map((row, index) => (
                        <Row  key={`${index}`} row={row} rowindex={index} gameStart={gameStart}/>
                    ))
                }
                <button disabled={!isPlayersReady()} className="game_button" onClick={() => { StartGame() }} >Start Game</button>
                <button onClick={()=>{ResetGame()}}>Reset</button>
            </div>
        </div>
    )
}

export default Board;