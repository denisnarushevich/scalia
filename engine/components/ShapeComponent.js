define(["../Component"], function (Component) {
    function ShapeComponent(gameObject) {
        Component.call(this, gameObject);
    }

    var p = ShapeComponent.prototype = Object.create(Component.prototype);

    p.vertices = null;

    p.faces = null;

    p.Tick = function () {

    }

    return ShapeComponent;
});