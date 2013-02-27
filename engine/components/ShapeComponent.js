define(["../Component"], function(Component){
    function ShapeComponent(){
        Component.call(this);
    }

    var p = ShapeComponent.prototype = Object.create(Component.prototype);

    p.componentName = "shape";

    p.vertices = null;

    p.SetGameObject = function(gameObject){
        Component.prototype.SetGameObject.call(this, gameObject);

        var shape = this;
        this.gameObject.transform.AddListener("update", function(transform){
            for(var i = 0; i < shape.vertices.length; i++){
                scaliaEngine.utils.glMatrix.vec3.multiply(shape.vertices[i], shape.initialVertices[i], transform.scale);
            }
        });
    }

    return ShapeComponent;
});