Game.prototype.generateMapData = function (data) {

    var y = data.height,
        x = data.width,
        total = 0,
        map = [],
        collision;

    for (var i = 0, l = data.layers.length; i < l; i++) {
        switch(data.layers[i].name) {
            case "collision": {
                collision = data.layers[i].data;
                break;
            };

            case "objects": {
                break;
            };
        }
    };

    for (var i = 0; i < y; i++) {
        map.push([]);
        for (var ii = 0; ii < x; ii++) 
            map[i].push(collision[total++]);
    };

    this.mapTiles = map;
    this.mapData.width = data.width;
    this.mapData.height = data.height;

    this.applyMap();
};

Game.prototype.applyMap = function () {
    var name = this.savedData.map,
        m = this.maps[name];
    // this.savedData.map
    $(this.loader).fadeOut(1200);
    
    this.map.style.background = "url(" + m.src + name + m.ext + ")";
    this.map.style.width = this.mapData.width * this.tileSize + "px";
    this.map.style.height = this.mapData.height * this.tileSize + "px";

    this.overlay.style.background = "url(" + m.src + name + "_overlay" + m.ext + ")";
    this.overlay.style.width = this.mapData.width * this.tileSize + "px";
    this.overlay.style.height = this.mapData.height * this.tileSize + "px";

    this.mapLoaded = true;

    return this;
};