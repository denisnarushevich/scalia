define(function(){
    /**
     * @param {RectangleObject} Rectangle
     * @constructor
     */
    function RectangleShape() {
        this.vertices = [
            [0,0,0],
            [0,1,0],
            [1,1,0],
            [1,0,0]
        ];
    }

    var p = RectangleShape.prototype = Object.create(scaliaEngine.components.ShapeComponent.prototype);

    p.initialVertices = [
        [0,0,0],
        [0,1,0],
        [1,1,0],
        [1,0,0]
    ];

    return RectangleShape;
});