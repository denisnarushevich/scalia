define(['./components/TransformComponent'], function (Transform) {
    /**
     * Base object
     * @constructor
     */
    function GameObject() {
        this.instanceId = GameObject.prototype.instanceId++;
        this.components = [];
        this.transform = this.addComponent(new Transform());
    }

    var p = GameObject.prototype;

    /**
     * @type {Number}
     */
    p.instanceId = 0;

    /**
     * Layer index
     * @type {int}
     */
    p.layer = 0;

    /**
     * Reference to world object
     * @private
     * @type {World}
     */
    p.world = null;

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
     * @type {number}
     */
    p.componentsCount = 0;

    p.start = function(){
        for(var i = 0; i < this.componentsCount; i++){
            this.components[i].start();
        }
    }

    /**
     * @param {World} world
     */
    p.setWorld = function(world){
        this.world = world;



        for(var i = 0; i < this.componentsCount; i++){
            this.components[i].awake();
        }
    }

    /**
     * @public
     * @param {Component} component
     * @return {*}
     */
    p.addComponent = function(component){
        this.components[this.componentsCount++] = component;

        component.setGameObject(this);

        return component;
    }

    /**
     * Method will return component of type of given constructor function
     * @param {function} Type
     * @returns {*}
     */
    p.getComponent = function(Type){
        for(var i = 0; i < this.components.length; i++){
            var component = this.components[i];
            if(component instanceof Type)
                return component;
        }
        return null;
    }

    p.tick = function(){
        //console.log(this)
        for(var i = 0; i < this.componentsCount; i++){
            this.components[i].tick();
        }
    }

    p.destroy = function(){
        this.world.removeGameObject(this);
        this.world = null;
    }

    return GameObject;
});