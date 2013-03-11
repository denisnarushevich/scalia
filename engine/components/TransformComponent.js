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

    p.localToWorld = null;
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

        this.CalculateWorldMatrix();
        this.UpdateLocalMatrix();

        this.DispatchEvent(this.events.Update, this);
    }

    p.SetScale = function (x, y, z) {
        this.scale[0] = x;
        this.scale[1] = y;
        this.scale[2] = z;

        this.CalculateWorldMatrix();
        this.UpdateLocalMatrix();

        this.DispatchEvent(this.events.Update, this);
    }

    p.SetRotation = function(x, y, z){
        this.rotation[0] = x % 360;
        this.rotation[1] = y % 360;
        this.rotation[2] = z % 360;

        this.CalculateWorldMatrix();
        this.UpdateLocalMatrix();

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

        this.CalculateLocalMatrix();

        if(this.parent !== null)
            scaliaEngine.utils.glMatrix.mat4.multiply(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);
        else
            scaliaEngine.utils.glMatrix.mat4.copy(this.worldMatrix, this.localMatrix);

        this.DispatchEvent(this.events.Update, this);
    }

    p.SetLocalScale = function(x, y, z){
        this.localScale[0] = x;
        this.localScale[1] = y;
        this.localScale[2] = z;

        this.CalculateLocalMatrix();

        if(this.parent !== null)
            scaliaEngine.utils.glMatrix.mat4.multiply(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);
        else
            scaliaEngine.utils.glMatrix.mat4.copy(this.worldMatrix, this.localMatrix);

        this.DispatchEvent(this.events.Update, this);
    }

    p.SetLocalRotation = function(x, y, z){
        this.localRotation[0] = x % 360;
        this.localRotation[1] = y % 360;
        this.localRotation[2] = z % 360;

        this.CalculateLocalMatrix();

        if(this.parent !== null)
            scaliaEngine.utils.glMatrix.mat4.multiply(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);
        else
            scaliaEngine.utils.glMatrix.mat4.copy(this.worldMatrix, this.localMatrix);

        this.DispatchEvent(this.events.Update, this);
    }

    p.CalculateWorldMatrix = function(){
        var mat4 = scaliaEngine.utils.glMatrix.mat4,
            degreeToRad = Math.PI / 180;

        mat4.identity(this.worldMatrix);

        mat4.translate(this.worldMatrix, this.worldMatrix, this.position);

        mat4.rotateX(this.worldMatrix, this.worldMatrix, this.rotation[0] * degreeToRad);
        mat4.rotateY(this.worldMatrix, this.worldMatrix, this.rotation[1] * degreeToRad);
        mat4.rotateZ(this.worldMatrix, this.worldMatrix, this.rotation[2] * degreeToRad);

        mat4.scale(this.worldMatrix, this.worldMatrix, this.scale);

        mat4.invert(this.worldToLocal, this.worldMatrix);
    }

    p.CalculateLocalMatrix = function(){
        var mat4 = scaliaEngine.utils.glMatrix.mat4,
            degreeToRad = Math.PI / 180;

        mat4.identity(this.localMatrix);

        mat4.translate(this.localMatrix, this.localMatrix, this.localPosition);

        mat4.rotateX(this.localMatrix, this.localMatrix, this.localRotation[0] * degreeToRad);
        mat4.rotateY(this.localMatrix, this.localMatrix, this.localRotation[1] * degreeToRad);
        mat4.rotateZ(this.localMatrix, this.localMatrix, this.localRotation[2] * degreeToRad);

        mat4.scale(this.localMatrix, this.localMatrix, this.localScale);
    }

    p.UpdateLocalMatrix = function(){
        if(this.parent !== null)
            scaliaEngine.utils.glMatrix.mat4.multiply(this.localMatrix, this.parent.worldToLocal, this.worldMatrix);
        else
            scaliaEngine.utils.glMatrix.mat4.copy(this.localMatrix, this.worldMatrix);

        this.localPosition[0] = this.localMatrix[12];
        this.localPosition[1] = this.localMatrix[13];
        this.localPosition[2] = this.localMatrix[14];

        this.localScale[0] = Math.sqrt(this.localMatrix[0] * this.localMatrix[0] + this.localMatrix[4] * this.localMatrix[4] + this.localMatrix[8] * this.localMatrix[8]);
        this.localScale[1] = Math.sqrt(this.localMatrix[1] * this.localMatrix[1] + this.localMatrix[5] * this.localMatrix[5] + this.localMatrix[9] * this.localMatrix[9]);
        this.localScale[2] = Math.sqrt(this.localMatrix[2] * this.localMatrix[2] + this.localMatrix[6] * this.localMatrix[6] + this.localMatrix[10] * this.localMatrix[10]);

        //this.localRotation[0]
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
        //this.DispatchEvent(this.events.Update, this);
    }

    return Transform;
});
