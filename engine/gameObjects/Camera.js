define(["../GameObject", "../components/CameraComponent"], function (GameObject, CameraComponent) {
    function CameraObject() {
        GameObject.call(this);
        this.AddComponent(new CameraComponent(this));
    }

    var p = CameraObject.prototype = Object.create(GameObject.prototype);

    p.Tick = function(){
        GameObject.prototype.Tick.call(this);
    }

    return CameraObject;
});
