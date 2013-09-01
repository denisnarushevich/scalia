define(["./EventManager"], function (EventManager) {
    /**
     * @constructor
     */
    function Component() {
        EventManager.call(this);
    }

    var p = Component.prototype = Object.create(EventManager.prototype);

    /**
     * @type {GameObject}
     * @read-only
     */
    p.gameObject = null;

    p.enabled = true;

    p.setGameObject = function(gameObject){
        this.gameObject = gameObject;
    }

    p.unsetGameObject = function(){
        this.gameObject = null;
    }

    /**
     * Runs when game starts
     */
    p.start = function(){

    }

    /**
     * Runs on every game logic tick
     * @type {function}
     */
    p.tick = null;

    return Component;
});