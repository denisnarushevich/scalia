define(["./BehaviorComponent"], function(BehaviorComponent){

    /**
     * Camera component represents camera, observer.
     * It's main purpose is to tell what it see.
     * It doesn't need to render anything, but just have a list of gameObjects, that
     * are positioned inside camera view frustrum.
     * @constructor
     */

    function Camera(){
        this.visibles = [];
    }

    var p = Camera.prototype = Object.create(BehaviorComponent.prototype);

    p.componentName = "camera";

    /**
     * array of gameObjects, that are visible to the camera.
     * @type {GameObject[]}
     */
    p.visibles = null;

    p.size = [100, 100];

    p.IsVisible = function (gameObject) {
        var posX = gameObject.transform.position[0],
            posY = gameObject.transform.position[1];

        return gameObject.id != this.gameObject.id &&
            posX > this.gameObject.transform.position[0] - this.size[0]/2 &&
            posX < this.gameObject.transform.position[0] + this.size[0]/2 &&
            posY > this.gameObject.transform.position[1] - this.size[1]/2 &&
            posY < this.gameObject.transform.position[1] + this.size[1]/2;
    }

    p.DetectVisibles = function(){
        this.visibles = [];
        var gameObjects = this.gameObject.root.children,
            gameObjectsCount = gameObjects.length,
            gameObject;

        for (var i = 0, j = 0; i < gameObjectsCount; i++) {
            gameObject = gameObjects[i];
            if(this.IsVisible(gameObject)){
                this.visibles[j++] = gameObject;
            }
        }
    }

    p.Update = function(){
        this.DetectVisibles();
    }

    return Camera;
});

