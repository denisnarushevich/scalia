define(function () {
    function CanvasRenderer() {
        this.faces = [];
        this.vertices = [];
    }

    var p = CanvasRenderer.prototype;

    p.faces = null;

    p.vertices = null;

    p.viewport = null;

    p.Render = function (viewport) {
        this.viewport = viewport;
        this.viewport.context.clearRect(0, 0, viewport.size[0], viewport.size[1]);
        var i, j, gameObject, vertices, vertex, verticesCount,
            faces, facesCount, face, localVertex, localFace,
            glMatrix = scaliaEngine.utils.glMatrix,
            camera = viewport.camera,
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
        scaliaEngine.utils.glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.viewport.camera.transform.worldToLocal);
        scaliaEngine.utils.glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.viewport.camera.camera.projectionMatrix);

        transformedVertex[0] = transformedVertex[0] * this.viewport.size[0] / 2 + this.viewport.size[0] / 2 - sprite.pivot[0];
        transformedVertex[1] = transformedVertex[1] * this.viewport.size[1] / 2 + this.viewport.size[1] / 2 - sprite.pivot[1];

        this.RenderImage(transformedVertex, sprite.image, 0, 0, sprite.width, sprite.height);
    }

    p.RenderMesh = function (mesh) {
        var vertices = [];

        var glMatrix = scaliaEngine.utils.glMatrix;

        //transform vertices
        for (var i = 0; i < mesh.vertices.length; i++) {
            var vertex = mesh.vertices[i];

            var transformedVertex = vertices[i] = [];

            glMatrix.vec3.add(transformedVertex, vertex, mesh.pivot);
            glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, mesh.gameObject.transform.worldMatrix);
            glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.viewport.camera.transform.worldToLocal);
            glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.viewport.camera.camera.projectionMatrix);

            transformedVertex[0] = transformedVertex[0] * this.viewport.size[0] / 2 + this.viewport.size[0] / 2;
            transformedVertex[1] = transformedVertex[1] * this.viewport.size[1] / 2 + this.viewport.size[1] / 2;
        }

        //transform face normals
        /*for (var i = 0; i < mesh.faceNormals.length; i++) {
            var vertex = mesh.vertices[i];

            var transformedVertex = vertices[i] = [];

            glMatrix.vec3.add(transformedVertex, vertex, mesh.pivot);
            glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, mesh.gameObject.transform.worldMatrix);
            glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.viewport.camera.transform.worldToLocal);
            glMatrix.vec3.transformMat4(transformedVertex, transformedVertex, this.viewport.camera.camera.projectionMatrix);

            transformedVertex[0] = transformedVertex[0] * this.viewport.size[0] / 2 + this.viewport.size[0] / 2;
            transformedVertex[1] = transformedVertex[1] * this.viewport.size[1] / 2 + this.viewport.size[1] / 2;
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
        var ctx = this.viewport.context;

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
        var ctx = this.viewport.context;

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
        var ctx = this.viewport.context;
        ctx.drawImage(image, x | 0, y | 0, w, h, v[0] | 0, v[1] | 0, w, h);
    }

    p.RenderLine = function(v0, v1, color, width){
        var ctx = this.viewport.context;

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