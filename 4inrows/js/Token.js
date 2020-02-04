class Token {
    constructor(index, owner){
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

    get htmlToken() {
        return document.getElementById(this.id);
    }
    
    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }

    drawHTMLToken(){
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }

    /* moving token left - 76 is how wide is one column in px */
    moveLeft() {
        if (this.columnLocation > 0) {
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation -= 1;
        }
    }
 
    /* moving token right - 76 is how wide is one column in px */
    moveRight(columns) {
        if (this.columnLocation < columns - 1) {
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation += 1;
        }
    }

    /* drop the bass... ekhm token */
    dropToken(target, reset) {
        this.dropped = true;
        /*animation of dropping token */
        $(this.htmlToken).animate({top: (target.y * target.diameter)}, 990, 'easeOutBounce', reset);
    }
}