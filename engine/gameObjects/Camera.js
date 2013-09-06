define(["../GameObject", "../components/CameraComponent"], function (GameObject, CameraComponent) {
    function CameraObject() {
        GameObject.call(this);
        this.addComponent(new CameraComponent());
    }

    CameraObject.prototype = Object.create(GameObject.prototype);

    return CameraObject;
});
