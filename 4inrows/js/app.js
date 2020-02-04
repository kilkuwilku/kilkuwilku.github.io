const game = new Game();

document.getElementById('begin-game').addEventListener('click', function() {
    game.startGame();
    this.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
    document.getElementById('logo').style.opacity = "0";
    });

    /* listen for key events */
    document.addEventListener('keydown', function(e){
        game.handleKeydown(e);
    });