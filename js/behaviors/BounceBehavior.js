define(['engine'], function(scaliaEngine){
    /**
     * @param {GameObject} gameObject
     * @constructor
     */
    function BounceBehavior(gameObject){
        scaliaEngine.Behavior.call(this); //call parent constructor
        this.gameObject = gameObject;
    }

    var p = BounceBehavior.prototype = Object.create(scaliaEngine.Behavior.prototype); //inherits from Behavior.

    /**
     * @return {void}
     */
    p.Update = function(){ //overrides parent Update method
        var obj = this.gameObject;

        this.Bounce();

        //var a = 25 - obj.world.logic.time.time/200;

        obj.position[0] += obj.velocity[0] * 100/obj.radius;// * (a >= 1 ? a : 1);
        obj.position[1] += obj.velocity[1] * 100/obj.radius;// * (a >= 1 ? a : 1);

        scaliaEngine.Behavior.prototype.Update.call(this); //call parent Update method
    }

    /**
     * @return {void}
     */
    p.Bounce = function(){
        var obj = this.gameObject;

        if(obj.absolutePosition[0] < 0){
            obj.absolutePosition[0] = 0;
            obj.velocity[0] *= -1;
        };

        if(obj.absolutePosition[0] > 1600){
            obj.absolutePosition[0] = 1600;
            obj.velocity[0] *= -1;
        };

        if(obj.absolutePosition[1] < 0){
            obj.absolutePosition[1] = 0;
            obj.velocity[1] *= -1;
        };

        if(obj.absolutePosition[1] > 900){
            obj.absolutePosition[1] = 900;
            obj.velocity[1] *= -1;
        };
    }

    return BounceBehavior;
});