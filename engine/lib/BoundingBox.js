define(function(){
    var BoundingBox = {};

    BoundingBox.Create = function(min, max){
        return {
            min: min,
            max: max,
            position: null
        };
    }

    /**
     * Calculates bounding box out of vertices.
     * @param {Array} vertices
     * @return {BoundingBox}
     */
    BoundingBox.Calculate = function(boundingBox, vertices){
        var maxX = 0,
            minX = 0,
            maxY = 0,
            minY = 0,
            maxZ = 0,
            minZ = 0,
            verticesCount = vertices.length,
            vertex, i;
        
        for(i = 0; i < verticesCount; i++){
            vertex = vertices[i];
            
            
            if(vertex[0] > maxX)
                maxX = vertex[0];
            else if(vertex[0] < minX)
                minX = vertex[0];

            
            if(vertex[1] > maxY)
                maxY = vertex[1];
            else if(vertex[1] < minY)
                minY = vertex[1];

            
            if(vertex[2] > maxZ)
                maxZ = vertex[2];
            else if(vertex[2] < minZ)
                minZ = vertex[2];
        }

        boundingBox.min = [minX, minY, minZ];
        boundingBox.max = [maxX, maxY, maxZ];
        boundingBox.position = [maxX - (maxX - minX)/2, maxY - (maxY - minY)/2, maxZ - (maxZ - minZ)/2];

        return boundingBox;
    }

    BoundingBox.Intersects = function(a, b){
        return !(a.min[0] > b.max[0] || a.max[0] < b.min[0] || a.min[1] > b.max[1] || a.max[1] < b.min[1] || a.min[2] > b.max[2] || a.max[2] < b.min[2]);
    }

    BoundingBox.Contains = function(a, b){
        return b.min[0] >= a.min[0] && b.max[0] <= a.max[0] && b.min[1] >= a.min[1] && b.max[1] <= a.max[1] && b.min[2] >= a.min[2] && b.max[2] <= a.max[2];
    }

    BoundingBox.ContainsPoint = function(box, point){
        return point[0] >= box.min[0] && point[0] <= box.max[0] && point[1] >= box.min[1] && point[1] <= box.max[1] && point[2] >= box.min[2] && point[2] <= box.max[2];
    }

    return BoundingBox;
});
