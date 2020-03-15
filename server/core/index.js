const Core = function () {};

const Move = require("./move.js");

const EVENTS = require("./events.json");

Core.prototype.auth = function () {};

Core.prototype.conn = function (socket) {
    socket.on(EVENTS.PLAYER_MOVE, input => 
        new Move(socket)
            .walk(input)
    );
};

module.exports = Core;