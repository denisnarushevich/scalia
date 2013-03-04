define(["../Component"], function(Component){

    /**
     * Camera component represents camera, observer.
     * It's main purpose is to tell what it see.
     * It doesn't need to render anything, but just have a list of gameObjects, that
     * are positioned inside camera view frustrum.
     * @constructor
     */

    function CameraComponent(gameObject){
        Component.call(this, gameObject);
        this.visibles = [];
    }

    var p = CameraComponent.prototype = Object.create(Component.prototype);

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

        //TODO: do search starting from camera, rather from world root. Think about using OctTree

        var gameObjects = this.gameObject.world.gameObjects,
            gameObjectsCount = gameObjects.length,
            gameObject;

        for (var i = 0, j = 0; i < gameObjectsCount; i++) {
            gameObject = gameObjects[i];
            if(this.IsVisible(gameObject)){
                this.visibles[j++] = gameObject;
            }
        }
    }

    p.Tick = function(){
        this.DetectVisibles();
        //scaliaEngine.utils.glMatrix.mat4.rotate(this.matrix, this.matrix, Math.PI/180 * 1, [1,1,1]);
    }

    return CameraComponent;
});

