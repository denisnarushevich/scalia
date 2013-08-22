define([
    './engine/config',
    './engine/Game',
    './engine/GameObject',
    './engine/Component',
    './engine/gameObjects/Camera',
    './engine/components/CameraComponent',
    './engine/components/TransformComponent',
    './engine/components/SpriteComponent',
    './engine/lib/gl-matrix',
    './engine/AssetManager',
    './engine/EventManager'
], function (config, Game, GameObject, Component, Camera, CameraComponent, TransformComponent, SpriteComponent, glMatrix, AssetManager, EventManager) {
    return window.scaliaEngine = {
        config: config,
        Game: Game,
        GameObject: GameObject,
        Component: Component,
        Camera: Camera,
        CameraComponent: CameraComponent,
        TransformComponent: TransformComponent,
        SpriteComponent: SpriteComponent,
        glMatrix: glMatrix,
        Assets: AssetManager,
        EventManager: EventManager
    };
});