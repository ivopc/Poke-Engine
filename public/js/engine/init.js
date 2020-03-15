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

Game.prototype.tileTypes = {
    0: null,
    1: {
        block: true
    },
    2: {
        block: false
    },
    3: {
        teleport: true
    }
};

Game.prototype.maps = {
    "test": {
        "src": "img/maps/",
        "ext": ".png"
    }
};

Game.prototype.stepTime = 90;

Game.prototype.objs = {};

Game.prototype.mapTiles = [];

Game.prototype.tileSize = 16;

Game.prototype.mapData = {
    width: 0,
    height: 0
}; 

Game.prototype.level = {};

function init () {
    new Game()
        .getSavedData(localStorage)
        .setPlayerData()
        .loadMap()
        .keyBoardListener();
};

window.addEventListener("DOMContentLoaded", init);
