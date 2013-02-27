define(["./EventManager"], function (EventManager) {
    /**
     * @constructor
     */
    function Component() {
        EventManager.call(this);
    }

    var p = Component.prototype = Object.create(EventManager.prototype);

    /**
     * @type {String}
     */
    p.componentName = "Component";

    /**
     * @type {GameObject}
     */
    p.gameObject = null;

    p.SetGameObject = function(gameObject){
        this.gameObject = gameObject;
    }

    return Component;
});