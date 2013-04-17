define(["../GameObject", "../components/MeshComponent"], function (GameObject, MeshComponent) {
    function Cube() {
        GameObject.call(this);

        var mesh = new MeshComponent(this);

        mesh.vertices = [
            [-1,-1,-1],
            [1,-1,-1],
            [-1,1,-1],
            [1,1,-1],
            [-1,-1,1],
            [1,-1,1],
            [-1,1,1],
            [1,1,1],
        ];

        mesh.faces = [
            [0,1,2], //front1
            [1,3,2], //front2
            [4,6,5], //back1
            [5,6,7], //back2
            [1,5,3], //right1
            [5,7,3], //right2
            [4,0,2], //left1
            [4,2,6], //left2
            [0,4,1], //bottom1
            [1,4,5], //bottom2
            [2,3,6], //top1
            [6,3,7] //top2
        ];

        mesh.colors = [
            "rgb(255, 255, 0)"
        ];

        mesh.faceColors = [
            [0,0],
            [1,0],
            [2,0],
            [3,0],
            [4,0],
            [5,0],
            [6,0],
            [7,0],
            [8,0],
            [9,0],
            [10,0],
            [11, 0]
        ];

        mesh.ComputeFaceNormals();

        this.AddComponent(mesh);
    }

    var p = Cube.prototype = Object.create(GameObject.prototype);

    p.Tick = function(){
        GameObject.prototype.Tick.call(this);
    }

    return Cube;
});
