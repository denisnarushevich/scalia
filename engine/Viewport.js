define(["./CanvasRenderer"], function (CanvasRenderer) {
    /**
     * @param {CameraObject} camera
     * @constructor
     */
    function Viewport(camera, size) {
        this.camera = camera;

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        //this.context.translate(0.5, 0.5);

        this.SetSize(size);

        this.renderer = new CanvasRenderer();
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
        this.renderer.Render(this);
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