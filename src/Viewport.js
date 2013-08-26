define(['./EventManager', './config'], function (EventManager, config) {
    /**
     * @param {Graphics} graphics
     * @param {HTMLCanvasElement} canvas @optional
     * @constructor
     */
    function Viewport(graphics, canvas) {
        EventManager.call(this);
        this.events = {
            update: 0,
            resize: 1,
            pointerdown: 2,
            pointerup: 3,
            pointermove: 4,
            poiterin: 5,
            pointerout: 6
        }

        this.canvas = canvas || document.createElement('canvas');
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.graphics = graphics;
        this.width = 0;
        this.height = 0;

        this.viewportMatrix = new Float32Array(16);

        //generate layers
        this.layers = [];
        for (var i = 0; i < config.layersCount; i++) {
            var cnv = document.createElement("canvas");
            this.layers[i] = cnv.getContext("2d");
            this.layers[i].imageSmoothingEnabled = false;
            this.layers[i].webkitImageSmoothingEnabled = false;
        }

        var viewport = this;
        window.addEventListener('resize', function(){
            viewport.setSize(viewport.canvas.offsetWidth, viewport.canvas.offsetHeight);
        });

        this.canvas.addEventListener("mousedown", function(e){
            var offset = viewport.getOffset();
            viewport.dispatchEvent(viewport.events.pointerdown, { //custom event args. this can be moved to separate class e.g. PointerEventArgs.
                pageX: e.pageX - offset[0],
                pageY: e.pageY - offset[1]
            });
        });

        this.canvas.addEventListener("mouseup", function(e){
            var offset = viewport.getOffset();
            viewport.dispatchEvent(viewport.events.pointerup, {
                pageX: e.pageX - offset[0],
                pageY: e.pageY - offset[1]
            });
        });

        this.canvas.addEventListener("mousemove", function(e){
            var offset = viewport.getOffset();
            viewport.dispatchEvent(viewport.events.pointermove, {
                pageX: e.pageX - offset[0],
                pageY: e.pageY - offset[1]
            });
        });

        this.canvas.addEventListener("mousein", function(e){
            var offset = viewport.getOffset();
            viewport.dispatchEvent(viewport.events.pointerin, {
                pageX: e.pageX - offset[0],
                pageY: e.pageY - offset[1]
            });
        });

        this.canvas.addEventListener("mouseout", function(e){
            var offset = viewport.getOffset();
            viewport.dispatchEvent(viewport.events.pointerout, {
                pageX: e.pageX - offset[0],
                pageY: e.pageY - offset[1]
            });
        });
    }

    var p = Viewport.prototype = Object.create(EventManager.prototype);

    /**
     * @type {int[]}
     */
    p.size = null;

    p.width = null;
    p.height = null;

    /**
     * 4x4 viewport matrix
     * @type {Array}
     */
    p.viewportMatrix = null;

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

    p.start = function(){
        this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
    }

    /**
     * @return {*}
     */
    p.render = function () {
        if(this.camera !== null)
            this.graphics.renderer.render(this.camera, this);
    }

    /**
     * @param {int[]} size Vector2. Size of the viewport
     * @constructor
     */
    p.setSize = function (width, height) {
        this.width = width;
        this.height = height;

        this.canvas.width = width;
        this.canvas.height = height;

        //update viewport matrix
        this.viewportMatrix[0] = (width/2)|0;
        this.viewportMatrix[5] = -(height/2)|0;
        this.viewportMatrix[12] = (width/2)|0;
        this.viewportMatrix[13] = (height/2)|0;

        //update layer sizes
        for (var i = 0; i < this.layers.length; i++) {
            var ctx = this.layers[i];
            ctx.canvas.width = width;
            ctx.canvas.height = height;
        }

        this.dispatchEvent(this.events.resize, this);

        return this;
    }

    p.setCamera = function(camera){
        //this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);//kostql
        this.camera = camera;
        this.camera.camera.setViewport(this);

        return this;
    }

    p.getOffset = function(){
        var offset = [0,0];
        var current = this.canvas;
        while(current != null){
            offset[0] += current.offsetLeft;
            offset[1] += current.offsetTop;
            current = current.offsetParent;
        }
        return offset;
    }

    return Viewport;
});