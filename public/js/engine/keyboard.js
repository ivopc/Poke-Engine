Game.prototype.timers = {};

Game.prototype.keys = {
    "up": true,
    "right": true,
    "down": true,
    "left": true
};

Game.prototype.treatKey = {
    37: "left",
    65: "left",
    38: "up",
    87: "up",
    39: "right",
    68: "right",
    40: "down",
    83: "down"
};

Game.prototype.keyBoardListener = function () {
    $(document)
        .on("keydown", e => this.keyDown(e))
        .on("keyup",  e =>this.keyUp(e))
        .on("blur", e => this.blur(e));
};
Game.prototype.keyDown = function (e) {
    const key = this.treatKey[e.keyCode || e.which];

    if (!(key in this.keys) || (key in this.timers))
        return;

    this.timers[key] = null;
    this.walkToDirection.apply([this, key, e]);
    this.timers[key] = setInterval(this.walkToDirection.bind([this, key, e]), 0);
    e.preventDefault();
};

Game.prototype.keyUp = function (e) {
    const key = this.treatKey[e.keyCode || e.which];

    if (key in this.timers) {
        clearInterval(this.timers[key]);
        delete this.timers[key];
    };
};

Game.prototype.blur = function (e) {
    
    for (let i in this.timers)
        if (i) clearInterval(this.timers[i]);

    this.timers = {};
};

Game.prototype.walkToDirection = function () {
    if (!this[0].mapLoaded) return;

    this[0].doMovement({
        type: 0,
        dir: this[1]
    });

    return this[2].preventDefault();
};