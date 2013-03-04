define(["./ShapeComponent"], function(Shape){
    /**
     * @param {RectangleObject} Rectangle
     * @constructor
     */
    function RectangleShape() {
        this.vertices2 = [
                0,0,0,
                1,0,0,
                1,1,0,

                0,0,0,
                0,1,0,
                1,1,0,

                0,0,1,
                1,0,1,
                1,1,1,

                0,0,1,
                0,1,1,
                1,1,1,

                0,0,0,
                0,0,1,
                0,1,1,

                0,0,0,
                0,1,0,
                0,1,1,

                1,0,0,
                1,1,0,
                1,1,1,

                0,0,0,
                0,0,1,
                1,0,0,

                0,0,1,
                1,0,1,
                1,0,0
        ];

        this.vertices = [
            [
                [0,0,0],
                [1,0,0],
                [1,1,0]
            ],
            [
                [0,0,0],
                [0,1,0],
                [1,1,0]
            ],
            [
                [0,0,1],
                [1,0,1],
                [1,1,1]
            ],
            [
                [0,0,1],
                [0,1,1],
                [1,1,1]
            ],
            [
                [0,0,0]
                [0,0,1],
                [0,1,1],
            ],
            [
                [0,0,0],
                [0,1,0],
                [0,1,1]
            ],
            [
                [1,0,0],
                [1,1,0],
                [1,1,1]
            ],
            [
                [0,0,0],
                [0,0,1],
                [1,0,0]
            ],
            [
                [0,0,1],
                [1,0,1],
                [1,0,0]
            ]
        ];
    }

    var p = RectangleShape.prototype = Object.create(Shape.prototype);

    return RectangleShape;
});