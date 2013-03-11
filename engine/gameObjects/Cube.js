define(["../GameObject", "../components/CubeShapeComponent"], function (GameObject, CubeShape) {
    function Cube() {
        GameObject.call(this);

        this.AddComponent(new CubeShape(this));
    }

    var p = Cube.prototype = Object.create(GameObject.prototype);

    p.Tick = function(){
        GameObject.prototype.Tick.call(this);

        this.transform.SetRotation(this.transform.rotation[0] + 10, 0,0);
    }

    return Cube;
});
