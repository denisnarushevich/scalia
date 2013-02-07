define(["./BehaviorComponent"], function (BehaviorComponent) {
    function TransformComponent() {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
    }

    var p = TransformComponent.prototype = Object.create(BehaviorComponent.prototype);

    p.position = null;

    p.rotation = null;

    return TransformComponent;
});
