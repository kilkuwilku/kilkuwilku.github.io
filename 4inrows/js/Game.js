class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }
     /* return active players */
     get activePlayer() {
        return this.players.find(player => player.active);
    }  
    /**Creating 2 new players */
    createPlayers() {
        const players = [new Player('Player 1', 1, '#E5D4CE', true),
                         new Player('Player 2', 2, '#7FD1B9')];
        return players;
    }


    
    /* Prepare the game */
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeTokens.drawHTMLToken();
        this.ready = true;
    }

    /* listening for key events*/
    handleKeydown(e) {
        if (this.ready) {
            if (e.key === "ArrowLeft") {
                this.activePlayer.activeTokens.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.activePlayer.activeTokens.moveRight(this.board.columns);
            } else if (e.key === "ArrowDown") {
                this.playToken();
            }
        }
    }

    playToken(){
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeTokens;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;
        for (let space of targetColumn) {
            if (space.token === null) {
                targetSpace = space;
            }
        }
        if (targetSpace !== null) {
            const game = this;
            game.ready = false;
            activeToken.dropToken(targetSpace, function(){
                game.updateGameState(activeToken, targetSpace);
            });
        }
    }

    updateGameState(token, target) {
        target.mark(token);
        if (!this.checkForWin(target)) {
            this.switchPlayer();
            if (this.activePlayer.checkTokens()) {
                this.activePlayer.activeTokens.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver('You waste all your tokens!');
            }
        } else {
            this.gameOver(`${target.owner.name} wins the game!`)
        }
    }

    /*Check if there a winner on the board after each token drop */

    checkForWin(target){
        const owner = target.token.owner;
        let win = false;

        // vertical
        for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x][y+1].owner === owner &&
                    this.board.spaces[x][y+2].owner === owner &&
                    this.board.spaces[x][y+3].owner === owner) {
                        win = true;
                }
            }
        }

        // horizontal
        for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x+1][y].owner === owner &&
                    this.board.spaces[x+2][y].owner === owner &&
                    this.board.spaces[x+3][y].owner === owner) {
                        win = true;
                }
            }
        }

        // diagonal1
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x-1][y+1].owner === owner &&
                    this.board.spaces[x-2][y+2].owner === owner &&
                    this.board.spaces[x-3][y+3].owner === owner) {
                        win = true;
                }
            }
        }

        // diagonal2
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x-1][y-1].owner === owner &&
                    this.board.spaces[x-2][y-2].owner === owner &&
                    this.board.spaces[x-3][y-3].owner === owner) {
                        win = true;
                }
            }
        }

        return win;
    }

    /*switching player function*/

    switchPlayer() {
        for (let player of this.players) {
            player.active = player.active === true ? false : true;
        }
    }

    /*display game over message*/

    gameOver(message) {
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('game-over').textContent = message;
        document.getElementById('new-game').style.display = 'block';
        document.getElementById('new-game').addEventListener('click', function() {
            location.reload();
        });
    }
}