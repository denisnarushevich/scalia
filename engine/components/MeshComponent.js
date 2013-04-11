define(["../Component"], function (Component) {
    function Mesh(gameObject) {
        Component.call(this, gameObject);
    }

    var p = Mesh.prototype = Object.create(Component.prototype);

    p.vertices = null;

    p.faces = null; //TODO: this array can contain elements of 2,3 & 4 points, so it should be renamed.



    p.pivot = [0, 0, 0];

    return Mesh;
});