define(["../Component"], function (Component) {
    function Mesh(gameObject) {
        Component.call(this, gameObject);
    }

    var p = Mesh.prototype = Object.create(Component.prototype);

    p.vertices = null;

    p.faces = null;

    return Mesh;
});