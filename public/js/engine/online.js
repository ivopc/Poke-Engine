Game.prototype.socketListener = function () {
    this.socket.on(EVENTS.PLAYER_MOVE, data => this.dispatchOnlinePlayer(data));
};

// When a online player moves
Game.prototype.dispatchOnlinePlayer = function (data) {
    if ( !(data.uid in this.onlinePlayers) ) {
        this.onlinePlayers[data.uid] = new Character(
            this, 
            data.x, 
            data.y, 
            data.direction, 
            {
                character: data.character,
                type: 1
            }
        );

        this.onlinePlayers[data.uid].addToScene();
        return;
    };

    this.onlinePlayers[data.uid].walk(data.direction);
};