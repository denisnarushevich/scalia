define(['./components/TransformComponent'], function (Transform) {
    /**
     * Base object
     * @constructor
     */
    function GameObject(name) {
        this.instanceId = GameObject.prototype.instanceId++;
        this.components = [];
        this.transform = this.addComponent(new Transform());

        this.removeQueue = [];

        if(name !== undefined)
            this.name = name;
    }

    var p = GameObject.prototype;

    /**
     * @type {Number}
     */
    p.instanceId = 0;

    /**
     * @type {string}
     */
    p.name = "gameObject";

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

    /**
     * @private
     * @type {[]}
     */
    p.removeQueue = null;

    /**
     * @private
     * @type {boolean}
     */
    p.removeQueueWaiting = false;

    /**
     * Runs when game starts
     */
    p.start = function () {
        for (var i = 0; i < this.componentsCount; i++) {
            this.components[i].start();
        }
    }

    /**
     * @param {World} world
     */
    p.setWorld = function (world) {
        this.world = world;
    }

    /**
     * @public
     * @param {Component} component
     * @return {*}
     */
    p.addComponent = function (component) {
        this.components[this.componentsCount++] = component;

        component.setGameObject(this);

        return component;
    }

    p.removeComponent = function (component) {
        component.unsetGameObject();
        this.removeQueue.push(component);
        this.removeQueueWaiting = true;
    }

    /**
     * Method will return component of type of given constructor function
     * @param {function} Type
     * @returns {*}
     */
    p.getComponent = function (Type) {
        for (var i = 0; i < this.components.length; i++) {
            var component = this.components[i];
            if (component instanceof Type)
                return component;
        }
        return null;
    }

    p.tick = function (time) {
        var components = this.components,
            component,
            len = this.componentsCount,
            i;

        for (i = 0; i < len; i++){
            if((component = components[i]).tick !== null)
                component.tick(time);
        }

        if(this.removeQueueWaiting){
            var len = this.removeQueue.length;

            for(i = 0; i < len; i++){
                this.components.splice(this.components.indexOf(this.removeQueue.pop()), 1);
                this.componentsCount--;
            }

            this.removeQueueWaiting = false;
        }
    }

    p.destroy = function () {
        this.world.removeGameObject(this);
        this.world = null;
    }

    return GameObject;
});