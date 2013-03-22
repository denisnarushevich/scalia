require(["./engine/engine"], function (scaliaEngine) {
    require([
        //'./js/gameObjects/BallObject',
        //'./engine/components/RectangleShape',
        //'./js/scripts/MoveScript'
    ], function (BallObject, RectangleShape, MoveScript) {
        var myGame = new scaliaEngine.Game();


        var cube = window.cube = new scaliaEngine.gameObjects.Cube();
        myGame.logic.world.AddGameObject(cube);
        cube.transform.SetScale(10,10,10);

        for(var i = 0; i < 50; i++){
            var child = window.child = new scaliaEngine.gameObjects.Cube();
            scaliaEngine.utils.glMatrix.vec3.random(child.transform.position, 40);

            myGame.logic.world.AddGameObject(child);
            child.transform.SetScale(Math.random()*4|0 + 1,Math.random()*4|0 + 1,Math.random()*4|0 + 1);
            child.transform.Rotate((Math.random()*360) | 0, (Math.random()*360) | 0, (Math.random()*360) | 0);

            cube.transform.AddChildren(child.transform);
        }


        var size = [document.width, document.height];

        var cameraObject = window.camera = new scaliaEngine.gameObjects.Camera();
        cameraObject.camera.SetSize(document.width, document.height);
        cameraObject.transform.SetPosition(0,0,0);

        myGame.logic.world.AddGameObject(cameraObject);

        myGame.Run();

        var viewport = myGame.graphics.CreateViewport(cameraObject, size);

        document.body.appendChild(viewport.canvas);

        window.myGame = myGame;
    });
});