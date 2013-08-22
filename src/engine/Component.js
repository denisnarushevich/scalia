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

    p.setGameObject = function(gameObject){
        this.gameObject = gameObject;
    }

    p.awake = function(){

    }

    p.start = function(){

    }

    p.tick = function(){

    }

    return Component;
});