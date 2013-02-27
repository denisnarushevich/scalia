define(["./BehaviorComponent"], function (BehaviorComponent) {
    function TransformComponent() {
        BehaviorComponent.call(this);
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }

    var p = TransformComponent.prototype = Object.create(BehaviorComponent.prototype);

    p.position = null;

    p.rotation = null;

    p.scale = null;

    p.SetScale = function(x, y, z){
        this.scale[0] = x;
        this.scale[1] = y;
        this.scale[2] = z;
        this.DispatchEvent("update", this);
    }

    return TransformComponent;
});
