define(["../GameObject", "../components/PlaneShapeComponent"], function (GameObject, PlaneShape) {
    function Plane() {
        GameObject.call(this);

        this.AddComponent(new PlaneShape(this));
    }

    var p = Plane.prototype = Object.create(GameObject.prototype);

    p.Tick = function(){
        GameObject.prototype.Tick.call(this);
    }

    return Plane;
});
