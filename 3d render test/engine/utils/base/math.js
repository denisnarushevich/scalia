define(['./math/Vec2', './math/Vec3', './math/Rect', './math/Matrix', './math/Box'], function (Vec2, Vec3, Rect, Matrix, Box) {
    var math = {
        vec2:Vec2,
        Vec2:Vec2,
        vec3:Vec3,
        Vec3:Vec3,
        Rect:Rect,
        Box:Box,
        Matrix:Matrix
    };

    Vec3.math = Vec2.math = math;

    math.TEST = function(){
        math.randomInt();
        math.uniformRandom();
        math.clamp();
        math.modulo();
        math.lerp();
        math.nearlyEquals();
        math.standardAngle();
        math.toRadians();
        math.toDegrees();
        math.angleDx();
        math.angleDy();
        math.angle();
        math.angleDifference();
        math.sign();
        math.longestCommonSubsequence([],[]);
        math.sum();
        math.average();
        math.standardDeviation();
        math.isInt();
        math.isFiniteNumber();
    }

    /**
     * Returns a random integer greater than or equal to 0 and less than {@code a}.
     * @param {number} a  The upper bound for the random integer (exclusive).
     * @return {number} A random integer N such that 0 <= N < a.
     */
    math.randomInt = function (a) {
        return Math.floor(Math.random() * a);
    };


    /**
     * Returns a random number greater than or equal to {@code a} and less than
     * {@code b}.
     * @param {number} a  The lower bound for the random number (inclusive).
     * @param {number} b  The upper bound for the random number (exclusive).
     * @return {number} A random number N such that a <= N < b.
     */
    math.uniformRandom = function (a, b) {
        return a + Math.random() * (b - a);
    };


    /**
     * Takes a number and clamps it to within the provided bounds.
     * @param {number} value The input number.
     * @param {number} min The minimum value to return.
     * @param {number} max The maximum value to return.
     * @return {number} The input number if it is within bounds, or the nearest
     *     number within the bounds.
     */
    math.clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };


    /**
     * The % operator in JavaScript returns the remainder of a / b, but differs from
     * some other languages in that the result will have the same sign as the
     * dividend. For example, -1 % 8 == -1, whereas in some other languages
     * (such as Python) the result would be 7. This function emulates the more
     * correct modulo behavior, which is useful for certain applications such as
     * calculating an offset index in a circular list.
     *
     * @param {number} a The dividend.
     * @param {number} b The divisor.
     * @return {number} a % b where the result is between 0 and b (either 0 <= x < b
     *     or b < x <= 0, depending on the sign of b).
     */
    math.modulo = function (a, b) {
        var r = a % b;
        // If r and b differ in sign, add b to wrap the result to the correct sign.
        return (r * b < 0) ? r + b : r;
    };


    /**
     * Performs linear interpolation between values a and b. Returns the value
     * between a and b proportional to x (when x is between 0 and 1. When x is
     * outside this range, the return value is a linear extrapolation).
     * @param {number} a A number.
     * @param {number} b A number.
     * @param {number} x The proportion between a and b.
     * @return {number} The interpolated value between a and b.
     */
    math.lerp = function (a, b, x) {
        return a + x * (b - a);
    };


    /**
     * Tests whether the two values are equal to each other, within a certain
     * tolerance to adjust for floating pount errors.
     * @param {number} a A number.
     * @param {number} b A number.
     * @param {number=} opt_tolerance Optional tolerance range. Defaults
     *     to 0.000001. If specified, should be greater than 0.
     * @return {boolean} Whether {@code a} and {@code b} are nearly equal.
     */
    math.nearlyEquals = function (a, b, opt_tolerance) {
        return Math.abs(a - b) <= (opt_tolerance || 0.000001);
    };


    /**
     * Standardizes an angle to be in range [0-360). Negative angles become
     * positive, and values greater than 360 are returned modulo 360.
     * @param {number} angle Angle in degrees.
     * @return {number} Standardized angle.
     */
    math.standardAngle = function (angle) {
        return math.modulo(angle, 360);
    };


    /**
     * Converts degrees to radians.
     * @param {number} angleDegrees Angle in degrees.
     * @return {number} Angle in radians.
     */
    math.toRadians = function (angleDegrees) {
        return angleDegrees * Math.PI / 180;
    };


    /**
     * Converts radians to degrees.
     * @param {number} angleRadians Angle in radians.
     * @return {number} Angle in degrees.
     */
    math.toDegrees = function (angleRadians) {
        return angleRadians * 180 / Math.PI;
    };


    /**
     * For a given angle and radius, finds the X portion of the offset.
     * @param {number} degrees Angle in degrees (zero points in +X direction).
     * @param {number} radius Radius.
     * @return {number} The x-distance for the angle and radius.
     */
    math.angleDx = function (degrees, radius) {
        return radius * Math.cos(math.toRadians(degrees));
    };


    /**
     * For a given angle and radius, finds the Y portion of the offset.
     * @param {number} degrees Angle in degrees (zero points in +X direction).
     * @param {number} radius Radius.
     * @return {number} The y-distance for the angle and radius.
     */
    math.angleDy = function (degrees, radius) {
        return radius * Math.sin(math.toRadians(degrees));
    };


    /**
     * Computes the angle between two points (x1,y1) and (x2,y2).
     * Angle zero points in the +X direction, 90 degrees points in the +Y
     * direction (down) and from there we grow clockwise towards 360 degrees.
     * @param {number} x1 x of first point.
     * @param {number} y1 y of first point.
     * @param {number} x2 x of second point.
     * @param {number} y2 y of second point.
     * @return {number} Standardized angle in degrees of the vector from
     *     x1,y1 to x2,y2.
     */
    math.angle = function (x1, y1, x2, y2) {
        return math.standardAngle(math.toDegrees(Math.atan2(y2 - y1,
            x2 - x1)));
    };


    /**
     * Computes the difference between startAngle and endAngle (angles in degrees).
     * @param {number} startAngle  Start angle in degrees.
     * @param {number} endAngle  End angle in degrees.
     * @return {number} The number of degrees that when added to
     *     startAngle will result in endAngle. Positive numbers mean that the
     *     direction is clockwise. Negative numbers indicate a counter-clockwise
     *     direction.
     *     The shortest route (clockwise vs counter-clockwise) between the angles
     *     is used.
     *     When the difference is 180 degrees, the function returns 180 (not -180)
     *     angleDifference(30, 40) is 10, and angleDifference(40, 30) is -10.
     *     angleDifference(350, 10) is 20, and angleDifference(10, 350) is -20.
     */
    math.angleDifference = function (startAngle, endAngle) {
        var d = math.standardAngle(endAngle) -
            math.standardAngle(startAngle);
        if (d > 180) {
            d = d - 360;
        } else if (d <= -180) {
            d = 360 + d;
        }
        return d;
    };


    /**
     * Returns the sign of a number as per the "sign" or "signum" function.
     * @param {number} x The number to take the sign of.
     * @return {number} -1 when negative, 1 when positive, 0 when 0.
     */
    math.sign = function (x) {
        return x == 0 ? 0 : (x < 0 ? -1 : 1);
    };


    /**
     * JavaScript implementation of Longest Common Subsequence problem.
     * http://en.wikipedia.org/wiki/Longest_common_subsequence
     *
     * Returns the longest possible array that is subarray of both of given arrays.
     *
     * @param {Array.<Object>} array1 First array of objects.
     * @param {Array.<Object>} array2 Second array of objects.
     * @param {Function=} opt_compareFn Function that acts as a custom comparator
     *     for the array ojects. Function should return true if objects are equal,
     *     otherwise false.
     * @param {Function=} opt_collectorFn Function used to decide what to return
     *     as a result subsequence. It accepts 2 arguments: index of common element
     *     in the first array and index in the second. The default function returns
     *     element from the first array.
     * @return {Array.<Object>} A list of objects that are common to both arrays
     *     such that there is no common subsequence with size greater than the
     *     length of the list.
     */
    math.longestCommonSubsequence = function (array1, array2, opt_compareFn, opt_collectorFn) {

        var compare = opt_compareFn || function (a, b) {
            return a == b;
        };

        var collect = opt_collectorFn || function (i1, i2) {
            return array1[i1];
        };

        var length1 = array1.length;
        var length2 = array2.length;

        var arr = [];
        for (var i = 0; i < length1 + 1; i++) {
            arr[i] = [];
            arr[i][0] = 0;
        }

        for (var j = 0; j < length2 + 1; j++) {
            arr[0][j] = 0;
        }

        for (i = 1; i <= length1; i++) {
            for (j = 1; j <= length1; j++) {
                if (compare(array1[i - 1], array2[j - 1])) {
                    arr[i][j] = arr[i - 1][j - 1] + 1;
                } else {
                    arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);
                }
            }
        }

        // Backtracking
        var result = [];
        var i = length1, j = length2;
        while (i > 0 && j > 0) {
            if (compare(array1[i - 1], array2[j - 1])) {
                result.unshift(collect(i - 1, j - 1));
                i--;
                j--;
            } else {
                if (arr[i - 1][j] > arr[i][j - 1]) {
                    i--;
                } else {
                    j--;
                }
            }
        }

        return result;
    };


    /**
     * Returns the sum of the arguments.
     * @param {...number} var_args Numbers to add.
     * @return {number} The sum of the arguments (0 if no arguments were provided,
     *     {@code NaN} if any of the arguments is not a valid number).
     */
    math.sum = function (var_args) {
        var sum = 0,
            value;
        for (var i = 0; i < arguments.length; i++) {
            value = arguments[i];
            if (isNaN(value))
                return NaN;
            sum += value;
        }
        return sum;
    };


    /**
     * Returns the arithmetic mean of the arguments.
     * @param {...number} var_args Numbers to average.
     * @return {number} The average of the arguments ({@code NaN} if no arguments
     *     were provided or any of the arguments is not a valid number).
     */
    math.average = function (var_args) {
        return math.sum.apply(null, arguments) / arguments.length;
    };


    /**
     * Returns the sample standard deviation of the arguments.  For a definition of
     * sample standard deviation, see e.g.
     * http://en.wikipedia.org/wiki/Standard_deviation
     * @param {...number} var_args Number samples to analyze.
     * @return {number} The sample standard deviation of the arguments (0 if fewer
     *     than two samples were provided, or {@code NaN} if any of the samples is
     *     not a valid number).
     */
    math.standardDeviation = function (var_args) {
        var sampleSize = arguments.length;
        if (sampleSize < 2) {
            return 0;
        }

        var mean = math.average.apply(null, arguments);
        var variance = math.sum.apply(null, arguments.map(function (val) {
            return Math.pow(val - mean, 2);
        })) / (sampleSize - 1);

        return Math.sqrt(variance);
    };


    /**
     * Returns whether the supplied number represents an integer, i.e. that is has
     * no fractional component.  No range-checking is performed on the number.
     * @param {number} num The number to test.
     * @return {boolean} Whether {@code num} is an integer.
     */
    math.isInt = function (num) {
        return isFinite(num) && num % 1 == 0;
    };


    /**
     * Returns whether the supplied number is finite and not NaN.
     * @param {number} num The number to test.
     * @return {boolean} Whether {@code num} is a finite number.
     */
    math.isFiniteNumber = function (num) {
        return isFinite(num) && !isNaN(num);
    };

    return math;
});
