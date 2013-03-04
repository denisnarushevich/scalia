define(["./EventManager"], function (EventManager) {
    /**
     * Every component has attached game object.
     * @param {GameObject} gameObject
     * @constructor
     */
    function Component(gameObject) {
        EventManager.call(this);
    }

    var p = Component.prototype = Object.create(EventManager.prototype);

    /**
     * @type {GameObject}
     * @read-only
     */
    p.gameObject = null;

    return Component;
});