define(function () {
    /**
     * @param {CameraComponent} camera
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
     * @type {CameraComponent}
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

        var gameObjects = this.camera.components.Camera.visibles,
            gameObjectsCount = gameObjects.length,
            gameObject, renderer;

        for (var i = 0; i < gameObjectsCount; i++) {
            gameObject = gameObjects[i];

                gameObject.components.Renderer.Draw(this.context);
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