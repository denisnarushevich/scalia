define(["../Component"], function (Component) {
    /**
     * Create Transform component.
     * Every component has a game object.
     * @param {GameObject} gameObject
     * @constructor
     */
    function Transform(gameObject) {
        Component.call(this);
        this.position = [0, 0, 0];
        this.localPosition = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.localRotation = [0, 0, 0];
        this.scale = [1, 1, 1];
        this.localScale = [1, 1, 1];
        this.children = [];
        this.matrix = scaliaEngine.glMatrix.mat4.create();
    }

    var p = Transform.prototype = Object.create(Component.prototype);

    /**
     * The position of the transform in world space.
     * @type {Vec3}
     */
    p.position = null;

    /**
     * Position of the transform relative to the parent transform.
     * @type {Vec3}
     */
    p.localPosition = null;

    /**
     * Rotation of the transform relative to world.
     * @type {Vec3}
     */
    p.rotation = null;

    /**
     * Rotation of the transform relative to parent transform.
     * @type {Vec3}
     */
    p.localRotation = null;

    /**
     * Scale of the transform relative to world.
     * @type {Ve3}
     */
    p.scale = null;

    /**
     * Scale of the transform relative to parent.
     * @type {Vec3}
     */
    p.localScale = null;

    /**
     *
     * @type {Mat4}
     */
    p.matrix = null;

    /**
     * @type {Transform[]}
     * @read-only
     */
    p.children = null;

    /**
     * Parent transform.
     * @read-only
     * @type {Transform}
     */
    p.parent = null;

    /**
     * Root transform in the hierarchy
     * @read-only
     * @type {Transform}
     */
    p.root = null;

    /**
     * @param {Transform} children
     */
    p.AddChildren = function(children){
        children.parent = this;
        children.root = this.root || this;
        this.children[this.children.length] = children;
    }

    p.SetScale = function(x, y, z){
        this.scale[0] = x;
        this.scale[1] = y;
        this.scale[2] = z;
        this.DispatchEvent("update", this);
    }

    p.Rotate = function(x, y, z){
        //scaliaEngine.utils.glMatrix.mat4.rotate(this.matrix, this.matrix, Math.PI/180 * 1, [x,y,z]); //?
        //scaliaEngine.utils.glMatrix.vec3.transformMat4(this.position, this.position, this.matrix);
    }

    return Transform;
});
