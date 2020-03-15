Game.prototype.fetchMapData = function () {
    $.getJSON(
        "/res/" + this.savedData.map + ".json",
        data => this.generateMapData(data)
    );
    return this;
};

Game.prototype.fetchSavedData = function () {
    this.savedData = {
        map: localStorage.getItem("map") || "test",
        x: localStorage.getItem("x") || 1,
        y: localStorage.getItem("y") || 1,
        facing: localStorage.getItem("facing") || "down",
        character: localStorage.getItem("character") || "red",
        item: JSON.parse(localStorage.getItem("items")) || {},
        choices: JSON.parse(localStorage.getItem("choices")) || {},
        uid: Date.now()
    };
    return this;
};