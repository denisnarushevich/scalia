define(["./Logic", "./Graphics", "./utils/base"], function (Logic, Graphics, utils) {
    /*RAF shim*/
    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

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
    p.Run = function () {
        this.MainLoop();
    }

    /**
     * @type {void}
     */
    p.MainLoop = function () {
        this.logic.Tick();

        this.graphics.Render();

        var game = this;
        requestAnimFrame(function () {
            game.MainLoop();
        });
    }

    return Game;
});
