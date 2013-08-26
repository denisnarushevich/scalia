define(["./Viewport", "./Canvas2dRenderer"], function (Viewport, Renderer) {
    /**
     * @constructor
     */
    function Graphics(game) {
        this.game = game;
        this.viewports = [];
        this.renderer = new Renderer(this);
    }

    var p = Graphics.prototype;

    /**
     * @type {Game}
     */
    p.game = null;

    /**
     * @type {Viewport[]}
     */
    p.viewports = null;

    p.start = function(){
        var viewports = this.viewports,
            viewportsCount = viewports.length;
        for(var i = 0; i < viewportsCount; i++){
            viewports[i].start();
        }
    }

    /**
     * @param {CameraComponent} camera
     * @return {Viewport}
     */
    p.createViewport = function(canvas){
        var viewport = new Viewport(this, canvas);
        this.viewports.push(viewport);
        return viewport;
    }

    /**
     * @return {void}
     */
    p.render = function(){
        var viewports = this.viewports,
            viewportsCount = viewports.length;
        for(var i = 0; i < viewportsCount; i++){
            viewports[i].render();
        }
    }

    return Graphics;
});
