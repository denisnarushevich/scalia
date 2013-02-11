define(function(){
   function BounceScript(){
       this.velocity = [];
       this.velocity[0] = Math.random() * 2 - 1;
       this.velocity[1] = Math.random() * 2 - 1;
   }

    var p = BounceScript.prototype = Object.create(scaliaEngine.components.BehaviorComponent.prototype);

    p.velocity = null;

    p.Update = function(){
        var obj = this.gameObject;

        obj.transform.position[0] += this.velocity[0] * 100/obj.radius;// * (a >= 1 ? a : 1);
        obj.transform.position[1] += this.velocity[1] * 100/obj.radius;

        this.velocity[0] = Math.random() * 2 - 1;
        this.velocity[1] = Math.random() * 2 - 1;
    }

    return BounceScript;
});