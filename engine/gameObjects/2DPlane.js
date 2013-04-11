define(["../GameObject", "../components/SpriteComponent"], function (GameObject, SpriteComponent) {
    function Plane() {
        GameObject.call(this);
            var s;
        this.AddComponent(s = new SpriteComponent(this));
        s.image = new Image();
        s.image.src = "2222.png";
        s.width = 64;
        s.height = 31;
    }

    var p = Plane.prototype = Object.create(GameObject.prototype);

    p.Tick = function () {
        GameObject.prototype.Tick.call(this);
    }

    return Plane;
});