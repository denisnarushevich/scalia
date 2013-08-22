define(['./Time', './World'], function (Time, World) {
    /**
     * @param {Game} game
     * @constructor
     */
    function Logic(game) {
        this.game = game;
        this.time = new Time();
        this.world = new World(this);
    }

    var p = Logic.prototype;

    /**
     * @type {Game}
     */
    p.game = null;

    /**
     * Holds state of the game (scene graph, BSP tree)
     * @type {null}
     */
    p.world = null;

    /**
     * @type {Time}
     */
    p.time = null;

    /**
     * @return {void}
     */
    p.Tick = function () {
        var now = Date.now(), i = 0;
        var frameTime = now - this.time.now,
            dt = this.time.dt;

        while(frameTime >= dt && i < 5){
            i++;
            frameTime -= dt;
            this.time.now += dt;
            this.time.time += dt;
            this.world.Tick();
        }
    }

    return Logic;
});