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
        this.matrix = scaliaEngine.utils.glMatrix.mat4.create();
    }

    var p = Transform.prototype = Object.create(Component.prototype);

    /**
     * The position of the transform in world space.
     * @type {Vec3}
     * @read-only
     */
    p.position = null;

    /**
     * Position of the transform relative to the parent transform.
     * @type {Vec3}
     * @read-only
     */
    p.localPosition = null;

    /**
     * Rotation of the transform relative to world.
     * @type {Vec3}
     * @read-only
     */
    p.rotation = null;

    /**
     * Rotation of the transform relative to parent transform.
     * @type {Vec3}
     * @read-only
     */
    p.localRotation = null;

    /**
     * Scale of the transform relative to world.
     * @type {Ve3}
     * @read-only
     */
    p.scale = null;

    /**
     * Scale of the transform relative to parent.
     * @type {Vec3}
     * @read-only
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
    p.AddChildren = function (children) {
        children.parent = this;
        children.root = this.root || this;
        this.children[this.children.length] = children;
    }

    /**
     * @param {int} x
     * @param {int} y
     * @param {int} z
     */
    p.SetPosition = function (x, y, z) {
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
        if (this.parent !== null)
            scaliaEngine.utils.glMatrix.vec3.subtract(this.localPosition, this.parent.position, position);
        this.DispatchEvent(this.events.Update, this);
    }

    /**
     * @param {int} x
     * @param {int} y
     * @param {int} z
     */
    p.SetLocalPosition = function (x, y, z) {
        this.localPosition[0] = x;
        this.localPosition[1] = y;
        this.localPosition[2] = z;
        scaliaEngine.utils.glMatrix.vec3.add(this.position, this.parent.position, localPosition)
        this.DispatchEvent(this.events.Update, this);
    }


    p.SetScale = function (x, y, z) {
        this.scale[0] = x;
        this.scale[1] = y;
        this.scale[2] = z;
        this.DispatchEvent(this.events.Update, this);
    }

    p.Rotate = function (x, y, z) {
        //scaliaEngine.utils.glMatrix.mat4.rotate(this.matrix, this.matrix, Math.PI/180 * 1, [x,y,z]); //?
        //scaliaEngine.utils.glMatrix.vec3.transformMat4(this.position, this.position, this.matrix);
    }

    /**
     * Game tick.
     * @return {void}
     */
    p.Tick = function(){
        //scaliaEngine.utils.glMatrix.mat4.rotate(this.matrix, this.matrix, 3.14/180*10, [1,1,1]);
        //scaliaEngine.utils.glMatrix.vec3.transformMat4(this.rotation, this.rotation, this.matrix);
        //this.position = [Math.random(), Math.random(), Math.random()];
        this.DispatchEvent(this.events.Update, this);
    }

    return Transform;
});
