define([
    './utils/base',
    './Game',
    './GameObject',
    './Component',
    './gameObjects/CameraObject',
    './components/CameraComponent',
    './components/BehaviorComponent',
    './components/ShapeComponent',
], function (utils, Game, GameObject, Component, CameraObject, CameraComponent, BehaviorComponent, ShapeComponent) {
    return window.scaliaEngine = {
        utils: utils,
        Game: Game,
        GameObject: GameObject,
        Component: Component,
        gameObjects:{
          CameraObject: CameraObject
        },
        components: {
            CameraComponent: CameraComponent,
            BehaviorComponent: BehaviorComponent,
            ShapeComponent: ShapeComponent
        }
    };
});