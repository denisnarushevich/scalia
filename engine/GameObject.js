define(['./components/TransformComponent'], function (TransformComponent) {
    /**
     * Base object
     * @constructor
     */
    function GameObject() {
        this.id = GameObject.prototype.id++;

        this.children = [];

        this.components = {};
        this.componentsList = [];

        this.AddComponent(this.transform = new TransformComponent());
    }

    var p = GameObject.prototype;

    /**
     * @type {Number}
     */
    p.id = 0;

    /**
     * @type {Array} Position vector relative to parent position
     */
    p.position = null;

    /**
     * @type {number[]} Vector3.
     */
    p.scale = null;

    /**
     * @type {GameObject}
     */
    p.root = null;

    /**
     * @type {GameObject}
     */
    p.parent = null;

    /**
     * @type {Component[]}
     */
    p.components = null;

    /**
     * @type {Component[]}
     */
    p.componentsList = null;

    /**
     * @private
     * @type {GameObject[]}
     */
    p.children = null;

    /**
     * @param {GameObject} children
     */
    p.AddChildren = function(children){
        children.parent = this;
        children.root = this.root || this;
        this.children[this.children.length] = children;
    }

    /**
     * @public
     * @param {Component} component
     * @return {*}
     */
    p.AddComponent = function(component){
        component.gameObject = this;
        this.components[component.componentName] = component;
        this.componentsList[this.componentsList.length] = component;
    }

    p.Update = function(){
        for(var i = 0; i < this.componentsList.length; i++){
            if(this.componentsList[i].Update)
                this.componentsList[i].Update();
        }
        for(var i = 0; i < this.children.length; i++)
            this.children[i].Update()
    }

    return GameObject;
});