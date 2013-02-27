define(['./Time', './gameObjects/WorldObject'], function (Time, WorldObject) {
    /**
     * @param {Game} game
     * @constructor
     */
    function Logic(game) {
        this.game = game;
        this.time = new Time();
        this.world = new WorldObject(this);
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
    p.Update = function () {
        var now = Date.now();
        var frameTime = now - this.time.now,
            dt = this.time.dt;

        while(frameTime >= dt){
            frameTime -= dt;
            this.time.now += dt;
            this.time.time += dt;
            this.world.Update();
        }
    }

    return Logic;
});