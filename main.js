require(["./engine/engine"], function (scaliaEngine) {
    require([
        './js/gameObjects/BallObject',
        './js/renderers/BallRenderer',
        './js/scripts/MoveScript'
    ], function (BallObject, BallRenderer, MoveScript) {
        var myGame = new scaliaEngine.Game();

        for (var i = 0; i < 1000; i++) {
            var ball = new BallObject(myGame.logic.world, 20);
            ball.transform.position = scaliaEngine.utils.math.vec3.randomUnit();
            scaliaEngine.utils.math.vec3.scale(ball.transform.position, 1000*Math.random(), ball.transform.position);

            myGame.logic.world.AddChildren(ball);

            ball.AddComponent(new BallRenderer());
            ball.AddComponent(new MoveScript());
        }

        var size = [document.width, document.height];

        var cameraObject = new scaliaEngine.gameObjects.CameraObject();

        myGame.logic.world.AddChildren(cameraObject);

        myGame.Run();

        var viewport = myGame.graphics.CreateViewport(cameraObject, size);

        document.body.appendChild(viewport.canvas);

        window.myGame = myGame;
    });
});