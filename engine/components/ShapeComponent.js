define(["../Component"], function (Component) {
    function ShapeComponent(gameObject) {
        Component.call(this, gameObject);
    }

    var p = ShapeComponent.prototype = Object.create(Component.prototype);

    p.vertices = null;

    /*
     p.SetGameObject = function(gameObject){
     Component.prototype.SetGameObject.call(this, gameObject);

     var shape = this;
     this.gameObject.transform.AddListener("update", function(transform){
     for(var i = 0; i < shape.vertices.length; i++){
     scaliaEngine.utils.glMatrix.vec3.multiply(shape.vertices[i], shape.initialVertices[i], transform.scale);
     }
     });
     }
     */
    p.Tick = function () {
        var vertice,
            vertices = this.vertices2,
            verticesCount = vertices.length,
            j, x, y, z;

        for (j = 0; j < verticesCount; j+=3) {
            x = vertices[j];
            y = vertices[j+1];
            z = vertices[j+2];
        }
    }

    return ShapeComponent;
});