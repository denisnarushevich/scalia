define(function (require) {
    var assets = require("./AssetManager");

    function SpriteMgr() {

    }

    SpriteMgr.Sprite = function Sprite() {
        this.sourceImage = new Image()
        this.offsetX = 0;
        this.offsetY = 0;
        this.width = 0;
        this.height = 0;
    }

    SpriteMgr.prototype.getSprite = function (name, onsuccess) {
        //check if sprite with given name is present in atlas
        //if not, look for image file with given name

        //(/(.+?)(\.[^.]*$|$)/).exec(name)[1]+".json"

        var sprite = new SpriteMgr.Sprite();

        assets.getAsset(name, function (image) {
            sprite.sourceImage = image;
            sprite.width = image.width;
            sprite.height = image.height;
            onsuccess !== undefined && onsuccess(sprite);
        }, undefined, assets.returnTypeEnum.image);

        return sprite;
    };

    var mgr = new SpriteMgr();
    mgr.Sprite = SpriteMgr.Sprite;

    return mgr;
});

