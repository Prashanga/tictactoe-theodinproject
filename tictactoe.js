let numOfMoves = 0
let winner = ''

const Player = (name, sign) => {
    let moves = [0,0,0,0,0,0,0,0,0]
    const getName = () => name
    const getSign = () => sign
    const getMoves = () => moves

    const makeMove = (pos) => {
        moves[pos] = 1
    }

    const resetMoves = () => {
        moves = [0,0,0,0,0,0,0,0,0]
    }

    return { getName, getSign, getMoves, makeMove, resetMoves }
}


const GameBoard = (() => {
    let gameBoard = [0,0,0,0,0,0,0,0,0]
    let player1 = null
    let player2 = null
    let currentPlayer = null

    const checkBoard = (index) => {
        return gameBoard[index]
    }
    
    const setBoard = (index) => {
        gameBoard[index] = 1
    }

    const addPlayers = (one, two) => {
        player1 = one
        player2 = two
        currentPlayer = Math.random() < 0.5 ? player1 : player2
    }
    
    const getCurrentPlayer = () => {
        return currentPlayer
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer == player1 ? player2 : player1
    }

    const checkVictory = (player) => {
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
               changeWinnerTitle(`${player.getName()} wins`)
               winner = player.getName()
               return
           }

           else {
               console.log("Not yet won")
           }
        })
    }

    const changeWinnerTitle = (text) => {
        document.getElementById('winner-text').innerHTML = text
    }

    const resetGameboard = () => {
        gameBoard = [0,0,0,0,0,0,0,0,0]
        player1.resetMoves()
        player2.resetMoves()
        changeWinnerTitle('')

    }

    return {
        addPlayers,
        checkBoard,
        getCurrentPlayer,
        checkVictory,
        changePlayer,
        changeWinnerTitle,
        resetGameboard,
        setBoard
    }
    
})()

const makeAmove = (value) => {
  
    if(winner.length > 0) return
    if(numOfMoves === 8){
       GameBoard.changeWinnerTitle("Its a tie")
    }
    if(numOfMoves > 8 ) return
   
    let board = value.target
    // Do nothing if the board already filled
    if(GameBoard.checkBoard(board.id) === 1) return

    let currentPlayer = GameBoard.getCurrentPlayer()
    board.innerHTML = currentPlayer.getSign()
    currentPlayer.makeMove(board.id)

    GameBoard.setBoard(board.id)
    GameBoard.checkVictory(currentPlayer)
    GameBoard.changePlayer()

    numOfMoves += 1
    
}

const startGame = () => {
    document.location.hash = 'home'
    
    let numPlayers = parseInt(document.querySelector('input[name="numPlayers"]:checked').value)
    let gameDifficulty = document.querySelector('input[name="difficulty"]:checked').value
    let playerOneName = document.getElementById('player1name').value || 'Player 1'
    let playerTwoName = document.getElementById('player2name').value || 'Player 2'

    if(numPlayers === 1 && playerTwoName == 'Player 2') playerTwoName = 'Computer'

    GameBoard.addPlayers(Player(playerOneName, "X"), Player(playerTwoName, "O"))
    
    for(let i=0; i<=8; i++) {
        document
            .getElementById(i)
            .addEventListener('click', makeAmove)
    }
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
}
const restartGame = () => {
    resetGame()
    document.location.hash = 'new-game'
}

