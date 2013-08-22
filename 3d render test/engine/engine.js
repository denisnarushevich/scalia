define([
    './utils/base',
    './Game',
    './GameObject',
    './Component',
    './gameObjects/Axis',
    './gameObjects/Camera',
    './gameObjects/Cube',
    './gameObjects/Plane',
    './components/CameraComponent',
    './components/MeshComponent',
    './components/TransformComponent',
    './components/SpriteComponent',
], function (utils, Game, GameObject, Component, Axis, Camera, Cube, Plane, CameraComponent, MeshComponent, TransformComponent, SpriteComponent) {
    return window.scaliaEngine = {
        utils: utils,
        Game: Game,
        GameObject: GameObject,
        Component: Component,
        gameObjects: {
            Axis: Axis,
            Camera: Camera,
            Cube: Cube,
            Plane: Plane
        },
        components: {
            CameraComponent: CameraComponent,
            MeshComponent: MeshComponent,
            TransformComponent: TransformComponent,
            SpriteComponent: SpriteComponent
        }
    };
});