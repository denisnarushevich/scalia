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

        this.name = name || "gameObject";
    }

    var p = GameObject.prototype;

    /**
     * @type {Number}
     */
    p.instanceId = 0;

    /**
     * If currently is started.
     * GameObject is started when game is run, or when gameObject is added in already running world.
     * @type {boolean}
     */
    p.started = false;

    /**
     * @type {string}
     */
    p.name = null;

    /**
     * Layer index
     * @type {int}
     */
    p.layer = 0;

    /**
     * Reference to world object
     * @public
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
        var cmp, i;
        for (i = 0; i < this.componentsCount; i++) {
            cmp = this.components[i];

            !cmp.awaken && cmp.awake !== null && cmp.awake();

            cmp.start !== null && cmp.start();
        }

        this.started = true;
    };

    /**
     * @param {World} world
     */
    p.setWorld = function (world) {
        this.world = world;
    };

    /**
     * @public
     * @param {Component} component
     * @return {*}
     */
    p.addComponent = function (component) {
        this.components[this.componentsCount++] = component;

        component.setGameObject(this);

        this.started && component.start !== null && component.start();

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

        for (i = 0; i < len; i++){//24
          component = components[i];//24
          if(component.tick !== null) //14
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