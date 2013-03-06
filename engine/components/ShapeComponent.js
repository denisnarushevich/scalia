define(["../Component"], function (Component) {
    function ShapeComponent(gameObject) {
        Component.call(this, gameObject);

        var shape = this;

        gameObject.transform.AddListener(gameObject.transform.events.Update, function(transform){
            shape.UpdateVertices();
        });
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

    p.UpdateVertices = function(){
        var indices = this.vertices,
            indicesCount = indices.length,
            vertice,
            vertices,
            verticesCount,
            i, j;

        var transform = this.gameObject.transform;

        for(i = 0; i < indicesCount; i++){
            vertices = indices[i];
            verticesCount = vertices.length;
            for(j = 0; j < verticesCount; j++){
                vertice = vertices[j];

                var m = scaliaEngine.utils.glMatrix.mat4.create();
                scaliaEngine.utils.glMatrix.mat4.rotateX(m, m, Math.PI / 180 * 1);
                scaliaEngine.utils.glMatrix.mat4.rotateY(m, m, Math.PI / 180 * 1);
                scaliaEngine.utils.glMatrix.mat4.rotateZ(m, m, Math.PI / 180 * 1);
                scaliaEngine.utils.glMatrix.vec3.transformMat4(vertice, vertice, m);
            }
        }
    }

    return ShapeComponent;
});