define(["./ShapeComponent"], function(Shape){
    /**
     * @param {PlaneObject} Plane
     * @constructor
     */
    function PlaneShape(gameObject) {
        Shape.call(this, gameObject);
    }

    var p = PlaneShape.prototype = Object.create(Shape.prototype);

    p.vertices = [
        [-1,0,-1],
        [1,0,-1],
        [-1,0,1],
        [1,0,1]
    ];

    p.faces = [
        [0,1,2], //front1
        [1,3,2] //front2
    ]


    return PlaneShape;
});