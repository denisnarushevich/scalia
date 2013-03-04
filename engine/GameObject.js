define(['./components/Transform', './Component'], function (Transform, Component) {
    /**
     * Base object
     * @constructor
     */
    function GameObject() {
        this.id = GameObject.prototype.id++;
        this.components = [];
        this.AddComponent(new Transform(this));
    }

    var p = GameObject.prototype;

    /**
     * @type {Number}
     */
    p.id = 0;

    /**
     * Transform component attached to this game object.
     * @type {Transform}
     */
    p.transform = null;

    /**
     * @type {Component[]}
     */
    p.components = null;

    /**
     * @public
     * @param {Component} component
     * @return {*}
     */
    p.AddComponent = function(component){
        if(component instanceof Transform){
            this.transform = component;
        }

        this.components[this.components.length] = component;
    }

    p.Update = function(){
        /*for(var i = 0; i < this.componentsList.length; i++){
            if(this.componentsList[i].Update)
                this.componentsList[i].Update();
        }
        for(var i = 0; i < this.children.length; i++)
            this.children[i].Update()
            */
    }

    return GameObject;
});