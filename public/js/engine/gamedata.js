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

Game.prototype.onlinePlayers = {};

Game.prototype.mapTiles = [];

Game.prototype.tileSize = 16;

Game.prototype.mapData = {
    width: 0,
    height: 0
};

Game.EVENTS = {
    PLAYER_MOVE: 1
};

Game.prototype.level = {};