Game.prototype.keyBoardListener = function () {
    this.keyup = e => this.key.onKeyUp(e);
    this.keydown = e => this.key.onKeyDown(e);
    document.addEventListener("keyup", this.keyup, false);
    document.addEventListener("keydown", this.keydown, false);
};

Game.prototype.key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68,

    isDown: function (keyCode) {
        return this._pressed[keyCode];
    },

    onKeyDown: function (e) {
        this._pressed[e.keyCode] = true;
    },

    onKeyUp: function (e) {
        delete this._pressed[e.keyCode];
    }
};