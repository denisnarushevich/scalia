define(["../Component"], function(Component){
    function RendererComponent(){

    }

    var p = RendererComponent.prototype = Object.create(Component.prototype);

    p.componentName = "Renderer";

    p.Draw = function(context){

    }

    return RendererComponent;
});