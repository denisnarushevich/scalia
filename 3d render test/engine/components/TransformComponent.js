define(["../Component"], function (Component) {
    /**
     * Create Transform component.
     * Every component has a game object.
     * @param {GameObject} gameObject
     * @constructor
     */
    function Transform(gameObject) {
        Component.call(this, gameObject);

        this.position = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

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
        this.CalculateLocalMatrix();
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

        this.UpdateMatrices();
    }

    p.SetScale = function(x, y, z){
        this.scale[0] = x;
        this.scale[1] = y;
        this.scale[2] = z;

        this.UpdateMatrices();
    }

    p.SetRotation = function(x, y, z){
        //wtf?! where's quat?!
        this.rotation[0] = x % 360;
        this.rotation[1] = y % 360;
        this.rotation[2] = z % 360;

        this.UpdateMatrices();
    }

    p.UpdateMatrices = function(){
        this.UpdateLocalMatrix();
        this.UpdateWorldMatrix();

        for(var i = 0; i < this.children.length; i++){
            this.children[i].UpdateMatrices();
        }

        this.DispatchEvent(this.events.Update, this);
    }

    p.UpdateLocalMatrix = function(){
        var mat4 = scaliaEngine.utils.glMatrix.mat4;
        mat4.fromRotationTranslation(this.localMatrix, this.quatRotation, this.position);
        mat4.scale(this.localMatrix, this.localMatrix, this.scale);
    }

    p.UpdateWorldMatrix = function(){
        var mat4 = scaliaEngine.utils.glMatrix.mat4;
        if(this.parent === null)
            mat4.copy(this.worldMatrix, this.localMatrix);
        else
            mat4.multiply(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);

        mat4.invert(this.worldToLocal, this.worldMatrix);
    }

    p.Rotate = function (x, y, z, relativeTo) {
        //this.SetRotation(this.rotation[0] + x, this.rotation[1] + y, this.rotation[2] + z);
        var degreeToRad = Math.PI / 180;

        if(relativeTo === "world"){
            var quat = [0,0,0,1];

            scaliaEngine.utils.glMatrix.quat.rotateZ(quat, quat, z * degreeToRad);
            scaliaEngine.utils.glMatrix.quat.rotateY(quat, quat, y * degreeToRad);
            scaliaEngine.utils.glMatrix.quat.rotateX(quat, quat, x * degreeToRad);

            scaliaEngine.utils.glMatrix.quat.multiply(this.quatRotation, quat, this.quatRotation);
        }else{
            scaliaEngine.utils.glMatrix.quat.rotateZ(this.quatRotation, this.quatRotation, z * degreeToRad);
            scaliaEngine.utils.glMatrix.quat.rotateY(this.quatRotation, this.quatRotation, y * degreeToRad);
            scaliaEngine.utils.glMatrix.quat.rotateX(this.quatRotation, this.quatRotation, x * degreeToRad);
        }

        this.UpdateMatrices();
    }

    p.Translate = function(x, y, z, relativeTo){
        r = [x, y, z];

        if(relativeTo == "world"){
            if(this.parent !== null)
                scaliaEngine.utils.glMatrix.vec3.transformMat4(r, r, this.parent.worldToLocal);
        }else
            scaliaEngine.utils.glMatrix.vec3.transformQuat(r, r, this.quatRotation);

        this.SetPosition(this.position[0] + r[0], this.position[1] + r[1], this.position[2] + r[2]);
    }

    p.Scale = function(x, y, z){
        scaliaEngine.utils.glMatrix.mat4.scale(this.localMatrix, this.localMatrix, [x, y, z]);
    }

    /**
     * Game tick.
     * @return {void}
     */
    p.Tick = function(){

    }

    return Transform;
});
