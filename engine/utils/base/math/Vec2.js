define(function() {
    var Vec2 = {};

    /**
     * Zero vector
     * @type {Vec2}
     * @static
     */
    Vec2.zero = [0, 0];

    /**
     * @return {!Vec2} A random unit-length vector.
     */
    Vec2.randomUnit = function () {
        var angle = Math.random() * Math.PI * 2;
        return [Math.cos(angle), Math.sin(angle)];
    };


    /**
     * @return {!Vec2} A random vector inside the unit-disc.
     */
    Vec2.random = function () {
        var mag = Math.sqrt(Math.random());
        var angle = Math.random() * Math.PI * 2;
        return [Math.cos(angle) * mag, Math.sin(angle) * mag];
    };

    /**
     * @param {Array} a First vector
     * @param {Array} b Second vector
     * @param {Array} r Result vector
     * @return {*}
     */
    Vec2.sum = function(a, b, r){
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        return;
    }

    /**
     * @param v {Array} The vector
     * @return {Array} The clone
     */
    Vec2.clone = function(v){
        return v.splice(0);
    }

    /**
     * @param {Array} a First vector
     * @param {Array} b Second vector
     * @param {Array} r Result vector
     * @return {*}
     */
    Vec2.sub = function(a, b, r){
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        return;
    }

    /**
     * @param {Array} a First vector
     * @param {Array} b Second vector
     * @param {Number} x The proportion between a and b.
     * @param {Array} r Result vector
     * @return {*}
     */
    Vec2.lerp = function(a, b, x, r){
        r[0] = this.math.lerp(a[0], b[0], x);
        r[1] = this.math.lerp(a[1], b[1], x);
        return;
    }

    /**
     * Returns the dot-product of two vectors.
     * @param {Array} a The first vector.
     * @param {Array} b The second vector.
     * @return {number} The dot-product of the two vectors.
     */
    Vec2.dot = function (a, b) {
        return a[0] * b[0] + a[1] * b[1];
    };

    /**
     * Returns the cross-product of two vectors.
     *
     * @param {Array} a The first vector.
     * @param {Array} b The second vector.
     * @param {r} r The cross-product of the two vectors.
     */
    Vec2.cross = function(a, b, r) {
        r[0] = a[1] * b[2] - a[2] * b[1];
        r[1] = a[2] * b[0] - a[0] * b[2];
    };

    /**
     * Rotates this vector in-place by a given angle, specified in radians.
     * @param {Array} a Vector to rotate
     * @param {number} angle The angle, in radians.
     * @param {Array} r Result vector
     * @return {*}
     */
    Vec2.rotate = function (a, angle, r) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var newX = a[0] * cos - a[1] * sin;
        var newY = a[1] * cos + a[0] * sin;
        r[0] = newX;
        r[1] = newY;
    };

    /**
     * Rotates a vector by a given angle, specified in radians, relative to a given
     * axis rotation point. The returned vector is a newly created instance - no
     * in-place changes are done.
     * @param {Array} v A vector.
     * @param {Array} axisPoint The rotation axis point vector
     * @param {number} angle The angle, in radians.
     * @param {Array} r Result vector
     * @return {!Vec2} The rotated vector in a newly created instance.
     */
    Vec2.rotateAroundPoint = function (v, axisPoint, angle, r) {
        Vec2.sub(v, axisPoint, r);
        Vec2.rotate(r, angle, r);
        Vec2.sum(r, axisPoint, r);
    };

    /**
     * Compares this vector with another for equality.
     * @param {!Vec2} b The other vector.
     * @return {boolean} Whether this vector has the same x and y as the given
     *     vector.
     */
    Vec2.equals = function (a, b) {
        return a == b || !!b && a[0] == b[0] && a[1] == b[1];
    };

    /**
     * Returns the magnitude of the vector measured from the origin.
     * @param {Array} a The vector
     * @return {number} The length of the vector.
     */
    Vec2.magnitude = function (a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
    };

    /**
     * Scales the current vector by a constant.
     * @param {Array} v The vector
     * @param {number} s The scale factor.
     * @return {*}
     */
    Vec2.scale = function (v, s, r) {
        r[0] = v[0] * s;
        r[1] = v[1] * s;
    };

    /**
     * Normalizes the current vector to have a magnitude of 1.
     * @param v {Array} The vector
     * @param r {Array} The result vector
     * @return {*}
     */
    Vec2.normalize = function (v, r) {
        r[0] = v[0] != 0 ? v[0] / Math.abs(v[0]) : 0;
        r[1] = v[1] != 0 ? v[1] / Math.abs(v[1]) : 0;
    };

    return Vec2;
});