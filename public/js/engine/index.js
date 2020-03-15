const Game = function () {

    this.socket = io();

    this.$loader = document.querySelector("#load_layer");
    
    this.$level = document.querySelector("#level");
    this.$world = $("#world");
    this.$map = document.querySelector("#map");
    this.$overlay = document.querySelector("#map-overlay");
    this.$player = document.querySelector("#player");

    this.level.size = {
        width: this.$level.clientWidth,
        height: this.$level.clientHeight
    };

    this.level.scale = {
        x: (this.level.size.width / 2) - 7,
        y: (this.level.size.height / 2) - 7
    };
};

Game.prototype.load = function () {
    this
        .fetchSavedData()
        .fetchMapData();

    return this;
};

Game.prototype.start = function () {
    this.player = new Player(
        this, 
        this.savedData.x, 
        this.savedData.y, 
        this.savedData.facing, 
        {
            character: this.savedData.character,
            type: 0
        }
    );

    this.player.addToScene();
};

Game.prototype.update = function () {
    if (this.key.isDown(this.key.UP) || this.key.isDown(this.key.W))
        this.player.walk("up");
    else if (this.key.isDown(this.key.DOWN) || this.key.isDown(this.key.S))
        this.player.walk("down");

    if (this.key.isDown(this.key.LEFT) || this.key.isDown(this.key.A))
        this.player.walk("left");
    else if (this.key.isDown(this.key.RIGHT) || this.key.isDown(this.key.D)) 
        this.player.walk("right");
};

Game.prototype.$release = function () {
    this.keyBoardListener();
    setInterval(() => this.update(), 1000 / 30);
};
