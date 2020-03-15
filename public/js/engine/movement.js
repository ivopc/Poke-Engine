Game.prototype.doMovement = function (obj, callback) {
    if (!obj || !("type" in obj) || !("dir" in obj))
        return;

    switch (obj.type) {
        case 0: {
            if (this.walkInProgress)
                return;

            if (this.stop)
                return;

            obj.element = this.element;
            obj.stepFlag = this.stepFlag;
            break;
        };
        case 1: {
            var c = this.objs[obj.name];
            obj.element = c.element;
            obj.stepFlag = c.stepFlag;
            obj.c = c;
            break;
        };
        default: {
            return;
        };
    };

    switch(this.execCollision(obj)) {
        case 0: {
            if (obj.type == 0) {
                this.facing = obj.dir;
                this.switchStep(obj, "");
            };
            return;
        };
    };

    if (obj.type == 0) {
        this.walkInProgress = 1;
        this.facing = obj.dir;
    };

    this.cameraFollow({
        x: this.x,
        y: this.y
    });

    async.series([
        this.syncWalk[0].bind([this, obj]),
        this.syncWalk[1].bind([this, obj]),
        this.syncWalk[2].bind([this, obj]),
        this.syncWalk[3].bind([this, obj, callback])
    ]);
};

Game.prototype.syncWalk = [
    function (c) {
        this[0].setPosition(this[1]);
        this[0].switchStep(this[1], this[1].stepFlag);
        setTimeout(c, this[0].stepTime);
    },
    function (c) {
        this[0].setPosition(this[1]);
        setTimeout(c, this[0].stepTime);
    },
    function (c) {
        this[0].setPosition(this[1]);
        this[0].switchStep(this[1], "");
        setTimeout(c, this[0].stepTime);
    },
    function () {
        this[0].setPosition(this[1]);
        if (this[1].type == 0) this[0].walkInProgress = 0;
        if (this[2] && typeof(this[2] == "function")) this[2]();
    }
];

Game.prototype.execCollision = function (obj) {

    var isPlayer = obj.type == 0,
        playerPosition = {
            x: this.x,
            y: this.y
        },
        position = isPlayer ? playerPosition : {
            x: obj.c.x,
            y: obj.c.y
        };

    switch (obj.dir) {
        case "right":
            position.x ++;
        break;
        case "left":
            position.x --;
        break;
        case "up":
            position.y --;
        break;
        case "down":
            position.y ++;
        break;
    };

    if (!isPlayer) {
        var collision = (position.x == playerPosition.x && position.y == playerPosition.y);
        
        if (!collision) {
            obj.c.x = position.x;
            obj.c.y = position.y;
        };

        return (collision ? 0 : 1);
    };

    var checkY = this.mapTiles[position.y],
        checkXY = checkY ? this.tileTypes[checkY[position.x]] : 0;

    if (!checkXY)
        return 0;

    if (checkXY.block)
        return 0;

    this.x = position.x;
    this.y = position.y;

    return 1;
};

Game.prototype.setPosition = function (obj) {

    switch (obj.dir) {
        case "up": {
            obj.element.style.top = parseInt(obj.element.style.top) - 4 + "px";
            break;
        };
        case "right": {
            obj.element.style.left = parseInt(obj.element.style.left) + 4 + "px";
            break;
        };
        case "down": {
            obj.element.style.top = parseInt(obj.element.style.top) + 4 + "px";
            break;
        };
        case "left": {
            obj.element.style.left = parseInt(obj.element.style.left) - 4 + "px";
            break;
        };
    };
};

Game.prototype.switchStep = function (obj, flag) {

    var character;

    if (typeof(flag) == "number") {
        flag = flag ? 0 : 1;
        switch(obj.type) {
            case 0: {
                this.stepFlag = flag;
                break;
            };
            case 1: {
                obj.c.stepFlag = flag;
                break;
            };
        };
    };

    switch (obj.type) {
        case 0: {
            character = this.character;
            break;
        };
        case 1: {
            character = obj.c.character;
            break;
        };
    };

    obj.element.setAttribute("class", character + " " + character + "_" + obj.dir + (flag));
};