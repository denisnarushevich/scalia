define(["../BoundingBox", "./Item"], function(BoundingBox, Item) {
    var Node = {};

    Node.LEAF = 0;
    Node.BRANCH = 1;

    /**
     * @param {float[]} min Vector3 representing min point of node bounds.
     * @param {float[]} max Vector3 representing max point of node bounds.
     * @param {OctTree} tree Reference to octTree
     * @param {Node} parent Parent node
     * @returns {{tree: *, parent: *, depth: number, type: number, items: Array, nodes: null, count: number, bounds: {min: *, max: *}}}
     * @constructor
     */
    Node.Create = function(min, max, tree, parent) {
        return {
            tree: tree,
            parent: parent,
            depth: parent === undefined ? 0 : parent.depth + 1,
            type: 0,
            items: [],
            nodes: null,
            count: 0,
            bounds: BoundingBox.Create(min, max)
        }
    }

    /**
     * Insert item into given node.
     * @param node Node to insert in
     * @param {BoundingBox} item Item to insert
     */
    Node.Insert = function(node, item) {
        node.count++;

        if (node.type === Node.LEAF) {
            node.items.push(item);

            if (node.count >= node.tree.treshold)
                Node.Split(node);
        } else {
            var index = Node.DetectSubNode(node, item);

            if (index === -1) { //if item is to big for child nodes..
                node.items.push(item); //..put it in current node.
            } else
                Node.Insert(node.nodes[index] || (node.nodes[index] = Node.CreateSubNode(node, index)), item);
        }
    }

    /**
     * Remove item from given node.
     * @param node Node to remove from
     * @param {BoundingBox} item Item to remove
     */
    Node.Remove = function(node, item) {
        if (node.type === Node.LEAF) {
            var index = node.items.indexOf(item);

            if (index !== -1) {
                node.items.splice(index, 1);
                node.count--;

                return true;
            } else {
                return false;
            }
        } else {
            var index = Node.DetectSubNode(node, item);


            if (index === -1) {
                var i = node.items.indexOf(item);

                if (i !== -1) {
                    node.items.splice(i, 1);
                    node.count--;
                    return true;
                } else {
                    return false;
                }
            } else {

                var subNode = node.nodes[index];

                if (subNode === undefined) {
                    return false;
                } else {
                    if (Node.Remove(subNode, item)) {
                        if (--node.count < node.tree.treshold)
                            Node.Merge(node);
                        else if (subNode.count === 0)
                            delete node.nodes[index];

                        return true;
                    } else
                        return false;
                }

            }
        }
    }

    /**
     * Splits given node into 8 subnodes. Empty subnodes are not created.
     * @param node
     */
    Node.Split = function(node) {
        if (node.depth > node.tree.maxDepth)
            return;

        node.type = Node.BRANCH;   //FIX: if no items were move to childNode then we are not branch
        node.nodes = [];

        var items = node.items,
                itemsCount = items.length;

        node.items = [];
        node.count = 0;

        for (var i = 0; i < itemsCount; i++)
            Node.Insert(node, items[i]);
    }

    /**
     * Merges subnodes of given node.
     * @param node
     */
    Node.Merge = function(node) {
        var childNode;

        node.type = Node.LEAF;

        for (var i = 0; i < 8; i++) {
            if ((childNode = node.nodes[i]) === undefined) {
                continue;
            }

            if (childNode.type === Node.BRANCH)
                Node.Merge(childNode);

            for (var j = 0; j < childNode.items.length; j++) {
                node.items.push(childNode.items[j]);
            }
        }

        node.nodes = null;
    }

    /**
     * Returns index representing subnodes position in which item should be located.
     * @param node
     * @param {BoundingBox} item
     * @returns {number}
     */
    Node.DetectSubNode = function(node, item) {
        if (item.type === Item.BOUNDS) {
            var min = node.bounds.min,
                    item = item.data,
                    max = node.bounds.max,
                    halfX = ((max[0] - min[0]) / 2),
                    halfY = ((max[1] - min[1]) / 2),
                    halfZ = ((max[2] - min[2]) / 2),
                    x0 = ((item.min[0] - min[0]) / halfX) | 0,
                    y0 = ((item.min[1] - min[1]) / halfY) | 0,
                    z0 = ((item.min[2] - min[2]) / halfZ) | 0,
                    x1 = ((item.max[0] - min[0]) / halfX) | 0,
                    y1 = ((item.max[1] - min[1]) / halfY) | 0,
                    z1 = ((item.max[2] - min[2]) / halfZ) | 0,
                    p0 = (x0 << 2) + (y0 << 1) + z0,
                    p1 = (x1 << 2) + (y1 << 1) + z1;

            if (p0 === p1) {
                return p0;
            } else {
                return -1;
            }
        } else {
            var min = node.bounds.min,
                    max = node.bounds.max,
                    item = item.data,
                    x0 = ((item[0] - min[0]) / ((max[0] - min[0]) / 2)) | 0,
                    y0 = ((item[1] - min[1]) / ((max[1] - min[1]) / 2)) | 0,
                    z0 = ((item[2] - min[2]) / ((max[2] - min[2]) / 2)) | 0,
                    p0 = (x0 << 2) + (y0 << 1) + z0;

            if (p0 >= 0 && p0 < 8) {
                return p0
            } else
                return -1;
        }
    }

    /**
     * Creates subnode with set bounds accordingly to parent node and subnodes position defined by index.
     * @param node
     * @param index
     * @returns {*}
     */
    Node.CreateSubNode = function(node, index) {
        var bmin = node.bounds.min,
                bmax = node.bounds.max,
                halfX = (bmax[0] - bmin[0]) / 2,
                halfY = (bmax[1] - bmin[1]) / 2,
                halfZ = (bmax[2] - bmin[2]) / 2,
                min = [
            bmin[0] + halfX * ((index & 4) >> 2),
            bmin[1] + halfY * ((index & 2) >> 1),
            bmin[2] + halfZ * (index & 1)
        ],
//                min = new Float32Array([
//            bmin[0] + halfX * ((index & 4) >> 2),
//            bmin[1] + halfY * ((index & 2) >> 1),
//            bmin[2] + halfZ * (index & 1)
//        ]),
                max = [min[0] + halfX, min[1] + halfY, min[2] + halfZ];
        //max = new Float32Array([min[0] + halfX, min[1] + halfY, min[2] + halfZ]);

        return Node.Create(min, max, node.tree, node);
    }

    /**
     * Return array of items near giver item.
     * @param node
     * @param item
     * @param {Array} resultArray
     * @returns {*}
     */
    Node.Retrieve = function(node, item, resultArray) {
        if (node.count === 0)
            return resultArray;

        var i, index, subnode,
                items = node.items,
                itemsLen = items.length;

        if (itemsLen > 0) {
            for (i = 0; i < itemsLen; i++)
                resultArray.push(items[i]);
        }

        if (node.type === Node.BRANCH) {
            index = Node.DetectSubNode(node, item);

            if (index === -1) {
                for (i = 0; i < 8; i++) {
                    subnode = node.nodes[i];
                    if (subnode !== undefined)
                        Node.Retrieve(subnode, item, resultArray);
                }
            } else {
                subnode = node.nodes[index];

                if (subnode !== undefined)
                    Node.Retrieve(subnode, item, resultArray);
            }
        }

        return resultArray;
    }

    return Node;
})