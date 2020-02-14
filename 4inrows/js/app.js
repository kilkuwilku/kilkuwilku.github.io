const game = new Game();
/* how to play click event*/
document.getElementById('how-to-play').addEventListener('click', function() {
    transition.begin(logo, [
            "opacity 1 0 .2s linear 0s"
        ], {
            onTransitionEnd: function(logo, finished) {
                if (finished) {
                    transition.begin(howtoplay, [
                        "opacity 0 1 .2s linear 0s"
                    ]);
            }
            }
        }
        )
}, {once : true});
document.getElementById('begin-game').addEventListener('click', function() {
    game.startGame();
    this.style.transition = 'opacity 1s ease-in';
    this.style.opacity = '0';
    document.getElementById('how-to-play').style.transition = 'opacity 1s ease-in';
    document.getElementById('how-to-play').style.opacity = '0';
    document.getElementById('howtoplay').style.transition = 'opacity 1s ease-in';
    document.getElementById('howtoplay').style.opacity = '0';
    document.getElementById('play-area').style.transition = 'opacity 1s ease-in';
    document.getElementById('play-area').style.opacity = '1';
    document.getElementById('logo').style.transition = 'opacity 1s ease-in';
    document.getElementById('logo').style.opacity = '0';
    document.getElementById('logo-crow').style.transition = 'opacity 1s ease-in';
    document.getElementById('logo-crow').style.opacity = '1';
  });

    /* listen for key events */
    document.addEventListener('keydown', function(e){
        game.handleKeydown(e);
    });

    /* button 'left' clickEvent */
    document.getElementById('left').addEventListener('click', function(){
        game.clickEventsLeft();
    });

    /* button 'right' clickEvent */
        document.getElementById('right').addEventListener('click', function(){
            game.clickEventsRight();
        });

        /* button 'down' clickEvent */
    document.getElementById('down').addEventListener('click', function(){
        game.clickEventsDown();
    });