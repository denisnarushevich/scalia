define(function () {
    var Vec3 = {};

    /**
     * Zero vector
     * @type {Vec3}
     * @static
     */
    Vec3.zero = [0, 0, 0];

    /**
     * Generates a random unit vector.
     *
     * http://mathworld.wolfram.com/SpherePointPicking.html
     * Using (6), (7), and (8) to generate coordinates.
     * @return {Array} A random unit-length vector.
     */
    Vec3.randomUnit = function () {
        var theta = Math.random() * Math.PI * 2;
        var phi = Math.random() * Math.PI * 2;

        var z = Math.cos(phi);
        var x = Math.sqrt(1 - z * z) * Math.cos(theta);
        var y = Math.sqrt(1 - z * z) * Math.sin(theta);

        return [x, y, z];
    };

    /**
     * @return {Array} A random vector inside the unit sphere.
     */
    Vec3.random = function () {
        var rnd = Vec3.randomUnit();
        Vec3.scale(rnd, Math.random(), rnd);
        return rnd;
    };

    /**
     * @param {Array} a First vector
     * @param {Array} b Second vector
     * @param {Array} r Result vector
     * @return {*}
     */
    Vec3.sum = function(a, b, r){
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        return;
    }

    /**
     * @param v {Array} The vector
     * @return {Array} The clone
     */
    Vec3.clone = function(v){
        return v.splice(0);
    }

    /**
     * @param {Array} a First vector
     * @param {Array} b Second vector
     * @param {Array} r Result vector
     * @return {*}
     */
    Vec3.sub = function(a, b, r){
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];
        return;
    }

    /**
     * @param {Array} a First vector
     * @param {Array} b Second vector
     * @param {Number} x The proportion between a and b.
     * @param {Array} r Result vector
     * @return {*}
     */
    Vec3.lerp = function(a, b, x, r){
        r[0] = this.math.lerp(a[0], b[0], x);
        r[1] = this.math.lerp(a[1], b[1], x);
        r[2] = this.math.lerp(a[2], b[2], x);
        return;
    }

    /**
     * Returns the dot-product of two vectors.
     * @param {Array} a The first vector.
     * @param {Array} b The second vector.
     * @return {number} The dot-product of the two vectors.
     */
    Vec3.dot = function (a, b) {
        return a[0] * b[0] + a[1] * b[1];
    };

    /**
     * Returns the cross-product of two vectors.
     *
     * @param {Array} a The first vector.
     * @param {Array} b The second vector.
     * @param {r} r The cross-product of the two vectors.
     */
    Vec3.cross = function(a, b, r) {
        r[0] = a[1] * b[2] - a[2] * b[1];
        r[1] = a[2] * b[0] - a[0] * b[2];
        r[2] = a[0] * b[1] - a[1] * b[0];
    };

    /**
     * Compares this vector with another for equality.
     * @param {!Vec3} b The other vector.
     * @return {boolean} Whether this vector has the same x and y as the given
     *     vector.
     */
    Vec3.equals = function (a, b) {
        return a == b || !!b && a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
    };

    /**
     * Returns the magnitude of the vector measured from the origin.
     * @param {Array} a The vector
     * @return {number} The length of the vector.
     */
    Vec3.magnitude = function (a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    };

    /**
     * Scales the current vector by a constant.
     * @param {Array} v The vector
     * @param {number} s The scale factor.
     * @return {*}
     */
    Vec3.scale = function (v, s, r) {
        r[0] = v[0] * s;
        r[1] = v[1] * s;
        r[2] = v[2] * s;
    };

    /**
     * Normalizes the current vector to have a magnitude of 1.
     * @param v {Array} The vector
     * @param r {Array} The result vector
     * @return {*}
     */
    Vec3.normalize = function (v, r) {
        r[0] = v[0] != 0 ? v[0] / Math.abs(v[0]) : 0;
        r[1] = v[1] != 0 ? v[1] / Math.abs(v[1]) : 0;
        r[2] = v[2] != 0 ? v[2] / Math.abs(v[2]) : 0;
    };

    return Vec3;
});