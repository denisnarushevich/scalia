define(function () {
    /**
     * @constructor
     */
    function Component() {
    }

    var p = Component.prototype;

    /**
     * @type {String}
     */
    p.componentName = "Component";

    /**
     * @type {GameObject}
     */
    p.gameObject = null;

    return Component;
});