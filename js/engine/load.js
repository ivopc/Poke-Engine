Game.prototype.loadMap = function () {
    $.getJSON("res/" + this.savedData.map + ".json", this.generateMapData.bind(this));
    return this;
};

Game.prototype.getSavedData = function (data) {
    this.savedData = {
        map: data.getItem("map") || "test",
        x: data.getItem("x") || 1,
        y: data.getItem("y") || 1,
        facing: data.getItem("facing") || "down",
        character: data.getItem("character") || "red",
        item: JSON.parse(data.getItem("items")) || {},
        choices: JSON.parse(data.getItem("choices")) || {}
    };
    return this;
};

Game.prototype.getImageData = function (img, callback) {
    var a = new Image();
    a.addEventListener("load", function cb() {
        callback();
    });
    this.cache.appendChild(a);
};

Game.prototype.saveData = function (data) {};

Game.prototype.setPlayerData = function () {
    this.x = this.savedData.x;
    this.y = this.savedData.y;
    this.facing = this.savedData.facing;
    this.character = this.savedData.character;

    this.walkInProgress = false;
    this.stepFlag = 0;
    this.stop = false;

    this.element = document.querySelector("#character");

    this.element.style.top = this.y * this.tileSize + "px";
    this.element.style.left = this.x * this.tileSize + "px";
    this.element.setAttribute("class", this.character + " " + this.character + "_" + this.facing);
    return this;
};