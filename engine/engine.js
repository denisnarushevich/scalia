define([
    './utils/base',
    './Game',
    './GameObject',
    './Component',
    './gameObjects/Camera',
    './gameObjects/Cube',
    './components/CameraComponent',
    './components/ShapeComponent',
], function (utils, Game, GameObject, Component, Camera, Cube, CameraComponent, ShapeComponent) {
    return window.scaliaEngine = {
        utils: utils,
        Game: Game,
        GameObject: GameObject,
        Component: Component,
        gameObjects: {
            Camera: Camera,
            Cube: Cube
        },
        components: {
            CameraComponent: CameraComponent,
            ShapeComponent: ShapeComponent
        }
    };
});