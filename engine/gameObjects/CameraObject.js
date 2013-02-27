define(["../GameObject", "../components/CameraComponent"], function (GameObject, CameraComponent) {
    function CameraObject() {
        GameObject.call(this);
        this.AddComponent(this.cameraComponent = new CameraComponent());
    }

    var p = CameraObject.prototype = Object.create(GameObject.prototype);

    /**
     * @type {CameraComponent}
     */
    this.cameraComponent = null;

    p.Update = function(){
        GameObject.prototype.Update.call(this);
    }

    return CameraObject;
});
