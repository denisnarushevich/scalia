define(["../lib/gl-matrix", "../Component", "../lib/BoundingBox", "../lib/aabb"], function (glMatrix, Component, BoundingBox, AABB) {

    /**
     * @constructor
     */
    function CameraComponent() {
        Component.call(this);
        this.projectionMatrix = new Float32Array(16);
        this.frustumSize = [
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.frustumBox = [
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.bounds = new BoundingBox();    //rename to AABB
        this.aabb = new AABB();
        this.worldToScreenMatrix = new Float32Array(16);
        this.worldToViewportMatrix = new Float32Array(16);

        var cam = this;
        this.transformUpdateEventHandler = function (transform) {
            //update frustumbox
            var localToWorld = transform.getLocalToWorld();
            glMatrix.vec3.transformMat4(cam.frustumBox[0], cam.frustumSize[0], localToWorld);
            glMatrix.vec3.transformMat4(cam.frustumBox[1], cam.frustumSize[1], localToWorld);

            //update wTv mat
            glMatrix.mat4.mul(cam.worldToViewportMatrix, cam.projectionMatrix, transform.getWorldToLocal());

            //update obbox
            cam.bounds.Calculate(cam.frustumBox);

            cam.dispatchEvent(cam.events.update);
        };

        this.viewportResizeEventHandler = function(viewport, args){
            cam.setup(viewport.width, viewport.height, 100);

            glMatrix.mat4.mul(cam.worldToViewportMatrix, cam.projectionMatrix, cam.gameObject.transform.getWorldToLocal());
        };
    }

    CameraComponent.prototype = Object.create(Component.prototype);

    CameraComponent.prototype.constructor = CameraComponent;

    CameraComponent.prototype.events = {
        update: 0,
        viewportSet: 1,
        viewportRemoved: 2
    };

    CameraComponent.prototype.bounds = null;
    CameraComponent.prototype.frustumSize = null;
    CameraComponent.prototype.frustumBox = null;
    CameraComponent.prototype.projectionMatrix = null;

    CameraComponent.prototype.worldToScreenMatrix = null;
    CameraComponent.prototype.worldToViewportMatrix = null;

    CameraComponent.prototype.setup = function (width, height, length) {

        //update frustum size
        this.frustumSize = [
            [-width / 2, -height / 2, 0],
            [width / 2, height / 2, length]
        ];

        //update frustumbox
        var localToWorld = this.gameObject.transform.getLocalToWorld();
        glMatrix.vec3.transformMat4(this.frustumBox[0], this.frustumSize[0], localToWorld);
        glMatrix.vec3.transformMat4(this.frustumBox[1], this.frustumSize[1], localToWorld);

        //update projection matrix
        glMatrix.mat4.ortho(this.projectionMatrix, -width / 2, width / 2, -height / 2, height / 2, 0, length);

        //update aabbox
        this.bounds.Calculate(this.frustumBox);
    }

    CameraComponent.prototype.setViewport = function (viewport) {
        this.viewport = viewport;

        this.setup(viewport.width, viewport.height, 100);

        var cam = this;
        this.viewport.addEventListener(this.viewport.events.resize, this.viewportResizeEventHandler);

        this.dispatchEvent(this.events.viewportSet, this);
    }

    CameraComponent.prototype.removeViewport = function () {
        this.dispatchEvent(this.events.viewportRemoved, this);
        this.viewport = null;
    }


    CameraComponent.prototype.setGameObject = function (gameObject) {
        Component.prototype.setGameObject.call(this, gameObject);
        gameObject.camera = this;
        gameObject.transform.addEventListener(gameObject.transform.events.update, this.transformUpdateEventHandler);
    }

    CameraComponent.prototype.unsetGameObject = function () {
        this.gameObject.camera = undefined;
        this.gameObject.transform.removeEventListener(this.gameObject.transform.events.update, this.transformUpdateEventHandler);
        Component.prototype.unsetGameObject.call(this);
    }

    CameraComponent.prototype.getWorldToScreen = function () {
        return glMatrix.mat4.mul(this.worldToScreenMatrix, this.viewport.viewportMatrix, this.worldToViewportMatrix);
    }

    CameraComponent.prototype.getWorldToViewport = function () {
        return this.worldToViewportMatrix;
    }

    CameraComponent.prototype.getScreenToWorld = function () {
        throw "CameraComponent.getScreenToWorld: not implemented";
    }

    return CameraComponent;
});

