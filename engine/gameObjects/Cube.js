define(["../GameObject", "../components/CubeShapeComponent"], function (GameObject, CubeShape) {
    function Cube() {
        GameObject.call(this);

        this.AddComponent(new CubeShape(this));
    }

    var p = Cube.prototype = Object.create(GameObject.prototype);

    return Cube;
});
