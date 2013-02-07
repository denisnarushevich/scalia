define(function(){
    /**
     * @param {GameObject} parent
     * @constructor
     */
    function BallObject(parent, radius) {
        scaliaEngine.GameObject.call(this, parent); //call parent construnctor

        this.radius = radius;
    }

    var p = BallObject.prototype = Object.create(scaliaEngine.GameObject.prototype);

    /**
     * @type {int}
     */
    p.radius = 10;

    /**
     * @type {array}
     */
    p.color = null;

    return BallObject;
});