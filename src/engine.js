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
    './EventManager',
    './components/PathRenderer',
    './components/TextRenderer'
], function (config, Game, GameObject, Component, Camera, CameraComponent, TransformComponent, SpriteRenderer, glMatrix, AssetManager, EventManager, PathRenderer, TextRenderer) {
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
        EventManager: EventManager,
        PathRenderer: PathRenderer,
        TextRenderer: TextRenderer,
    };
});