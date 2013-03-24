define(["../GameObject", "../components/CubeShapeComponent"], function (GameObject, CubeShape) {
    function Cube() {
        GameObject.call(this);

        this.AddComponent(new CubeShape(this));
    }

    var p = Cube.prototype = Object.create(GameObject.prototype);

    p.Tick = function(){
        GameObject.prototype.Tick.call(this);

        /*if(this.transform.parent === null)
            this.transform.Rotate(2, 2, 0);*/
    }

    return Cube;
});
