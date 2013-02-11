require(["./engine/engine"], function (scaliaEngine) {
    require([
        './js/gameObjects/BallObject',
        './js/shapes/RectangleShape',
        './js/scripts/MoveScript'
    ], function (BallObject, RectangleShape, MoveScript) {
        var myGame = new scaliaEngine.Game();

        for (var i = 0; i < 5000; i++) {
            var ball = new BallObject(myGame.logic.world, 20);
            ball.transform.position = scaliaEngine.utils.math.vec3.randomUnit();
            scaliaEngine.utils.glMatrix.vec3.scale(ball.transform.position, ball.transform.position, 1000*Math.random());
            scaliaEngine.utils.glMatrix.vec3.scale(ball.transform.scale, ball.transform.scale, 100*Math.random());

            myGame.logic.world.AddChildren(ball);

            ball.AddComponent(new RectangleShape());
            ball.AddComponent(new MoveScript());
        }

        var size = [document.width, document.height];

        var cameraObject = new scaliaEngine.gameObjects.CameraObject();
        cameraObject.components.camera.size = size;

        myGame.logic.world.AddChildren(cameraObject);

        myGame.Run();

        var viewport = myGame.graphics.CreateViewport(cameraObject, size);

        document.body.appendChild(viewport.canvas);

        window.myGame = myGame;
    });
});