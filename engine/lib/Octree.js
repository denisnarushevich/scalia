define(["./Octree/Node", "./BoundingBox", "./Octree/Item"], function (Node, BoundingBox, Item) {

        /**
         * @param {number} min Root bounding box min XYZ value.
         * @param {number} max Root bounding box max XYZ value.
         * @param {int} maxDepth
         * @param {int} treshold
         * @constructor
         */
        function Octree(maxDepth, treshold, tearDrop) {
            this.maxDepth = maxDepth || 8;
            this.treshold = treshold || 8;
            this.tearDrop = tearDrop || 1;
        }

        Octree.Item = Item;
        Octree.Node = Node;

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
         * Minimal size of node bounds
         * @type {number}
         */
        p.tearDrop = 0;

        /**
         * Root node of tree
         * @type {Node}
         */
        p.root = null;

        /**
         * Inserts bounding box into octree.
         * @param {BoundingBox} item
         * @returns {*}
         */
        p.Insert = function (item) {
            if (item.type === Item.BOUNDS) {
                if(this.root === null){
                    var c = item.data.center;
                    this.root = Node.Create(
                        [c[0]-0.5, c[1]-0.5, c[2]-0.5],
                        [c[0]+0.5, c[1]+0.5, c[2]+0.5],
                        this
                    );
                }

                if (this.root.bounds.Contains(item.data)) {
                    Node.Insert(this.root, item);
                }else{
                    var dx = this.root.bounds.center[0] - item.data.center[0],
                        dy = this.root.bounds.center[1] - item.data.center[1],
                        dz = this.root.bounds.center[2] - item.data.center[2];
                    this.Grow(dx,dy,dz);
                    this.Insert(item);
                }
            } else {
                if(this.root === null){
                    var p = item.data;
                    this.root = Node.Create(
                        [p[0]-0.5, p[1]-0.5, p[2]-0.5],
                        [p[0]+0.5, p[1]+0.5, p[2]+0.5],
                        this
                    );
                }

                if (this.root.bounds.ContainsPoint(item.data)) {
                    Node.Insert(this.root, item);
                }else{
                    var dx = this.root.bounds.center[0] - item.data[0],
                        dy = this.root.bounds.center[1] - item.data[1],
                        dz = this.root.bounds.center[2] - item.data[2];
                    this.Grow(dx,dy,dz);

                    this.Insert(item);
                }
            }
        }

        /**
         * Remove bounding box from octree
         * @param {BoundingBox} item
         * @returns {boolean} True on success, else false.
         */
        p.Remove = function (item) {
            if (item.type === Item.BOUNDS) {
                if (this.root.bounds.Contains(item.data))  {
                    var r = Node.Remove(this.root, item);
                    if(r === true){
                        this.Shrink()
                    }

                    if(this.root.count === 0)
                        this.root = null;

                    return r;
                }
            } else {
                if (this.root.bounds.ContainsPoint(item.data))  {
                    var r = Node.Remove(this.root, item);
                    if(r === true){
                        this.Shrink()
                    }

                    if(this.root.count === 0)
                        this.root = null;

                    return r;
                }
            }

            return false;
        }

        /**
         * Returns array of bounding boxes, that lies near given bounding box.
         * @param {BoundingBox} item
         * @param Array out Array that will be filled with result items
         * @returns {BoundingBox[]}
         */
        p.Retrieve = function (item, out) {
            var r = out || [] ;
            if(this.root)
                Node.Retrieve(this.root, item, r);

            return r;
        }

        p.Grow = function (x,y,z) {
            if(x >= 0)
                x = 1;
            else
                x = 0;

            if(y >= 0)
                y = 1;
            else
                y = 0;

            if(z >= 0)
                z = 1;
            else
                z = 0;

            var index = (z << 2) + (y << 1) + x;

            this.root = Node.Grow(this.root, index);
        }

        p.Shrink = function(){
            var newRoot = Node.Shrink(this.root);
            if(newRoot !== false)
                this.root = newRoot;
        }


        return Octree;
    }
);
