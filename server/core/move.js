const EVENTS = require("./events.json");

const Move = function (socket) {
	this.socket = socket;
};

Move.prototype.walk = function (input) {
    console.log({
        x: input.x, 
        y: input.y, 
        direction: input.direction, 
        character: input.character,
        uid: input.uid
    });

    this.socket.broadcast.emit(EVENTS.PLAYER_MOVE, input);
};
module.exports = Move;