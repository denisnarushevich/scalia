define(["./Logic", "./Graphics"], function (Logic, Graphics) {
    /**
     * @constructor
     */
    function Game() {
        this.logic = new Logic(this);
        this.graphics = new Graphics(this);
    }

    var p = Game.prototype;

    /**
     * @type {Logic}
     */
    p.logic = null;

    /**
     * @type {Graphics}
     */
    p.graphics = null;

    /**
     * @type {void}
     */
    p.run = function () {
        this.logic.start();
        this.graphics.start();
        this.mainLoop();
    }

    /**
     * @type {void}
     */
    p.mainLoop = function () {
        this.logic.tick();

        this.graphics.render();

        var game = this;
        requestAnimFrame(function () {
            game.mainLoop();
        });
    }

    return Game;
});
