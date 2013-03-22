define(["./ShapeComponent"], function(Shape){
    /**
     * @param {RectangleObject} Rectangle
     * @constructor
     */
    function RectangleShape(gameObject) {
        Shape.call(this, gameObject);
    }
    
    var p = RectangleShape.prototype = Object.create(Shape.prototype);

    p.vertices = [
        [-1,-1,-1],
        [1,-1,-1],
        [-1,1,-1],
        [1,1,-1],
        [-1,-1,1],
        [1,-1,1],
        [-1,1,1],
        [1,1,1],
    ];

    p.faces = [
        [0,1,2], //front1
        [1,3,2], //front2
        [4,6,5], //back1
        [5,6,7], //back2
        [1,5,3], //right1
        [5,7,3], //right2
        [4,0,2], //left1
        [4,2,6], //left2
        [0,4,1], //bottom1
        [1,4,5], //bottom2
        [2,3,6], //top1
        [6,3,7] //top2
    ]

    
    return RectangleShape;
});