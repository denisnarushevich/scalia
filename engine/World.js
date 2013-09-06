define(['./lib/Octree'], function (Octree) {

    /**
     * @param {Logic} logic
     * @constructor
     */
    function World(logic, useOctree) {
        this.logic = logic;
        this.gameObjects = [];

        if (useOctree === true)
            this.octree = new Octree(8, 20)

        this.removeQueue = [];
    }

    var p = World.prototype;

    /**
     * @type {Logic}
     */
    p.logic = null;

    /**
     * Reference to octree which will be used to partition space of the world
     * @type {null}
     * @private
     */
    p.octree = null;

    /**
     * @type {GameObject[]}
     * @private
     */
    p.gameObjects = null;

    /**
     * @type {number}
     * @private
     */
    p.gameObjectsCount = 0;

    /**
     * @private
     * @type {[]}
     */
    p.removeQueue = null;

    /**
     * @private
     * @type {boolean}
     */
    p.removeQueueWaiting = false;

    /**
     * @private
     * @type {boolean}
     */
    p.started = false;

    /**
     * Array with gameObjects
     * @param {GameObject} gameObject
     */
    p.addGameObject = function (gameObject) {
        this.gameObjects[this.gameObjectsCount++] = gameObject;
        gameObject.setWorld(this);

        if (this.octree !== null) {
            var item = new Octree.Item(gameObject.transform.getPosition());
            gameObject.item = item;
            item.gameObject = gameObject;
            var octree = this.octree;
            item.callback = function (transform) {
                octree.Remove(item);
                transform.getPosition(item.data);
                octree.Insert(item);
            };
            this.octree.Insert(item);
            gameObject.transform.addEventListener(gameObject.transform.events.update, item.callback);
        }


        if (this.started)
            gameObject.start();

        if (gameObject.transform.children.length !== 0) {
            for (var i = 0; i < gameObject.transform.children.length; i++) {
                var child = gameObject.transform.children[i].gameObject;
                this.addGameObject(child);
            }
        }
    }

    /**
     * Puts game object in queue to remove.
     * Game object will be removed at the end of tick
     * @param {GameObject} gameObject
     */
    p.removeGameObject = function (gameObject) {
        //put GO's children in queue first, because they may be dependant on GO
        //therefore should be deleted first
        if (gameObject.transform.children.length !== 0) {
            for (var i = 0; i < gameObject.transform.children.length; i++) {
                var child = gameObject.transform.children[i].gameObject;
                this.removeGameObject(child);
            }
        }

        this.removeQueue.push(gameObject);
        this.removeQueueWaiting = true;
    }

    p.retrieve = function (gameObject) {
        if (this.octree !== null) {
            var items = this.octree.Retrieve(gameObject.item);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                items[i] = item.gameObject;
            }
            return items;
        }
        return this.gameObjects.slice(0);
    }

    p.start = function () {
        for (var i = 0; i < this.gameObjectsCount; i++) {
            this.gameObjects[i].start();
        }
        this.started = true;
    }

    p.tick = function () {
        //var t0 = Date.now();

        var i,
            len = this.gameObjectsCount,
            gos = this.gameObjects;

        for (i = 0; i < len; i++)
            gos[i].tick();

        if(this.removeQueueWaiting){
            var len = this.removeQueue.length;

            for(i = 0; i < len; i++){
                this.gameObjects.splice(this.gameObjects.indexOf(this.removeQueue.pop()), 1);
                this.gameObjectsCount--;
            }

            this.removeQueueWaiting = false;
        }

        //console.log(Date.now() - t0);
    }

    p.findByName = function(name){
        var result = [],
            gameObjects = this.gameObjects,
            len = this.gameObjectsCount,
            gameObject,
            i;

        for(i = 0; i < len; i++){
            gameObject = gameObjects[i];
            if(gameObject.name === name){
                result.push(gameObject);
            }
        }

        if(result.length === 1)
            return result[0];
        else if(result.length > 1)
            return result;
        else
            return false;
    }

    return World;
});