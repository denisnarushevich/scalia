define(function () {
    Box = {};

    /**
     * Checks intersection between two 3d boxes.
     * @param {number[][]} Box array of position vector, and volume vector.
     * @param {number[][]} Box array of position vector, and volume vector.
     */
    Box.intersect = function (a, b) {
        var aPos = a[0],
            aVol = a[1],
            bPos = b[0],
            bVol = b[1];

        if (bPos[0] < aPos[0] + aVol[0] && bPos[0] + bVol[0] > aPos[0])
            if (bPos[1] < aPos[1] + aVol[1] && bPos[1] + bVol[1] > aPos[1])
                return !!(bPos[2] < aPos[2] + aVol[2] && bPos[2] + bVol[2] > aPos[2]);

        return false;
    }

    return Box;
});