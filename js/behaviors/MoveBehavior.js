define(['engine'], function(scaliaEngine){
    /**
     * @param {GameObject} gameObject
     * @constructor
     */
    function MoveBehavior(gameObject){
        scaliaEngine.Behavior.call(this); //call parent constructor
        this.gameObject = gameObject;
    }

    var p = MoveBehavior.prototype = Object.create(scaliaEngine.Behavior.prototype); //inherits from Behavior.

    /**
     * @return {void}
     */
    p.Update = function(){ //overrides parent Update method
        var obj = this.gameObject;

        obj.position[0] += obj.velocity[0] * 100/obj.radius;// * (a >= 1 ? a : 1);
        obj.position[1] += obj.velocity[1] * 100/obj.radius;// * (a >= 1 ? a : 1);

        scaliaEngine.Behavior.prototype.Update.call(this); //call parent Update method
    }

    return MoveBehavior;
});