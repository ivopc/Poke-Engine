Game.prototype.coordinate2CameraCenter = function (object) {
    if (!object) {
        object = {};
        object.x = this.x;
        object.y = this.y;
    };

    return {
        "left": ((object.x * this.tileSize) - this.level.scale.x) * -1,
        "top": ((object.y * this.tileSize) - this.level.scale.y) * -1
    };
};

Game.prototype.cameraGetLimit = function (obj) {
    var Min = this.coordinate2CameraCenter({
        "x": obj.x,
        "y": obj.y
    }),

    Max = {
        "top": ((obj.y * this.tileSize) + this.level.scale.y) + 7, // 8
        "left": ((obj.x * this.tileSize) + this.level.scale.x) + 7
    },

    add = {
        "min": [],
        "max": []
    };

    if (Min.left >= 1) {
        add.min.push("width");
    };
    if (Min.top >= 1) {
        add.min.push("height");
    };

    if (Max.left >= this.mapData.width * this.tileSize) {
        add.max.push("width");
    };

    if (Max.top >= this.mapData.height * this.tileSize) {
        add.max.push("height");
    };

    return add;
};

// need to be refactored
Game.prototype.cameraUpdate = function (obj, centralize, mapMaxLimit, timer) {
    if (obj.min) {
        if (obj.min.indexOf("width") > -1) { //min height
            setTimeout(() => {
                this.world.stop(false, false).animate({
                    "left": 0,
                    "top": centralize.top >= 1 ? null : centralize.top + "px"
                }, timer);
            }, obj.min.indexOf("height") > -1 ? timer + 50 : 0)
        };

        if (obj.min.indexOf("height") > -1) { //min height
            setTimeout(() => {
                this.world.stop(false, false).animate({
                    "left": centralize.left  >= 1 ? null : centralize.left + "px",
                    "top": 0
                }, timer);
            }, obj.min.indexOf("width") > -1 ? timer + 50 : 0);
        };
    };
    if (obj.max) {
        if (obj.max.indexOf("width") > -1 && obj.max.indexOf("height") > -1) {
            return this.world.stop(false, false).animate({
                "left": "-" + mapMaxLimit.width + "px",
                "top": "-" + mapMaxLimit.height + "px"
            }, timer);
        };

        if (obj.max.indexOf("width") > -1) { // max width
            setTimeout(() => {
                this.world.stop(false, false).animate({
                    "left": "-" + mapMaxLimit.width + "px",
                    "top": centralize.top >= 1 ? null : centralize.top + "px"
                }, timer);
            }, obj.max.indexOf("height") > -1 ? timer + 50 : 0);
        };

        if (obj.max.indexOf("height") > -1) { // max width
            setTimeout(() => {
                this.world.stop(false, false).animate({
                    "left": centralize.left >= 1  ? null : centralize.left + "px",
                    "top": "-" + mapMaxLimit.height + "px"
                }, timer);
            }, obj.max.indexOf("width") > -1 ? timer + 50 : 0);
        };
    };
};

Game.prototype.cameraFollow = function (object) {

    if (!object || !("x" in object) || !("y" in object))
        return;

    var centralize = this.coordinate2CameraCenter({
            x: object.x,
            y: object.y
        }),
        mapMaxLimit = {
            width: (this.mapData.width * this.tileSize) - this.level.size.width,
            height: (this.mapData.height * this.tileSize) - this.level.size.height
        },
        limit = this.cameraGetLimit(object),
        timer = 700;

    if (limit.min.length || limit.max.length) {
        this.cameraUpdate(limit, centralize, mapMaxLimit, timer);
    } else {
        this.world.stop(false, false).animate(centralize, timer);
    };
};
