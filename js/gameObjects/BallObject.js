define(function(){
    /**
     * @param {GameObject} parent
     * @constructor
     */
    function BallObject(parent, radius) {
        scaliaEngine.GameObject.call(this, parent); //call parent construnctor

        this.v = scaliaEngine.utils.math.vec3.randomUnit();

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

    p.Update = function(){
        scaliaEngine.GameObject.prototype.Update.call(this);
        scaliaEngine.utils.glMatrix.mat4.rotate(this.matrix, this.matrix, Math.PI/180 * 3, this.v);
    }

    return BallObject;
});