
function moveLeft() {
	if (this.columnLocation > 0) {
		this.htmlToken.style.left = this.offsetLeft - 76;
		this.columnLocation -= 1;
	}
}

/* left */
document.getElementById("left").addEventListener("click", function () {
	Game.activePlayer.activeTokens.moveLeft();
    });

/* right */
key.addEventListener("keyright", function(e) {
	if (e.keyCode === 39) {
	 Console.log("right");
	}
  });

  /* down */
key.addEventListener("keydown", function(event) {
	if (event.keyCode === 40) {
	 Console.log("down");
	}
  });