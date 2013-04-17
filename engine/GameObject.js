define(['./components/TransformComponent', './components/CameraComponent', "./components/MeshComponent", "./components/SpriteComponent"], function (Transform, Camera, Mesh, Sprite) {
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
     * Reference to world object
     * @type {World}
     */
    p.world = null;

    /**
     * Transform component attached to this game object.
     * @type {Transform}
     */
    p.transform = null;

    /**
     * Camera component attached to this game object.
     * @type {Camera}
     */
    p.camera = null;

    /**
     * @type {Component[]}
     */
    p.components = null;

    /**
     * @type {number}
     */
    p.componentsCount = 0;

    /**
     * @public
     * @param {Component} component
     * @return {*}
     */
    p.AddComponent = function(component){
        if(component instanceof Transform){
            this.transform = component;
        }else if(component instanceof Camera){
            this.camera = component;
        }else if(component instanceof Mesh){
            this.mesh = component;
        }else if(component instanceof Sprite){
            this.sprite = component;
        }

        this.components[this.componentsCount++] = component;
    }

    p.Tick = function(){
        for(var i = 0; i < this.componentsCount; i++){
            this.components[i].Tick();
        }
    }

    return GameObject;
});