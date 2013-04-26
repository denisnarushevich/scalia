define(["../BoundingBox"], function(BoundingBox){
    function Node(minPoint, maxPoint, tree){
        this.tree = tree;
        this.tree.nodesCount++;
        this.type = 0;
        this.points = [];
        this.count = 0;
        this.treshold = 2;
        this.bounds = new BoundingBox();
        this.bounds.minPoint = minPoint;
        this.bounds.maxPoint = maxPoint;
    }

    var p = Node.prototype;

    /**
     * link to tree instance
     * @type {null}
     */
    p.tree = null;

    /**
     * Type: 0:Leaf|1:Branch
     * @type {null}
     */
    p.type = null;

    /**
     * @type {Node}
     */
    p.parent = null;

    /**
     * @type {Node[]}
     */
    p.children = null;

    /**
     * Points inside this node. Null if type==branch.
     * @type {Array}
     */
    p.points = null;

    /**
     * Number of points in this node
     * @type {int}
     */
    p.count = null;

    p.treshold = null;

    /**
     * @type {BoundingBox}
     */
    p.bounds = null;


    p.Insert = function(point){
        var x = point[0],
            y = point[1],
            z = point[2];

        if(this.type === 0){
            this.points[this.count++] = point;

            if(this.count >= this.treshold)
                this.Subdivide();
        }else{
            //check each children node, and detect where point belongs
            for(var i = 0; i < 8; i++){
                var node = this.children[i];

                var minPoint = node.bounds.minPoint;
                var maxPoint = node.bounds.maxPoint;

                if(x < minPoint[0] || y < minPoint[1] || z < minPoint[2] || x > maxPoint[0] || y > maxPoint[1] || z > maxPoint[2])
                    continue;
                else
                    node.Insert(point); //put point in belonging children node
            }
        }
    }

    p.Subdivide = function(){
        var minPoint = this.bounds.minPoint,
            maxPoint = this.bounds.maxPoint,
            dimensions = [],
            centerPoint = [];

        scaliaEngine.utils.glMatrix.vec3.sub(dimensions, maxPoint, minPoint);
        scaliaEngine.utils.glMatrix.vec3.scale(centerPoint, dimensions, 1/2);

        //subdiveid points
        this.children = [];

        //far boxes
        this.children[0] = new Node(minPoint, centerPoint, this.tree); //far top left
        this.children[1] = new Node([centerPoint[0], minPoint[1], minPoint[2]], [maxPoint[0], centerPoint[1], centerPoint[2]], this.tree); //far top right
        this.children[2] = new Node([minPoint[0], centerPoint[1], minPoint[2]], [centerPoint[0], maxPoint[1], centerPoint[2]], this.tree); //far bottom left
        this.children[3] = new Node([centerPoint[0], centerPoint[1], minPoint[2]], [maxPoint[0], maxPoint[1], centerPoint[2]], this.tree); //far bottom right

        //close boxes
        this.children[4] = new Node([minPoint[0], minPoint[1], centerPoint[2]], [centerPoint[0], centerPoint[1], maxPoint[2]], this.tree); //close top left
        this.children[5] = new Node([centerPoint[0], minPoint[1], centerPoint[2]], [maxPoint[0], centerPoint[1], maxPoint[2]], this.tree); //close top right
        this.children[6] = new Node([minPoint[0], centerPoint[1], centerPoint[2]], [centerPoint[0], maxPoint[1], maxPoint[2]], this.tree); //close bottom left
        this.children[7] = new Node(centerPoint, maxPoint, this.tree); //close bottom right

        //type = branch
        this.type = 1;

        //put points in belonging sub boxes
        for(var i = 0; i < this.count; i++){
            this.Insert(this.points[i]);
        }

        this.points = null;
        this.count = 0;
    }

    return Node;
})