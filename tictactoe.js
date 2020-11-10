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
    const player1 = Player("Pras", "X")
    const player2 = Player("AI", "O")
    let numOfMoves = 0
    let winner = ''

    if(winner.length > 0 ) return

    const getCurrentPlayer = () => {
        if(numOfMoves % 2 === 0 ) return player1
        else return player2
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

    makeAmove = (value) => {
        let board = value.target
        // Do nothing if the board already filled
        if(gameBoard[board.id] === 1) return

        let currentPlayer = getCurrentPlayer()
        board.innerHTML = currentPlayer.getSign()
        currentPlayer.makeMove(board.id)
        gameBoard[board.id] = 1

        checkVictory(currentPlayer)

        //Last
        numOfMoves += 1
    }

    for(let i=0; i<=8; i++) {
        document
            .getElementById(i)
            .addEventListener('click', makeAmove)
    }
    

})()