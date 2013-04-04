define(function () {
    function CanvasRenderer() {
        this.faces = [];
        this.vertices = [];
    }

    var p = CanvasRenderer.prototype;

    p.faces = null;

    p.vertices = null;

    p.Render = function (viewport) {
        this.Project(viewport);
        this.RenderFaces(viewport);

        //Detect visible GO's by their bound box intersection with clipbox

        //
    }

    p.Project = function (viewport) {
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
            vector = [0,0,0];

        //put all vertices and faces each in single list
        for (i = 0; i < gameObjectsCount; i++) {
            gameObject = gameObjects[i];

            if(gameObject.shape === undefined)
                continue;

            glMatrix.vec3.transformMat4(vector, vector, gameObject.transform.worldMatrix);
            glMatrix.vec3.transformMat4(vector, vector, camera.transform.worldToLocal);
            //document.getElementById("debug").innerHTML = vector.toString();
            glMatrix.vec3.transformMat4(vector, vector, cameraComponent.projectionMatrix);
            //document.getElementById("debug").innerHTML += "<br>"+vector.toString();
            var z = vector[2],
                y = vector[1],
                x = vector[0];

            if(z > 1 || z < -1 || x > 1 || x < -1 || y > 1 || y < -1){
                //console.log("skip", x, y, z);
                continue;
            }

            //console.log(vector);


            vertices = gameObject.shape.vertices;
            verticesCount = vertices.length;
            faces = gameObject.shape.faces;
            facesCount = faces.length;

            for (j = 0; j < verticesCount; j++) {
                vertex = vertices[j];

                if (allVertices[offset + j] === undefined)
                    allVertices[offset + j] = [];

                localVertex = allVertices[offset + j];

                glMatrix.vec3.transformMat4(localVertex, vertex, gameObject.transform.worldMatrix);
                glMatrix.vec3.transformMat4(localVertex, localVertex, camera.transform.worldToLocal);
                glMatrix.vec3.transformMat4(localVertex, localVertex, cameraComponent.projectionMatrix);

                localVertex[0] = localVertex[0] * viewport.size[0]/2 + viewport.size[0] / 2;
                localVertex[1] = localVertex[1] * viewport.size[1]/2 + viewport.size[1] / 2;
            }

            for (j = 0; j < facesCount; j++) {
                face = faces[j];

                if (allFaces[facesOffset + j] === undefined)
                    allFaces[facesOffset + j] = [];

                localFace = allFaces[facesOffset + j];

                localFace[0] = face[0] + offset;
                localFace[1] = face[1] + offset;
                localFace[2] = face[2] + offset;

                if(face[3] !== undefined)
                    localFace[3] = face[3] + offset;
            }

            offset += verticesCount;
            facesOffset += facesCount;
        }

        this.faces.sort(function(a,b){
           return allVertices[a[0]][2] > allVertices[b[0]][2] ? -1 : 1;
        });

        //clears old data from unused indexes of vertex list.
        for (i = offset; i < allVertices.length; i++)
            allVertices[i][0] = undefined;
    }

    var randcolor = ["red","green","blue"];

    p.RenderFaces = function (viewport) {
        var i, j, face, vertice,
            faces = this.faces,
            vertices = this.vertices,
            facesCount = faces.length,
            verticesCount = vertices.length,
            context = viewport.context;

        context.fillStyle = "green";
        //context.strokeStyle = "black";
        context.clearRect(0, 0, viewport.size[0], viewport.size[1]);

        for (i = 0; i < facesCount; i++) {
            face = faces[i];

            if(this.IsBackFace(vertices[face[0]], vertices[face[1]], vertices[face[2]]))
            continue;
            
            //draw tris
            context.beginPath();
            context.moveTo(vertices[face[0]][0] | 0, vertices[face[0]][1] | 0);
            context.lineTo(vertices[face[1]][0] | 0, vertices[face[1]][1] | 0);
            context.lineTo(vertices[face[2]][0] | 0, vertices[face[2]][1] | 0);
            if(face[3] !== undefined)
                context.lineTo(vertices[face[3]][0] | 0, vertices[face[3]][1] | 0);
            context.closePath();

            //alert(face[0]+";"+verticesCount);
            //alert("rgb("+(face[0]/verticesCount*255)|0+","+(face[1]/verticesCount*255)|0+","+(face[2]/verticesCount*255)|0+")");

            //context.fillStyle = "rgb("+((face[0]+100/verticesCount*255)|0)%255+","+((face[1]+1002/verticesCount*255)|0)%255+","+((face[2]+1900/verticesCount*255)|0)%255+")";

            var green = (140 + i*3) % 255;
            context.fillStyle = "rgb(0,"+green+",0)";
            context.lineWidth = 0;
            context.fill();
            context.stroke();
        }
    }

    var va = [],vb = [], vr = [];
    p.IsBackFace = function(v1,v2,v3){
        var vec3 = scaliaEngine.utils.glMatrix.vec3;
        vec3.subtract(va, v1,v2);
        vec3.subtract(vb, v1,v3);
        vec3.cross(vr, va, vb);

        return vr[2]<0;
        //console.log(vr);
    }

    p.DrawGameObject = function(gameObject){

    }

    return CanvasRenderer;
});