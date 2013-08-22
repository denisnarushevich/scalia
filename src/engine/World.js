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

    p.removeGameObject = function (gameObject) {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
        this.gameObjectsCount--;

        if (gameObject.transform.children.length !== 0) {
            for (var i = 0; i < gameObject.transform.children.length; i++) {
                var child = gameObject.transform.children[i].gameObject;
                this.removeGameObject(child);
            }
        }
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
        this.started = true;
        for (var i = 0; i < this.gameObjectsCount; i++)
            this.gameObjects[i].start();
    }

    p.tick = function () {
        for (var i = 0; i < this.gameObjectsCount; i++) {
            this.gameObjects[i].tick();
        }
    }

    return World;
});