define(["../Component"], function (Component) {
    /**
     * Create Transform component.
     * Every component has a game object.
     * @param {GameObject} gameObject
     * @constructor
     */
    function Transform(gameObject) {
        Component.call(this, gameObject);

        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.eulerRotation = [0, 0, 0];
        this.quatRotation = [0, 0, 0, 1];
        this.scale = [1, 1, 1];

        this.children = [];

        this.localMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        this.worldMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        this.worldToLocal = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
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
    p.worldMatrix = null;

    p.localMatrix = null;

    p.worldToLocal = null;

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
     * @param {Transform} children
     */
    p.AddChildren = function (children) {
        children.parent = this;
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

        this.CalculateLocalMatrix();
    }

    p.SetScale = function(x, y, z){
        this.scale[0] = x;
        this.scale[1] = y;
        this.scale[2] = z;

        this.CalculateLocalMatrix();
    }

    p.SetRotation = function(x, y, z){
        this.rotation[0] = x % 360;
        this.rotation[1] = y % 360;
        this.rotation[2] = z % 360;

        this.CalculateLocalMatrix();
    }

    p.CalculateLocalMatrix = function(){
        var mat4 = scaliaEngine.utils.glMatrix.mat4;

        mat4.fromRotationTranslation(this.localMatrix, this.quatRotation, this.position);

        mat4.scale(this.localMatrix, this.localMatrix, this.scale);

        if(this.parent === null)
            mat4.copy(this.worldMatrix, this.localMatrix);
        else
            mat4.multiply(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);

        mat4.invert(this.worldToLocal, this.worldMatrix);

        for(var i = 0; i < this.children.length; i++){
            this.children[i].CalculateLocalMatrix();
        }

        this.DispatchEvent(this.events.Update, this);
    }

    p.Rotate = function (x, y, z) {
        //this.SetRotation(this.rotation[0] + x, this.rotation[1] + y, this.rotation[2] + z);
        var degreeToRad = Math.PI / 180;

        scaliaEngine.utils.glMatrix.quat.rotateX(this.quatRotation, this.quatRotation, x * degreeToRad);
        scaliaEngine.utils.glMatrix.quat.rotateY(this.quatRotation, this.quatRotation, y * degreeToRad);
        scaliaEngine.utils.glMatrix.quat.rotateZ(this.quatRotation, this.quatRotation, z * degreeToRad);

        this.CalculateLocalMatrix();
    }

    /**
     * Game tick.
     * @return {void}
     */
    p.Tick = function(){

    }

    return Transform;
});
