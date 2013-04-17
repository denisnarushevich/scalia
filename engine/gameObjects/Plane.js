define(["../GameObject", "../components/MeshComponent"], function (GameObject, MeshComponent) {
    function Plane() {
        GameObject.call(this);


        var r = (Math.random() * 255) | 0,
            g = (Math.random() * 255) | 0,
            b = (Math.random() * 255) | 0;


        this.color = "rgb(" + (r % 100) + "," + (105 + g % 55) + ",0)";


        var mesh = new MeshComponent(this);

        mesh.vertices = [
            [0, 0, 0],
            [1, 0, 0],
            [0, 0, 1],
            [1, 0, 1]
        ];

        mesh.faces = [
            [0, 1, 3, 2]
        ];

        mesh.ComputeFaceNormals();

        this.AddComponent(mesh);
    }

    var p = Plane.prototype = Object.create(GameObject.prototype);

    p.Tick = function () {
        GameObject.prototype.Tick.call(this);
    }

    return Plane;
});
