import { useEffect, useState } from "react";
import './Board.css';
const Row = (props) => {

    const { row, rowindex, gameStart, board, playersDetails, currPlayer, SetCurrPlayer, currSize, SetCurrSize,
        SetBoard, gamePause
    } = props;

    const handleClick = (e) => {
        const tmpBoard = board
        if (!e) return;
        let currRow = Number.parseInt(e.target.attributes.row.nodeValue);
        let currCol = Number.parseInt(e.target.attributes.col.nodeValue);
        if (gameStart) {
            console.log("Game Start is is True but got inside of the value change....", gameStart)
            if (Object.values(playersDetails).length > 0) {
                for (let rindex = 0; rindex < tmpBoard.length; rindex++) {
                    for (let cindex = 0; cindex < tmpBoard[rindex].length; cindex++) {
                        if (rindex == currRow && cindex == currCol) {
                            if (tmpBoard[rindex][cindex] === "") {
                                if (gameStart && currPlayer == "Player - 1") {
                                    tmpBoard[rindex][cindex] = playersDetails[currPlayer].type;
                                    SetCurrSize(currSize + 1);
                                    SetCurrPlayer("Player - 2")
                                }
                                else if (gameStart) {
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
        }
    }

    return (
        <div className="row">
            {
                row.map((col, colindex) => (
                    <input readOnly onClick={(e) => {
                        if (gameStart) {
                            handleClick(e)
                        }
                    }} key={`${rowindex}-${colindex}`} disabled={!gameStart || gamePause} className="cell" row={rowindex} col={colindex} value={col} />
                ))
            }
        </div>
    )
}

const Board = (props) => {
    const { gameStart, StartGame, playersDetails = {}, ResetGame, isGameReset, currPlayer, SetCurrPlayer, SetWinner } = props
    const intialBoard = [["", "", ""], ["", "", ""], ["", "", ""]]
    const [board, SetBoard] = useState(intialBoard)
    const [gamePause, SetGamePause] = useState(false)
    const [currSize, SetCurrSize] = useState(0);
    const isPlayersReady = () => {
        for (const obj of Object.values(playersDetails)) {
            if (obj.name === '' || obj.type === '') return false;
        }
        return true;
    }
    const [xplayer, SetXPlayer] = useState("")
    const [oplayer, SetOPlayer] = useState("")

    useEffect(() => {
        for (const obj of Object.values(playersDetails)) {
            if (obj.type != "") {
                if (obj.type == "X") {
                    SetXPlayer(obj.name)
                }
                else if (obj.type == "O") {
                    SetOPlayer(obj.name)
                }
            }
        }
    }, [playersDetails])

    useEffect(() => {
        SetBoard(intialBoard)
        SetCurrSize(0)
        SetGamePause(false)
    }, [isGameReset])
    useEffect(() => {
        SetGamePause(false)
    }, [gameStart])

    const isWinner = (playerType) => {
        //first row 
        if (board[0][0] === playerType) {
            if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][2] === board[0][0]) return true;
        }
        // second row 
        if (board[1][0] === playerType) {
            if (board[1][0] === board[1][1] && board[1][1] === board[1][2] === board[1][2] === board[1][0]) return true;
        }
        // third row 
        if (board[2][0] === playerType) {
            if (board[2][0] === board[2][1] && board[2][1] == board[2][2] && board[2][2] === board[2][0]) return true;
        }
        // first col 
        if (board[0][0] === playerType) {
            if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[2][0] === board[0][0]) return true;
        }
        // second col 
        if (board[0][1] === playerType) {
            if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[2][1] === board[0][1]) return true;
        }
        // third col 
        if (board[0][2] === playerType) {
            if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[2][2] === board[0][2]) return true;
        }
        // left diagnol
        if (board[0][0] === playerType) {
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] == board[0][0]) return true;
        }
        // right diagnol
        if (board[0][2] === playerType) {
            if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] === board[0][2]) return true;
        }
        return false;
    }

    useEffect(() => {
        const xPlayer = isWinner("X")
        const oPlayer = isWinner("O")
        console.log("xplayer", xPlayer)
        console.log('oplayer', oPlayer)
        if (xPlayer && oPlayer) {
            SetWinner("Tie")
            SetGamePause(true)
        }
        else if (currSize === 9 && xPlayer === false && oPlayer === false) {
            SetWinner("Tie")
            SetGamePause(true)
        }
        else {
            if (xPlayer) {
                SetWinner(xplayer)
                SetGamePause(true)
            }
            else if (oPlayer) {
                SetWinner(oplayer)
                SetGamePause(true)
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
                            gamePause={gamePause}

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