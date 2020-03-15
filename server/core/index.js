const Core = function () {};

const EVENTS = {
    "PLAYER_MOVE": 1
};

Core.prototype.auth = function () {};

Core.prototype.conn = function (socket) {
    console.log("Conectou");

    socket.on(EVENTS.PLAYER_MOVE, input => {
        console.log(input.x, input.y, input.direction, input.character);
    });
};

module.exports = Core;