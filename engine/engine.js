define([
    './utils/base',
    './Game',
    './GameObject',
    './Component',
    './gameObjects/Axis',
    './gameObjects/Camera',
    './gameObjects/Cube',
    './gameObjects/Plane',
    './gameObjects/2DPlane',
    './components/CameraComponent',
    './components/ShapeComponent',
], function (utils, Game, GameObject, Component, Axis, Camera, Cube, Plane, Tile2D, CameraComponent, ShapeComponent) {
    return window.scaliaEngine = {
        utils: utils,
        Game: Game,
        GameObject: GameObject,
        Component: Component,
        gameObjects: {
            Axis: Axis,
            Camera: Camera,
            Cube: Cube,
            Plane: Plane,
            Tile2D: Tile2D
        },
        components: {
            CameraComponent: CameraComponent,
            ShapeComponent: ShapeComponent
        }
    };
});