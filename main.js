require(["./engine/engine"], function (scaliaEngine) {
    require([
        //'./js/gameObjects/BallObject',
        //'./engine/components/RectangleShape',
        //'./js/scripts/MoveScript'
    ], function (BallObject, RectangleShape, MoveScript) {
        var myGame = new scaliaEngine.Game();

        for(var i = 0; i < 200; i++){
        var cube = window.cube = new scaliaEngine.gameObjects.Cube();
            cube.transform.position[0] = i+Math.random()*2000-1000;
            cube.transform.position[1] = i+Math.random()*2000-1000;
            myGame.logic.world.AddGameObject(cube);
        }



        var size = [document.width, document.height];

        var cameraObject = new scaliaEngine.gameObjects.Camera();
        cameraObject.camera.size = size;
        cameraObject.transform.position = [0,0,0];

        myGame.logic.world.AddGameObject(cameraObject);

        myGame.Run();

        var viewport = myGame.graphics.CreateViewport(cameraObject, size);

        document.body.appendChild(viewport.canvas);

        window.myGame = myGame;
    });
});