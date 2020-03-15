function init () {

    const gameInstance = new Game();

    gameInstance
        .load()
        .start();

    gameInstance.$release();
};

window.addEventListener("DOMContentLoaded", init);