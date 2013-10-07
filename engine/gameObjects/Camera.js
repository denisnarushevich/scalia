define(["../GameObject", "../components/CameraComponent"], function (GameObject, CameraComponent) {
    function CameraObject(name) {
        GameObject.call(this, name);
        this.addComponent(new CameraComponent());
    }

    CameraObject.prototype = Object.create(GameObject.prototype);

    return CameraObject;
});
