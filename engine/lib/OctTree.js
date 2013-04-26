define(["./OctTree/Node"], function(Node){
    function OctTree(minPoint, maxPoint){
        this.nodesCount = 0;
        this.root = new Node([minPoint, minPoint, minPoint], [maxPoint, maxPoint, maxPoint], this);
    }

    var p = OctTree.prototype;

    p.nodesCount = null;

    /**
     * Root node of tree
     * @type {Node}
     */
    p.root = null;

    /**
     * Inserts point to oct tree
     * @param {Array} point Vector3
     */
    p.Insert = function(point){
        this.root.Insert(point);
    }

    window.octTree = OctTree;

    return OctTree;
});
