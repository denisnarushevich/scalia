define(["../GameObject", "../components/MeshComponent"], function (GameObject, MeshComponent) {
    function Plane() {
        GameObject.call(this);

        var mesh = new MeshComponent(this);

        mesh.vertices = [
            [-4, -4, 4],
            [-4, 4, 4],
            [4, -4, 4],
            [4, 4, 4],
            [0, 0, 100],


            [-4, 4, -4],
            [-4, 4, 4],
            [4, 4, -4],
            [4, 4, 4],
            [0, 100, 0],

            [4, -4, -4],
            [4, -4, 4],
            [4, 4, -4],
            [4, 4, 4],
            [100, 0, 0]
        ];

        mesh.colors = [
            "rgb(255, 0, 0)",
            "rgb(0, 255, 0)",
            "rgb(0, 0, 255)"
        ];

        mesh.faces = [
            [0, 1, 4],
            [0, 4, 2],
            [2, 4, 3],
            [3, 4, 1],

            [5,9,6],
            [7,9,5],
            [8,9,7],
            [6,9,8],

            [11, 14, 10],
            [13, 14, 11],
            [12, 14, 13],
            [10, 14, 12]
        ];

        mesh.faceColors = [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 1],
            [5, 1],
            [6, 1],
            [7, 1],
            [8, 2],
            [9, 2],
            [10, 2],
            [11, 2]
        ];

        mesh.ComputeNormals();

        this.AddComponent(mesh);
    }

    var p = Plane.prototype = Object.create(GameObject.prototype);

    p.Tick = function () {
        GameObject.prototype.Tick.call(this);
    }

    return Plane;
});
