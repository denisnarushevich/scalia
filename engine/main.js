/*RAF shim*/
window.requestAnimFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

define([
    './config',
    './Game',
    './GameObject',
    './Component',
    './gameObjects/Camera',
    './components/CameraComponent',
    './components/TransformComponent',
    './components/SpriteRenderer',
    './lib/gl-matrix',
    './AssetManager',
    './components/PathRenderer',
    './components/TextRenderer'
], function (config, Game, GameObject, Component, Camera, CameraComponent, TransformComponent, SpriteRenderer, glMatrix, AssetManager, PathRenderer, TextRenderer) {
    return window.scaliaEngine = {
        config: config,
        Game: Game,
        GameObject: GameObject,
        Component: Component,
        Camera: Camera,
        CameraComponent: CameraComponent,
        TransformComponent: TransformComponent,
        SpriteRenderer: SpriteRenderer,
        glMatrix: glMatrix,
        Assets: AssetManager,
        PathRenderer: PathRenderer,
        TextRenderer: TextRenderer,
    };
});