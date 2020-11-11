let numOfMoves = 0
let winner = ''

const Player = (name, sign) => {
    const moves = [0,0,0,0,0,0,0,0,0]
    const getName = () => name
    const getSign = () => sign
    const getMoves = () => moves

    const makeMove = (pos) => {
        moves[pos] = 1
    }

    return { getName, getSign, getMoves, makeMove }
}


const GameBoard = (() => {
    const gameBoard = [0,0,0,0,0,0,0,0,0]
    let player1 = null
    let player2 = null
    let currentPlayer = null

    //let currentPlayer =  Math.random() < 0.5 ? player1 : player2
    
    const addPlayers = (one, two) => {
        player1 = one
        player2 = two
        currentPlayer = Math.random() < 0.5 ? player1 : player2
    }
    
    const getCurrentPlayer = () => {
        return currentPlayer
    }

    const changePlayer = () => {
        if(currentPlayer == player1) currentPlayer = player2
        else currentPlayer = player1
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
               console.log(`${player.getName()} wins`)
               winner = player.getName()
               return
           }

           else {
               console.log("Not yet won")
           }
        })
    }

    return {
        addPlayers,
        gameBoard,
        getCurrentPlayer,
        checkVictory,
        changePlayer
    }
    
})()

const makeAmove = (value) => {
    if(winner.length > 0) return
    if(numOfMoves === 9) console.log("Game Tied")

    let board = value.target
    // Do nothing if the board already filled
    if(GameBoard.gameBoard[board.id] === 1) return

    let currentPlayer = GameBoard.getCurrentPlayer()
    board.innerHTML = currentPlayer.getSign()
    currentPlayer.makeMove(board.id)
    GameBoard.gameBoard[board.id] = 1

    GameBoard.checkVictory(currentPlayer)

    GameBoard.changePlayer()

    //Last
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
    


    // Last
    document.querySelector('form').reset()
}

for(let i=0; i<=8; i++) {
    document
        .getElementById(i)
        .addEventListener('click', makeAmove)
}

