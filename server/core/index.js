const Core = function () {};

const EVENTS = {
    PLAYER_MOVE: 1
};

Core.prototype.auth = function () {};

Core.prototype.conn = function (socket) {
    console.log("Conectou");

    socket.on(EVENTS.PLAYER_MOVE, input => {
        console.log({
            x: input.x, 
            y: input.y, 
            direction: input.direction, 
            character: input.character,
            uid: input.uid
        });

        socket.broadcast.emit(EVENTS.PLAYER_MOVE, input);
    });
};

module.exports = Core;