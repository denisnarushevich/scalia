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
            gameObject, screenX, screenY, i, j,
            vertices, verticesCount, vertice;

        var cameraToViewportRatioX = this.size[0]/cameraComponent.size[0];
        var cameraToViewportRatioY = this.size[1]/ cameraComponent.size[1];

        for (i = 0; i < gameObjectsCount; i++) {
            gameObject = gameObjects[i];
            vertices = gameObject.components.shape.vertices;
            verticesCount = vertices.length;

            //WRONG. screenX and Y shouldn't be tied to xy coord of gameObject. GameObject's 3D position should be projected on 2D screen plane.
            screenX = (gameObject.transform.position[0] - cameraObject.transform.position[0] + cameraComponent.size[0]/2) * cameraToViewportRatioX;
            screenY = (gameObject.transform.position[1] - cameraObject.transform.position[1] + cameraComponent.size[1]/2) * cameraToViewportRatioY;

            //TRANSFORMATIONS such as scaling and rotation should be aplied here.

            this.context.beginPath();
            vertice = vertices[0];
            for (j = 1; j <= verticesCount; j++) {
                this.context.moveTo(vertice[0] * cameraToViewportRatioX + screenX, vertice[1] * cameraToViewportRatioY + screenY);
                vertice = vertices[j == verticesCount ? 0 : j];
                this.context.lineTo(vertice[0] * cameraToViewportRatioX + screenX, vertice[1] * cameraToViewportRatioY + screenY);
            }
            this.context.closePath();
            this.context.stroke();
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