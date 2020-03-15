function init () {

    const gameInstance = new Game();

    gameInstance
        .load()
        .start();

    gameInstance.$dispatch();
};

window.addEventListener("DOMContentLoaded", init);