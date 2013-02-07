define(["../GameObject", "../components/CameraComponent"], function (GameObject, CameraComponent) {
    function CameraObject() {
        GameObject.call(this);
        this.AddComponent(new CameraComponent());
    }

    var p = CameraObject.prototype = Object.create(GameObject.prototype);

    p.Update = function(){
        GameObject.prototype.Update.call(this);
    }

    return CameraObject;
});
