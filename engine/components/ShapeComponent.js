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

                scaliaEngine.utils.glMatrix.vec3.transformMat4(vertice, this.vertices0[i][j], this.gameObject.transform.worldMatrix);
            }
        }
    }

    return ShapeComponent;
});