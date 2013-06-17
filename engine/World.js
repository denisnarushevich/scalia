define(["./lib/Octree"], function (Octree) {
    /**
     * @param {Logic} logic
     * @constructor
     */
    function World(logic) {
        this.logic = logic;
        this.gameObjects = [];
        this.octree = new Octree(-10000,10000,16, 16);
    }

    var p = World.prototype;

    /**
     * @type {Logic}
     */
    p.logic = null;

    /**
     * @type {GameObject[]}
     */
    p.gameObjects = null;

    /**
     * @type {number}
     */
    p.gameObjectsCount = 0;

    /**
     * @param {GameObject} gameObject
     */
    p.AddGameObject = function(gameObject){
        /*var octree = this.octree;
                           console.log(gameObject.mesh);
        this.octree.Insert(gameObject.mesh.bounds);

        gameObject.transform.AddListener("update", function(sender){
            octree.Remove(sender.gameObject.mesh.bounds);
            octree.Insert(sender.gameObject.mesh.bounds);
        });*/

        this.gameObjects[this.gameObjectsCount++] = gameObject;
        gameObject.world = this;
    }

    /*p.Retrieve = function(gameObject){
        boundsArr = this.octree.Retrieve(gameObject.bounds);
        for(var i = 0; i < boundsArr.length; i++){
            boundsArr[i] = this.boundsToGameObject[bounds]
        }
    }*/

    p.Tick = function(){
        for(var i = 0; i < this.gameObjectsCount; i++){
            this.gameObjects[i].Tick();
        }
    }

    return World;
});