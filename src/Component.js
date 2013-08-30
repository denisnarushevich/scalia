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

    /**
     * Runs when component is added to the gameObject
     */
    p.awake = function(){

    }

    /**
     * Runs when game starts
     */
    p.start = function(){

    }

    p.tick = function(){

    }

    return Component;
});