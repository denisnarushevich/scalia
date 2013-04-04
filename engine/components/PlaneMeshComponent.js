define(["./MeshComponent"], function(MeshComponent){
    /**
     * @param {PlaneObject} Plane
     * @constructor
     */
    function PlaneMeshComponent(gameObject) {
        MeshComponent.call(this, gameObject);
    }

    var p = PlaneMeshComponent.prototype = Object.create(MeshComponent.prototype);

    p.vertices = [
        [-1,0,-1],
        [1,0,-1],
        [-1,0,1],
        [1,0,1]
    ];

    p.faces = [
        [0,1,3,2]
    ];

    return PlaneMeshComponent;
});