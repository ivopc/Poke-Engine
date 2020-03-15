const Character = function (game, x, y, facing, data) {
    this.position = {
        x,
        y,
        facing
    };

    this.game = game; 

    data = data || {};

    this.character = data.character || "red";
    this.type = data.type;
    this.stepFlag = 0;
};

// Add character to scene
Character.prototype.addToScene = function () {
    this.$el = document.createElement("div");
    this.$el.setAttribute("class", `${this.character} ${this.character}_${this.position.facing}`);

    // putting position according to tile size
    this.$el.style.left = this.position.x * this.game.tileSize + "px";
    this.$el.style.top = this.position.y * this.game.tileSize + "px";

    // if is an online player
    if (this.type == 1)
        this.$el.setAttribute("online", true);

    this.game.$world.append(this.$el);
};

// Move character (walk)
Character.prototype.walk = function (direction, callback) {


    if (this.isPlayer) {
        if (this.walkInProgress)
            return;

        if (this.stop)
            return;
    };


    switch (this.execCollision(direction)) {
        case 0: {
            this.position.facing = direction;
            this.switchStep("", direction);
            return;
        };
    };

    if (this.isPlayer) {
        this.walkInProgress = true;
        this.position.facing = direction;
        this.game.cameraFollow({
            x: this.position.x,
            y: this.position.y
        });
        this.sendWalk(direction);
    };

    async.series([
        this.syncWalk[0].bind([this, direction]),
        this.syncWalk[1].bind([this, direction]),
        this.syncWalk[2].bind([this, direction]),
        this.syncWalk[3].bind([this, direction, callback])
    ]);
};

// Walk animation
Character.prototype.syncWalk = [
    function (c) {
        this[0].setPosition(this[1]);
        this[0].switchStep(this[0].stepFlag, this[1]);
        setTimeout(c, this[0].game.stepTime);
    },
    function (c) {
        this[0].setPosition(this[1]);
        setTimeout(c, this[0].game.stepTime);
    },
    function (c) {
        this[0].setPosition(this[1]);
        this[0].switchStep("", this[1]);
        setTimeout(c, this[0].game.stepTime);
    },
    function () {
        this[0].setPosition(this[1]);

        if (this[0].isPlayer) 
            this[0].walkInProgress = false;

        if (this[2] && typeof(this[2] == "function")) 
            this[2]();
    }
];

// Collision check
Character.prototype.execCollision = function (direction) {

    const position = { ... this.position};

    switch (direction) {
        case "right":{
            position.x ++;
            break;
        };
        case "left":{
            position.x --;
            break;
        };
        case "up":{
            position.y --;
            break;
        };
        case "down": {
            position.y ++;
            break;
        };
    };

    if (!this.isPlayer) {

        if (this.type == 1)
            return 1;

        const collision = position.x == this.game.player.position.x && position.y == this.game.player.position.y;
        
        if (!collision) {
            this.position.x = position.x;
            this.position.y = position.y;
        };

        return collision ? 0 : 1;
    };

    const 
        checkY = this.game.mapTiles[position.y],
        checkXY = checkY ? this.game.tileTypes[checkY[position.x]] : 0;

    if (!checkXY)
        return 0;

    if (checkXY.block)
        return 0;

    this.position.x = position.x;
    this.position.y = position.y;

    return 1;
};

// Set position (raw)
Character.prototype.setPosition = function (direction) {

    switch (direction) {
        case "up": {
            this.$el.style.top = parseInt(this.$el.style.top) - 4 + "px";
            break;
        };
        case "right": {
            this.$el.style.left = parseInt(this.$el.style.left) + 4 + "px";
            break;
        };
        case "down": {
            this.$el.style.top = parseInt(this.$el.style.top) + 4 + "px";
            break;
        };
        case "left": {
            this.$el.style.left = parseInt(this.$el.style.left) - 4 + "px";
            break;
        };
    };
};

// switch step flag
Character.prototype.switchStep = function (flag, direction) {

    if (typeof(flag) == "number") {
        flag = flag ? 0 : 1;
        this.stepFlag = flag;
    };

    this.$el.setAttribute("class", this.character + " " + this.character + "_" + direction + (flag));
};

// Player
const Player = function (game, x, y, facing, data) {
    Character.call(this, game, x, y, facing, data);
    this.isPlayer = true;
    this.walkInProgress = false;
    this.stop = false;
};

Player.prototype = Object.create(Character.prototype);

// add player to gameworld
Player.prototype.addToScene = function () {
    this.$el = document.createElement("div");
    this.$el.setAttribute("class", `${this.character} ${this.character}_${this.position.facing}`);
    this.$el.setAttribute("id", "character");

    // putting position according to tile size
    this.$el.style.left = this.position.x * this.game.tileSize + "px";
    this.$el.style.top = this.position.y * this.game.tileSize + "px";

    this.game.$player.append(this.$el);
};

// send walk to socket.io
Player.prototype.sendWalk = function (direction) {
    this.game.socket.emit(EVENTS.PLAYER_MOVE, {
        x: this.position.x,
        y: this.position.y,
        character: this.character,
        direction,
        uid: this.game.savedData.uid
    });
};