define(["./lib/Octree"], function (Octree) {
    function CanvasRenderer(canvas, camera) {
        this.context = canvas.getContext("2d");
        this.camera = camera;
        this.resolution = camera.camera.size;
        this.faces = [];
        this.vertices = [];
        this.octree = new Octree(-10000,10000, 16, 16); //it should contain all transformed to world coordinates gameobjects with mesh|sprite

        this.transformedVertices = [];

        //init octree with objects
        var glMatrix = scaliaEngine.utils.glMatrix,
            gameObjects = camera.world.gameObjects, //should be all GOs with mesh/sprite
            gameObjectsCount = gameObjects.length,
            gameObject;

        for(var i = 0; i < gameObjectsCount; i++){
            gameObject = gameObjects[i];

            if(!gameObject.mesh)continue;

            this.transformedVertices[gameObject.id] = [];

            for(var j = 0; j < gameObject.mesh.vertices.length; j++){
                var mesh = gameObject.mesh;
                var vertex = [];

                glMatrix.vec3.add(vertex, gameObject.mesh.vertices[j], mesh.pivot);
                glMatrix.vec3.transformMat4(vertex, vertex, gameObject.transform.worldMatrix);

                this.transformedVertices[gameObject.id].push(vertex);
            }
        }
    }

    var p = CanvasRenderer.prototype;

    p.faces = null;

    p.vertices = null;

    p.Render = function () {
        this.context.clearRect(0, 0, this.resolution[0], this.resolution[1]);
        var i, j, gameObject, vertices, vertex, verticesCount,
            faces, facesCount, face, localVertex, localFace,
            glMatrix = scaliaEngine.utils.glMatrix,
            camera = this.camera,
            cameraComponent = camera.camera,
            gameObjects = cameraComponent.visibles,
            gameObjectsCount = gameObjects.length,
            allVertices = this.vertices,
            allFaces = this.faces,
            offset = 0,
            facesOffset = 0,
            vector = [0, 0, 0];

        for(var i = 0; i < gameObjectsCount; i++){
            var gameObject = gameObjects[i];
            if(gameObject.mesh !== undefined){
                this.RenderMesh(gameObject.mesh);
            }else if(gameObject.sprite !== undefined){
                this.RenderSprite(gameObject.sprite);
            }
        }
    }



    var va = [], vb = [], vr = [];
    p.IsBackFace = function (v1, v2, v3) {
        var vec3 = scaliaEngine.utils.glMatrix.vec3;

        vec3.subtract(va, v1, v2);
        vec3.subtract(vb, v1, v3);
        vec3.cross(vr, va, vb);

        return vr[2] < 0;
    }

    p.RenderSprite = function(sprite){
        transformedVertex = [0,0,0];
        scaliaEngine.utils.glMatrix.vec3.copy(transformedVertex, transformedVertex);
        scaliaEngine.utils.glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, sprite.gameObject.transform.worldMatrix);
        scaliaEngine.utils.glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.camera.transform.worldToLocal);
        scaliaEngine.utils.glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.camera.projectionMatrix);

        transformedVertex[0] = transformedVertex[0] * this.resolution[0] / 2 + this.resolution[0] / 2 - sprite.pivot[0];
        transformedVertex[1] = transformedVertex[1] * this.resolution[1] / 2 + this.resolution[1] / 2 - sprite.pivot[1];

        this.RenderImage(transformedVertex, sprite.image, 0, 0, sprite.width, sprite.height);
    }
    var m = [];
    p.RenderMesh = function (mesh) {
        var vertices = this.transformedVertices[mesh.gameObject.id];

        var glMatrix = scaliaEngine.utils.glMatrix;


        //glMatrix.mat4.multiply(m, this.camera.transform.worldToLocal, mesh.gameObject.transform.worldMatrix);
        //glMatrix.mat4.multiply(m, this.camera.camera.projectionMatrix, m);

        //transform vertices
        for (var i = 0; i < mesh.vertices.length; i++) {
            var vertex = mesh.vertices[i];

            var transformedVertex = vertices[i] = [];
            //var transformedVertex = vertices[i];


            glMatrix.vec3.add(transformedVertex, vertex, mesh.pivot);
            //glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, m);
            glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, mesh.gameObject.transform.worldMatrix);
            glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.camera.transform.worldToLocal);
            glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.camera.camera.projectionMatrix);

            transformedVertex[0] = transformedVertex[0] * this.resolution[0] / 2 + this.resolution[0] / 2;
            transformedVertex[1] = transformedVertex[1] * this.resolution[1] / 2 + this.resolution[1] / 2;
        }

        //transform face normals
        /*for (var i = 0; i < mesh.faceNormals.length; i++) {
         var vertex = mesh.vertices[i];

         var transformedVertex = vertices[i] = [];

         glMatrix.vec3.add(transformedVertex, vertex, mesh.pivot);
         glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, mesh.gameObject.transform.worldMatrix);
         glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.camera.transform.worldToLocal);
         glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.camera.camera.projectionMatrix);

         transformedVertex[0] = transformedVertex[0] * this.resolution[0] / 2 + this.resolution[0] / 2;
         transformedVertex[1] = transformedVertex[1] * this.resolution[1] / 2 + this.resolution[1] / 2;
         }*/

        //transform face
        for (var i = 0; i < mesh.faces.length; i++) {
            var face = mesh.faces[i];

            if(face.length !== 2)
                if(this.IsBackFace(vertices[face[0]], vertices[face[1]], vertices[face[2]])) continue;

            if(face.length === 3){
                this.RenderFace3(vertices[face[0]], vertices[face[1]], vertices[face[2]], mesh.colors[mesh.faceColors[i][1]]);
            }else if(face.length === 4){
                this.RenderFace4(vertices[face[0]], vertices[face[1]], vertices[face[2]], vertices[face[3]], mesh.gameObject.color);
            }else if(face.length === 2){
                this.RenderLine(vertices[face[0]], vertices[face[1]], mesh.gameObject.color, 1);
            }else{
                throw "Face has wrong vertex count";
            }
        }
    }

    p.RenderFace3 = function (v1, v2, v3, color) {
        var ctx = this.context;

        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(v1[0], v1[1]);
        ctx.lineTo(v2[0], v2[1]);
        ctx.lineTo(v3[0], v3[1]);
        ctx.closePath();

        ctx.fill();
        //ctx.stroke();
    }

    p.RenderFace4 = function (v1, v2, v3, v4, color) {
        var ctx = this.context;

        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(v1[0], v1[1]);
        ctx.lineTo(v2[0], v2[1]);
        ctx.lineTo(v3[0], v3[1]);
        ctx.lineTo(v4[0], v4[1]);
        ctx.closePath();

        ctx.fill();
        //ctx.stroke();
    }

    p.RenderImage = function(v, image, x, y, w, h){
        var ctx = this.context;
        ctx.drawImage(image, x | 0, y | 0, w, h, v[0] | 0, v[1] | 0, w, h);
    }

    p.RenderLine = function(v0, v1, color, width){
        var ctx = this.context;

        ctx.strokeStyle = color;

        ctx.beginPath();
        ctx.moveTo(v0[0], v0[1]);
        ctx.lineTo(v1[0], v1[1]);
        ctx.closePath();

        ctx.lineWidth = width;
        ctx.stroke();
    }

    return CanvasRenderer;
});