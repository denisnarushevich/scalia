define(["./BehaviorComponent"], function(BehaviorComponent){
    function Camera(){
        this.visibles = [];
    }

    var p = Camera.prototype = Object.create(BehaviorComponent.prototype);

    p.componentName = "Camera";

    /**
     * array of gameObjects, that are visible to the camera.
     * @type {GameObject[]}
     */
    p.visibles = null;

    p.size = [10000,10000];

    p.IsVisible = function (gameObject) {
        var posX = gameObject.transform.position[0],
            posY = gameObject.transform.position[1];

        return gameObject.id != this.gameObject.id &&
            posX > this.gameObject.transform.position[0] - this.size[0] &&
            posX < this.gameObject.transform.position[0] + this.size[0] &&
            posY > this.gameObject.transform.position[1] - this.size[1] &&
            posY < this.gameObject.transform.position[1] + this.size[1];
    }

    p.DetectVisibles = function(){
        this.visibles = [];
        var gameObjects = this.gameObject.root.children,
            gameObjectsCount = gameObjects.length,
            gameObject;

        for (var i = 0; i < gameObjectsCount; i++) {
            gameObject = gameObjects[i];
            if(this.IsVisible(gameObject)){
                this.visibles[i] = gameObject;
            }
        }
    }

    p.Update = function(){
        this.DetectVisibles();
    }

    return Camera;
});

