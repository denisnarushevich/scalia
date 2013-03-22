define(["./ShapeComponent"], function(Shape){
    /**
     * @param {GameObject} gameObject
     * @constructor
     */
    function PlaneShape(gameObject) {
        Shape.call(this, gameObject);

        //triangle strip of cube. http://codedot.livejournal.com/109158.html
        this.vertices = [
            [0,0,0],
            [0,0,1],
        ];

        this.faces = [
            [0,2,4],
            [2,4,6],
        ];
    }

    var p = PlaneShape.prototype = Object.create(Shape.prototype);

    return PlaneShape;
});