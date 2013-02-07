define([
    './utils/base',
    './Game',
    './GameObject',
    './Component',
    './gameObjects/CameraObject',
    './components/CameraComponent',
    './components/RendererComponent',
    './components/BehaviorComponent'
], function (utils, Game, GameObject, Component, CameraObject, CameraComponent, RendererComponent, BehaviorComponent) {
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
            RendererComponent: RendererComponent,
            BehaviorComponent: BehaviorComponent
        }
    };
});