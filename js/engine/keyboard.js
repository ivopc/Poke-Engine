Game.prototype.timers = {};

Game.prototype.keys = {
    "up": 1,
    "right": 1,
    "down": 1,
    "left": 1
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
        .on("keydown", this.keyDown.bind(this))
        .on("keyup", this.keyUp.bind(this))
        .on("blur", this.blur.bind(this));
};
Game.prototype.keyDown = function (evt) {
    var key = this.treatKey[evt.keyCode || evt.which];

    if (!(key in this.keys) || (key in this.timers))
        return;

    this.timers[key] = null;
    this.walkToDirection.apply([this, key, evt]);
    this.timers[key] = setInterval(this.walkToDirection.bind([this, key, evt]), 0);
    evt.preventDefault();
};

Game.prototype.keyUp = function (evt) {
    var key = this.treatKey[evt.keyCode || evt.which];

    if (key in this.timers) {
        clearInterval(this.timers[key]);
        delete this.timers[key];
    };
};

Game.prototype.blur = function (evt) {
    for (var i in this.timers)
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