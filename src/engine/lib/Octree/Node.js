define(["../BoundingBox", "./Item"], function (BoundingBox, Item) {
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
    Node.Create = function (min, max, tree, parent) {
        return {
            tree: tree,
            parent: parent,
            depth: parent === undefined ? 0 : parent.depth + 1,
            type: 0,
            items: [],
            nodes: null,
            count: 0,
            nodesCount: 0,
            nodesMask: 0,
            bounds: new BoundingBox(min, max)
        }
    }

    /**
     * Creates subnode with set bounds accordingly to parent node and subnodes position defined by index.
     * @param node
     * @param index
     * @returns {*}
     */
    Node.CreateSubNode = function (node, index) {
        var bmin = node.bounds.min,
            center = node.bounds.center,
            halfX = center[0] - bmin[0],
            halfY = center[1] - bmin[1],
            halfZ = center[2] - bmin[2],
            min = new Array(3);
        min[0] = bmin[0] + halfX * (index & 1); //take first bit of index
        min[1] = bmin[1] + halfY * ((index >>= 1) & 1); //take second bit
        min[2] = bmin[2] + halfZ * (index >> 1); //take 3rd bit. There shouldn't be more than 3 bits, so we don't do "& 1"
        max = new Array(3);
        max[0] = min[0] + halfX;
        max[1] = min[1] + halfY;
        max[2] = min[2] + halfZ;

        return Node.Create(min, max, node.tree, node);
    }

    /**
     * Insert item into given node.
     * @param node Node to insert in
     * @param {BoundingBox} item Item to insert
     */
    Node.Insert = function (node, item) {
        node.count++;

        if (node.type === Node.LEAF) {
            node.items.push(item);

            if (node.count >= node.tree.treshold)
                Node.Split(node);
        } else {
            var mask = Node.IndexesOf(node, item);

            for (var i = 0; mask > 0; mask >>= 1, i++)
                if (mask & 1) {
                    if (node.nodes[i] === undefined) {
                        node.nodes[i] = Node.CreateSubNode(node, i);
                        node.nodesCount++;
                        node.nodesMask |= (1<<i);
                    }
                    Node.Insert(node.nodes[i], item);
                }
        }
    }

    /**
     * Remove item from given node.
     * @param node Node to remove from
     * @param {BoundingBox} item Item to remove
     */
    Node.Remove = function (node, item) {
        if (node.type === Node.LEAF) {
            var index = node.items.indexOf(item);

            if (index >= 0) {
                node.items.splice(index, 1);
                node.count--;

                return true;
            } else
                return false;
        } else {
            var r = true,
                mask = Node.IndexesOf(node, item),
                nodes = node.nodes;

            for (var i = 0; mask > 0; mask >>= 1, i++) {
                if (mask & 1) {
                    if (Node.Remove(nodes[i], item)) {
                        if (nodes[i].count === 0){
                            //delete nodes[i];
                            nodes[i] = undefined;
                            node.nodesCount--;
                            node.nodesMask ^= (1<<i);
                        }
                    } else {
                        r = false;
                    }
                }
            }

            if (r === true)
                node.count--;

            if (node.count < node.tree.treshold)
                Node.Merge(node);

            return r;
        }
    }

    /**
     * Splits given node into 8 subnodes. Empty subnodes are not created.
     * @param node
     */
    Node.Split = function (node) {
        if (node.depth > node.tree.maxDepth)
            return;

        if(node.bounds.max[0] - node.bounds.min[0] <= node.tree.tearDrop)
            return;

        var items = node.items,
            itemsCount = items.length;

        node.type = Node.BRANCH;
        node.nodes = [];
        node.items = null;

        for (var i = 0; i < itemsCount; i++) {
            var item = items[i],
                mask = Node.IndexesOf(node, item);

            for (var j = 0; mask > 0; mask >>= 1, j++)
                if (mask & 1) {
                    if (node.nodes[j] === undefined) {
                        node.nodes[j] = Node.CreateSubNode(node, j);
                        node.nodesCount++;
                        node.nodesMask |= (1<<j);
                    }
                    Node.Insert(node.nodes[j], item);
                }
        }
    }

    /**
     * Merges subnodes of given node.
     * @param node
     */
    Node.Merge = function (node) {
        var childNode,
            nodes = node.nodes,
            childNodeItems,
            childNodeItemsLen,
            mask = node.nodesMask;

        node.type = Node.LEAF;
        node.nodes = null;
        //node.items = [];
        node.nodesCount = 0;
        node.nodesMask = 0;

        for (var i = 0; mask > 0; mask >>= 1, i++)
            if (mask & 1) {
                childNode = nodes[i];

                if(node.items === null){
                    node.items = childNode.items;
                    continue;
                }

                childNodeItems = childNode.items;
                childNodeItemsLen = childNodeItems.length;

                for (var j = 0; j < childNodeItemsLen; j++) {
                    if (node.items.indexOf(childNodeItems[j]) === -1)
                        node.items.push(childNodeItems[j]);
                }
            }
    }

    Node.IndexesOf = function (node, item) {
        if (item.type === Item.BOUNDS) {
            var item0 = item.data.min,
                item1 = item.data.max,
                center = node.bounds.center,
                halfX = center[0],
                halfY = center[1],
                halfZ = center[2],
                p0 = 0, p1 = 0;

            if (item0[2] >= halfZ) {
                p0 = 4;
                p1 = 4;
            } else if (item1[2] >= halfZ) {
                p1 = 4;
            }

            if (item0[1] >= halfY) {
                p0 |= 2;
                p1 |= 2;
            } else if (item1[1] >= halfY) {
                p1 |= 2;
            }

            if (item0[0] >= halfX) {
                p0 |= 1;
                p1 |= 1;
            } else if (item1[0] >= halfX) {
                p1 |= 1;
            }

            if (p0 === p1) {
                return 1 << p0;
            } else {
                return (1 << p0) |
                    (1 << (p0 & 1 | p1 & 6)) |
                    (1 << (p0 & 2 | p1 & 5)) |
                    (1 << (p0 & 3 | p1 & 4)) |
                    (1 << (p0 & 4 | p1 & 3)) |
                    (1 << (p0 & 5 | p1 & 2)) |
                    (1 << (p0 & 6 | p1 & 1)) |
                    (1 << p1);

            }
        } else {
            var item = item.data,
                halfX = node.bounds.center[0],
                halfY = node.bounds.center[1],
                halfZ = node.bounds.center[2],
                p = 0;

            if (item[2] >= halfZ)
                p = 4;

            if (item[1] >= halfY)
                p |= 2;

            if (item[0] >= halfX)
                p |= 1;

            return 1 << p;
        }
    }


    /**
     * Return array of items near giver item.
     * @param node
     * @param item
     * @param {Array} resultArray
     * @returns {*}
     */
    Node.Retrieve = function (node, item, resultArray) {
        if (node.count === 0)
            return resultArray;

        if (node.type === Node.BRANCH) {
            var mask = Node.IndexesOf(node, item);

            for (var i = 0; mask > 0; mask >>= 1, i++) {
                if (mask & 1) {
                    if (node.nodes[i] !== undefined)
                        Node.Retrieve(node.nodes[i], item, resultArray);
                }
            }
        } else {
            var items = node.items,
                itemsLen = items.length,
                item, item2;

            if (itemsLen > 0) {
                for (i = 0; i < itemsLen; i++) {
                    item2 = items[i];

                    if (item2 === item)
                        continue;

                    if (resultArray.indexOf(item2) < 0) //Bottleneck!!!
                        resultArray.push(item2);
                }
            }
        }

        return resultArray;
    }

    /**
     * @param node
     * @param index Index of subnode where the current node will be placed
     * @constructor
     */
    Node.Grow = function (node, index) {
        if (node.parent !== undefined)
            return false;

        var bounds = node.bounds,
            min = bounds.min,
            max = bounds.max,
            w = max[0] - min[0],
            h = max[1] - min[1],
            d = max[2] - min[2],
            newMin = [
                min[0] - w * (index & 1), //001 extract x
                min[1] - h * ((index & 2) >> 1), //010 extract y
                min[2] - d * ((index & 4) >> 2), //100 extract z
            ],

            newMax = [
                newMin[0] + w * 2,
                newMin[1] + h * 2,
                newMin[2] + d * 2
            ],
            node2;

        if (node.type === Node.BRANCH) {
            node2 = Node.Create(newMin, newMax, node.tree);
            Node.Split(node2);
            node2.nodes[index] = node;
            node2.count = node.count;
            node2.nodesCount = 1;
            node2.nodesMask = 1<<index;
            node.parent = node2;
            Node.UpdateDepth(node);
            return node2;
        } else {
            //Expand existing root node
            node.bounds.min = newMin;
            node.bounds.max = newMax;
            node.bounds.calculateCenter();
            return node;
        }
    }


    var bitIndex = new Int8Array(255);
    bitIndex[2] = 1;
    bitIndex[4] = 2;
    bitIndex[8] = 3;
    bitIndex[16] = 4;
    bitIndex[32] = 5;
    bitIndex[64] = 6;
    bitIndex[128] = 7;

    Node.Shrink = function (node) {
        if (node.parent === undefined && node.type === Node.BRANCH) {
            if (node.nodesCount === 1) {
                var childNode = node.nodes[bitIndex[node.nodesMask]];
                childNode.parent = undefined;
                Node.UpdateDepth(childNode);
                return childNode;
            } else {
                return false;
            }
        } else
            return false;
    }

    Node.UpdateDepth = function (node) {
        node.depth = (node.parent === undefined ? 0 : node.parent.depth + 1);

        if (node.type === Node.BRANCH) {
            if (node.depth > node.tree.maxDepth)
                Node.Merge(node);
            else
                for (var i = 0; i < node.nodes.length; i++)
                    if (node.nodes[i] !== undefined)
                        Node.UpdateDepth(node.nodes[i]);
        } else {
            if (node.count >= node.tree.treshold)
                Node.Split(node);
        }
    }

    return Node;
})