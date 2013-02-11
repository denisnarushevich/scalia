define(["../Component"], function(Component){
    function BehaviorComponent(){
        Component.call(this);
    }

    var p = BehaviorComponent.prototype = Object.create(Component.prototype);

    p.Start = function(){

    }

    p.Update = function(){

    }

    return BehaviorComponent;
});
