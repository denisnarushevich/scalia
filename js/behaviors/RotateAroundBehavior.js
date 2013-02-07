define(['engine'], function(scaliaEngine){
    /**
     * @param {GameObject} gameObject
     * @constructor
     */
    function RotateAroundBehavior(gameObject){
        scaliaEngine.Behavior.call(this); //call parent constructor
        this.gameObject = gameObject;
    }

    var p = RotateAroundBehavior.prototype = Object.create(scaliaEngine.Behavior.prototype); //inherits from Behavior.

    /**
     * @return {void}
     */
    p.Update = function(){ //overrides parent Update method
        var obj = this.gameObject;

        scaliaEngine.utils.math.vec2.rotateAroundPoint(obj.position, [0, 0], Math.PI/180*10*15/obj.radius, obj.position);

        scaliaEngine.Behavior.prototype.Update.call(this); //call parent Update method
    }

    return RotateAroundBehavior;
});