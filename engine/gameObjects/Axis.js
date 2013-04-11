define(["../GameObject", "../components/AxisMeshComponent"], function (GameObject, PlaneMesh) {
    function Plane() {
        GameObject.call(this);

        this.AddComponent(new PlaneMesh(this));
    }

    var p = Plane.prototype = Object.create(GameObject.prototype);

    p.Tick = function () {
        GameObject.prototype.Tick.call(this);
    }

    return Plane;
});
