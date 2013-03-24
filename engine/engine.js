define([
    './utils/base',
    './Game',
    './GameObject',
    './Component',
    './gameObjects/Camera',
    './gameObjects/Cube',
    './gameObjects/Plane',
    './components/CameraComponent',
    './components/ShapeComponent',
], function (utils, Game, GameObject, Component, Camera, Cube, Plane, CameraComponent, ShapeComponent) {
    return window.scaliaEngine = {
        utils: utils,
        Game: Game,
        GameObject: GameObject,
        Component: Component,
        gameObjects: {
            Camera: Camera,
            Cube: Cube,
            Plane: Plane
        },
        components: {
            CameraComponent: CameraComponent,
            ShapeComponent: ShapeComponent
        }
    };
});