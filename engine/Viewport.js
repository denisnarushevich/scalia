define(function () {
    /**
     * @param {CameraObject} camera
     * @constructor
     */
    function Viewport(camera, size) {
        this.camera = camera;

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        this.SetSize(size);
    }

    var p = Viewport.prototype;

    /**
     * @type {int[]}
     */
    p.size = null;

    /**
     * @type {CameraObject}
     */
    p.camera = null;

    /**
     * @type {HTMLCanvasElement}
     */
    p.canvas = null;

    /**
     * @type {CanvasRenderingContext2D}
     */
    p.context = null;

    /**
     * @return {*}
     */
    p.Render = function () {
        this.context.clearRect(0, 0, this.size[0], this.size[1]);

        var cameraObject = this.camera,
            cameraComponent = cameraObject.cameraComponent,
            gameObjects = cameraComponent.visibles,
            gameObjectsCount = gameObjects.length,
            gameObject, x, y, i, j, u, v,
            vertices, verticesCount, vertice, vertice1 = [], relativePosition = [];

        for(i = 0; i < gameObjectsCount; i++){
            gameObject = gameObjects[i];
            var indice,
            indices = gameObject.components.shape.vertices,
            indicesCount = indices.length;

            for(var k = 0; k < indicesCount; k++){
                   indice = indices[k];

            vertices = indice;
            verticesCount = indice.length;

            scaliaEngine.utils.glMatrix.vec3.subtract(relativePosition, gameObject.transform.position, cameraObject.transform.position);

            this.context.beginPath();
            vertice = vertices[0];

            //var a = Math.round(Math.PI/180 * Date.now()/100);
            //var a = Math.PI/180 * Date.now()/30;

                scaliaEngine.utils.glMatrix.vec3.scale(vertice1, vertice, 30);

                scaliaEngine.utils.glMatrix.vec3.transformMat4(vertice1, vertice1, gameObject.matrix);
                scaliaEngine.utils.glMatrix.vec3.add(vertice1, relativePosition, vertice1);
                scaliaEngine.utils.glMatrix.vec3.transformMat4(vertice1, vertice1, cameraComponent.matrix);
            x = ((vertice1[0] / cameraComponent.size[0] + 0.5) * this.size[0]);
            y = ((vertice1[1] / cameraComponent.size[1] + 0.5) * this.size[1]);

            for (j = 1; j <= verticesCount; j++) {
                this.context.moveTo(x, y);
                vertice = vertices[j == verticesCount ? 0 : j];

                scaliaEngine.utils.glMatrix.vec3.scale(vertice1, vertice, 30);


                scaliaEngine.utils.glMatrix.vec3.transformMat4(vertice1, vertice1, gameObject.matrix);
                scaliaEngine.utils.glMatrix.vec3.add(vertice1, relativePosition, vertice1);
                scaliaEngine.utils.glMatrix.vec3.transformMat4(vertice1, vertice1, cameraComponent.matrix);
                x = ((vertice1[0] / cameraComponent.size[0] + 0.5) * this.size[0]);
                y = ((vertice1[1] / cameraComponent.size[1] + 0.5) * this.size[1]);

                this.context.lineTo(x, y);
            }
            this.context.closePath();
            this.context.stroke();
            }
        }
    }

    /**
     * @param {int[]} size Vector2. Size of the viewport
     * @constructor
     */
    p.SetSize = function (size) {
        this.size = size;

        this.canvas.width = size[0];
        this.canvas.height = size[1];
    }

    return Viewport;
});