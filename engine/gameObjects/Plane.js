define(["../GameObject", "../components/PlaneMeshComponent"], function (GameObject, PlaneMesh) {
    function Plane() {
        GameObject.call(this);

        this.AddComponent(new PlaneMesh(this));

        var r = (Math.random() * 255) | 0,
            g = (Math.random() * 255) | 0,
            b = (Math.random() * 255) | 0;

        this.color = "rgb("+(r%100)+","+(105+g%55)+",0)";
    }

    var p = Plane.prototype = Object.create(GameObject.prototype);

    p.Tick = function () {
        GameObject.prototype.Tick.call(this);
    }

    return Plane;
});
