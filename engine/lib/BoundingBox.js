define(function(){
    function BoundingBox(){
        
    }

    /**
     * Calculates bounding box out of vertices.
     * @param {Array} vertices
     * @return {BoundingBox}
     */
    BoundingBox.Calculate = function(vertices){
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

        var bbox = new BoundingBox();

        bbox.minPoint = [minX, minY, minZ];
        bbox.maxPoint = [maxX, maxY, maxZ];
        bbox.position = [maxX - (maxX - minX)/2, maxY - (maxY - minY)/2, maxZ - (maxZ - minZ)/2];

        return bbox;
    }
    
    var p = BoundingBox.prototype;


    /**
     * Position of center point, relatively to objects center point
     * @type {int[]}
     */
    p.position = null;

    p.minPoint = null;

    p.maxPoint = null;

    return BoundingBox;
})
