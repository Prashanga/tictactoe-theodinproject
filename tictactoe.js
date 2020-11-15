let numOfMoves = 0
let winner = ''

const Player = (name, sign, number) => {
    let moves = [0,0,0,0,0,0,0,0,0]
    const getName = () => name
    const getSign = () => sign
    const getNumber = () => number
    const getMoves = () => moves

    const makeMove = (pos) => {
        moves[pos] = 1
    }

    const resetMoves = () => {
        moves = [0,0,0,0,0,0,0,0,0]
    }

    return { getName, getSign, getMoves, makeMove, resetMoves, getNumber }
}

const GameBoard = (() => {
    let gameBoard = [0,0,0,0,0,0,0,0,0]
    let player1 = null
    let player2 = null
    let currentPlayer = null
    let numPlayers = null
    // let gameOver = false

    const changeScoreTitle = (text) => {
        document.getElementById('score-text').innerHTML = text
    }

    const getCurrentPlayer = () => currentPlayer
    
    const initialise = (numplayers, playerOneName, playerTwoName) => {
        numPlayers = numplayers
        player1 = Player(playerOneName, "X", 1)
        player2 =  Player(playerTwoName, "O", 2)
        currentPlayer = Math.random() < 0.5 ? player1 : player2
        changeScoreTitle(`${getCurrentPlayer().getName()}'s turn`)
    }

    const getNumPlayers = () => numPlayers

    const checkBoard = (index) => gameBoard[index]

    const gameOver = () => {
        if(numOfMoves >= 9 || winner.length > 0) return true
        else return false
    }

    const setBoard = (index) => {
        gameBoard[index] = 1
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer == player1 ? player2 : player1
    }
    
    const makePlayerMove = (pos) => {

        if(gameOver()) return
        numOfMoves += 1
        if(currentPlayer == player1) player1.makeMove(pos)
        else player2.makeMove(pos)
        document.getElementById(pos).innerHTML = currentPlayer.getSign()
        setBoard(pos)

        if(checkVictory(currentPlayer))  {
            winner = currentPlayer.getName()
            changeScoreTitle(`${currentPlayer.getName()} wins`)
        }
        else{
            changePlayer()
            changeScoreTitle(`${getCurrentPlayer().getName()}'s turn`)
            if(numOfMoves === 9) changeScoreTitle("Its a tie")
        }
        
    }

    const checkVictory = (player) => {

        let win = false
        const victoryMoves = [
            [1,1,1,-1,-1,-1,-1,-1,-1],
            [1,-1,-1,1,-1,-1,1,-1,-1],
            [1,-1,-1,-1,1,-1,-1,-1,1],
            [-1,1,-1,-1,1,-1,-1,1,-1],
            [-1,-1,1,-1,1,-1,1,-1,-1],
            [-1,-1,1,-1,-1,1,-1,-1,1],
            [-1,-1,-1,1,1,1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,1,1,1]
        ]
        let playerMoves = player.getMoves()

        victoryMoves.forEach( victoryMove => {
           let value = playerMoves.reduce((sum, current, index) => {
               if(current === victoryMove[index]){
                   return sum += 1
               }
               else return sum
           }, 0)

           if( value === 3) {
               win = true
           }
        })

        return win
    }

    const resetGameboard = () => {
        gameBoard = [0,0,0,0,0,0,0,0,0]
        player1.resetMoves()
        player2.resetMoves()
        currentPlayer = Math.random() < 0.5 ? player1 : player2
        changeScoreTitle(`${getCurrentPlayer().getName()}'s turn`)
    }

    return {
        checkBoard,
        checkVictory,
        changePlayer,
        initialise,
        gameOver,
        getCurrentPlayer,
        makePlayerMove,
        getNumPlayers,
        resetGameboard,
        setBoard
    }
    
})()

const makePlayermove = (value) => {

    let id = value.target.id
    // Do nothing if the board already filled
    if(GameBoard.checkBoard(id) === 1) return
    GameBoard.makePlayerMove(id)

    // numOfMoves += 1
    if(GameBoard.getNumPlayers() === 1 && !GameBoard.gameOver()) makeComputerMove()

}

const makeComputerMove = () => {

    while(true){
        let randomPosition = Math.floor(Math.random() * 9)
        if(GameBoard.checkBoard(randomPosition) === 0) {
            window.setTimeout(() => {
                GameBoard.makePlayerMove(randomPosition)
            }, 800)

            return
        }
    }

}

const startGame = () => {
    document.location.hash = 'home'
    
    let numPlayers = parseInt(document.querySelector('input[name="numPlayers"]:checked').value)
    let gameDifficulty = document.querySelector('input[name="difficulty"]:checked').value
    let playerOneName = document.getElementById('player1name').value || 'Player 1'
    let playerTwoName = document.getElementById('player2name').value || 'Player 2'

    if(numPlayers === 1 && playerTwoName == 'Player 2') {
        playerTwoName = 'Computer'
    }

    GameBoard.initialise(numPlayers, playerOneName, playerTwoName)
    
    for(let i=0; i<=8; i++) {
        document
            .getElementById(i)
            .addEventListener('click', makePlayermove)
    }

    if(numPlayers === 1 && GameBoard.getCurrentPlayer().getNumber() == 2)   makeComputerMove()

    // Last
    document.querySelector('form').reset()
}

const resetGame = () => {
    numOfMoves = 0
    winner = ''
    GameBoard.resetGameboard()

    for(let i=0; i<=8; i++) {
        document.getElementById(i).innerHTML = ''
    }
    if(GameBoard.getNumPlayers() === 1 && GameBoard.getCurrentPlayer().getNumber() == 2)   makeComputerMove()
}
 
const restartGame = () => {
    resetGame()
    document.location.hash = 'new-game'
}

