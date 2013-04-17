define(["../Component"], function (Component) {
    function Mesh(gameObject) {
        Component.call(this, gameObject);
    }

    var p = Mesh.prototype = Object.create(Component.prototype);

    p.vertices = null;

    p.faces = null;

    p.pivot = [0, 0, 0];

    p.colors = null;

    p.faceColors = null;

    p.faceNormals = null;

    p.vertexNormals = null;

    p.ComputeNormals = function(){
        this.ComputeFaceNormals();
    };

    p.ComputeFaceNormals = function(){
        var vA, vB, vC, face,
            cb = [], ab = [];

        if(this.faceNormals === null)
            this.faceNormals = [];

        for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {
            face = this.faces[ f ];

            vA = this.vertices[ face[0] ];
            vB = this.vertices[ face[1] ];
            vC = this.vertices[ face[2] ];

            scaliaEngine.utils.glMatrix.vec3.subtract(cb, vC, vB);
            scaliaEngine.utils.glMatrix.vec3.subtract(ab, vA, vB);
            scaliaEngine.utils.glMatrix.vec3.cross(cb, cb, ab);
            scaliaEngine.utils.glMatrix.vec3.normalize(cb, cb);

            this.faceNormals[f] = cb;
        }
    };

    p.ComputeVertexNormals = function(){
        //TODO implement when needed
    };

    return Mesh;
});