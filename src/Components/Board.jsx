import { useEffect, useState } from "react";
import './Board.css';
const Row = (props) => {

    const { row, rowindex, gameStart, board, playersDetails, currPlayer, SetCurrPlayer, currSize, SetCurrSize,
        SetBoard
    } = props;
    const handleClick = (e) => {
        const tmpBoard = board
        if (!e) return;
        let currRow = Number.parseInt(e.target.attributes.row.nodeValue);
        let currCol = Number.parseInt(e.target.attributes.col.nodeValue);
        console.log(gameStart)
        if (gameStart) {
            console.log("Inside the Handle Click Function..... ")
            console.log(JSON.stringify(playersDetails))
            if (Object.values(playersDetails).length > 0) {
                console.log("Passed the Player Details Object check.... ")
                for (let rindex = 0; rindex < tmpBoard.length; rindex++) {
                    for (let cindex = 0; cindex < tmpBoard[rindex].length; cindex++) {
                        if (rindex == currRow && cindex == currCol) {
                            console.log("Inside the For loop for Setting the Value")
                            if (tmpBoard[rindex][cindex] == "") {
                                if (currPlayer == "Player - 1") {
                                    tmpBoard[rindex][cindex] = playersDetails[currPlayer].type;
                                    SetCurrSize(currSize + 1);
                                    SetCurrPlayer("Player - 2")
                                }
                                else {
                                    tmpBoard[rindex][cindex] = playersDetails[currPlayer].type;
                                    SetCurrSize(currSize + 1)
                                    SetCurrPlayer("Player - 1")
                                }
                            }
                        }
                    }
                }
            }
            SetBoard(tmpBoard)
            console.log(JSON.stringify(board))
        }
    }

    return (
        <div className="row">
            {
                row.map((col, colindex) => (
                    <input readOnly onClick={handleClick} key={`${rowindex}-${colindex}`} disabled={!gameStart} className="cell" row={rowindex} col={colindex} value={col} />
                ))
            }
        </div>
    )
}

const Board = (props) => {
    const { gameStart, StartGame, playersDetails = {}, ResetGame, isGameReset, currPlayer, SetCurrPlayer, SetWinner } = props
    const intialBoard = [["", "", ""], ["", "", ""], ["", "", ""]]
    const [board, SetBoard] = useState(intialBoard)
    const [currSize, SetCurrSize] = useState(0);
    const isPlayersReady = () => {
        for (const obj of Object.values(playersDetails)) {
            if (obj.name === '' || obj.type === '') return false;
        }
        return true;
    }

    useEffect(() => {
        SetBoard(intialBoard)
        SetCurrSize(0)
    }, [isGameReset])

    useEffect(() => {
        if (currSize == 9) {
            let winnerType = ""
            //check first col 
            if (board[0][0] === board[1][0] === board[2][0]) {
                winnerType = board[0][0]
            }
            else if (board[0][1] == board[1][1] == board[2][1]) {
                winnerType = board[0][1]
            }
            else if (board[0][2] == board[1][2] == board[2][2]) {
                winnerType = board[0][2]
            }
            else if (board[0][0] == board[0][1] == board[0][2]) {
                winnerType = board[0][0]
            }
            else if (board[1][0] == board[1][1] == board[1][2]) {
                winnerType = board[1][0]
            }
            else if (board[2][0] == board[2][1] == board[2][2]) {
                winnerType = board[2][0]
            }
            else if (board[0][0] == board[1][1] == board[2][2]) {
                winnerType = board[0][0]
            }
            else if (board[0][2] == board[1][1] == board[2][0]) {
                winnerType = board[0][2]
            }
            for (const obj of Object.values(playersDetails)) {
                if (obj.type == winnerType) {
                    SetWinner(obj.name)
                    break;
                }
            }
            if (winnerType == "") {
                SetWinner("Tie")
            }
        }
    }, [currSize])
    return (
        <div className="board">
            <div className="board_container">
                {
                    board.map((row, index) => (
                        <Row
                            playersDetails={playersDetails}
                            key={`${index}`}
                            row={row}
                            rowindex={index}
                            gameStart={gameStart}
                            board={board}
                            currPlayer={currPlayer}
                            SetCurrPlayer={SetCurrPlayer}
                            SetCurrSize={SetCurrSize}
                            currSize={currSize}
                            SetBoard={SetBoard}
                        />
                    ))
                }
                {
                    (!gameStart) ? <button style={{ marginTop: '1rem' }} disabled={!isPlayersReady()} className="game_button" onClick={() => { StartGame() }} >Start Game</button> : <></>
                }
                <button style={{ marginLeft: '1rem', marginTop: '1rem' }} onClick={() => { ResetGame() }}>Reset</button>
            </div>
        </div>
    )
}

export default Board;