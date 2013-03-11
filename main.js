require(["./engine/engine"], function (scaliaEngine) {
    require([
        //'./js/gameObjects/BallObject',
        //'./engine/components/RectangleShape',
        //'./js/scripts/MoveScript'
    ], function (BallObject, RectangleShape, MoveScript) {
        var myGame = new scaliaEngine.Game();

        var cube = window.cube = new scaliaEngine.gameObjects.Cube();
            //cube.transform.position[0] = i+Math.random()*2000-1000;
            //cube.transform.position[1] = i+Math.random()*2000-1000;
            myGame.logic.world.AddGameObject(cube);

        cube.transform.SetScale(100,100,100);

        var child = window.child = new scaliaEngine.gameObjects.Cube();
        //cube.transform.position[0] = i+Math.random()*2000-1000;
        //cube.transform.position[1] = i+Math.random()*2000-1000;
        myGame.logic.world.AddGameObject(child);

        child.transform.SetLocalScale(10,10,10);

        cube.transform.AddChildren(child);

        child.transform.SetLocalPosition(10,10,10);






        var size = [document.width, document.height];

        var cameraObject = window.camera = new scaliaEngine.gameObjects.Camera();
        cameraObject.camera.size = size;
        cameraObject.transform.SetPosition(0,0,0);

        myGame.logic.world.AddGameObject(cameraObject);

        myGame.Run();

        var viewport = myGame.graphics.CreateViewport(cameraObject, size);

        document.body.appendChild(viewport.canvas);

        window.myGame = myGame;
    });
});