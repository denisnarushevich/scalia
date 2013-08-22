define(["./Octree/Node", "./BoundingBox", "./Octree/Item"], function(Node, BoundingBox, Item) {
    /**
     * @param {number} min Root bounding box min XYZ value.
     * @param {number} max Root bounding box max XYZ value.
     * @param {int} maxDepth
     * @param {int} treshold
     * @constructor
     */
    function Octree(min, max, maxDepth, treshold) {
        this.maxDepth = maxDepth;
        this.treshold = treshold;
        this.root = Node.Create(new Float32Array([min, min, min]), new Float32Array([max, max, max]), this);
    }
    
    Octree.Node = Node;
    Octree.Item = Item;

    var p = Octree.prototype;

    /**
     * Limit when node should subdivide
     * @type {int}
     */
    p.treshold = null;

    /**
     * @type {int}
     */
    p.maxDepth = null;

    /**
     * Root node of tree
     * @type {Node}
     */
    p.root = null;

    /**
     * Inserts bounding box into octtree.
     * @param {BoundingBox} item
     * @returns {boolean} Return false, if bounding box lies outside of octtree
     */
    p.Insert = function(item) {
        if (item.type === Item.BOUNDS) {
            if (BoundingBox.Contains(this.root.bounds, item.data)) {
                Node.Insert(this.root, item);
                return true;
            }
        } else {
            if (BoundingBox.ContainsPoint(this.root.bounds, item.data)) {
                Node.Insert(this.root, item);
                return true;
            }
        }
        return false;
    }

    /**
     * Remove bounding box from octree
     * @param {BoundingBox} item
     * @returns {boolean} True on success, else false.
     */
    p.Remove = function(item) {
        if (item.type === Item.BOUNDS){
            if (BoundingBox.Contains(this.root.bounds, item.data))
                return Node.Remove(this.root, item);
        }else{
            if (BoundingBox.ContainsPoint(this.root.bounds, item.data))
                return Node.Remove(this.root, item);
        }
        
        return false;
    }

    /**
     * Returns array of bounding boxes, that lies near given bounding box.
     * @param {BoundingBox} item
     * @param Array out Array that will be filled with result items
     * @returns {BoundingBox[]}
     */
    p.Retrieve = function(item, out) {
        return Node.Retrieve(this.root, item, (out === undefined ? out = [] : out));
    }

    return Octree;
}
);
