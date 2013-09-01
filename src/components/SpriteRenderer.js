define(["../Component"], function (Component) {
    function Sprite() {
        Component.call(this);

        this.events = {
            ready: 0
        }
    }

    var p = Sprite.prototype = Object.create(Component.prototype);

    p.constructor = Sprite;

    p.image = new Image();

    p.width = 0;
    p.height = 0;

    p.pivotX = 0;
    p.pivotY = 0;

    p.offsetX = 0;
    p.offsetY = 0;

    p.layer = 0;

    p.setGameObject = function(gameObject){
        Component.prototype.setGameObject.call(this, gameObject);
        gameObject.spriteRenderer = this;
    }

    p.unsetGameObject = function(){
        this.gameObject.spriteRenderer = undefined;
        Component.prototype.unsetGameObject.call(this);
    }

    return Sprite;
});