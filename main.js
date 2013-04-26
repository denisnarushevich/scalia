require(["./engine/engine"], function (scaliaEngine) {
    require([
        //'./js/gameObjects/BallObject',
        //'./engine/components/RectangleShape',
        //'./js/scripts/MoveScript'
    ], function (BallObject, RectangleShape, MoveScript) {
        var myGame = new scaliaEngine.Game();


/*
        var cube = window.cube = new scaliaEngine.gameObjects.Cube();
        myGame.logic.world.AddGameObject(cube);
        cube.transform.SetPosition(0,0,0);
        cube.transform.SetScale(10,10,10);*/

        N = 50;

        for(var i = 0; i < N; i++){
            for(var j = 0; j < N; j++){
                var child = new scaliaEngine.gameObjects.Plane();
                child.transform.Translate((i - N/2) * 64,0, (j - N/2) * 64);
                child.transform.SetScale(64, 1, 64);
                myGame.logic.world.AddGameObject(child);
            }
        }


        var axis = window.axis = new scaliaEngine.gameObjects.Axis();
        myGame.logic.world.AddGameObject(axis);



        var size = [document.width, document.height];

        var cameraObject = window.camera = new scaliaEngine.gameObjects.Camera();
        cameraObject.camera.SetSize(document.width, document.height);
        //cameraObject.camera.SetSize(100, 100);
        //cameraObject.transform.SetPosition(700,1000,700);
        //cameraObject.transform.Rotate(-32.264,45,0);
        cameraObject.transform.Rotate(-90,0,0);

        document.onkeydown = function(e){
            if(e.keyCode == 65){ //a
                camera.transform.Translate(-10,0,10, "world");
            }else if(e.keyCode == 68){ //d
                camera.transform.Translate(10,0,-10, "world");
            }else if(e.keyCode == 87){ //w
                camera.transform.Translate(-10,0,-10, "world");
            }
            else if(e.keyCode == 83){ //s
                camera.transform.Translate(10,0,10, "world");
            }
        }

        mousepressed = false;

        var x0, y0;

        document.onmousedown = function(e){
            mousepressed = true;
            x0 = e.pageX;
            y0 = e.pageY;
        }

        document.onmouseup = function(){
            mousepressed = false;
        }


        document.onmousemove = function(e){
            if(!mousepressed)return;

            var x = e.pageX;
            var y = e.pageY;

            var dx = x - x0;
            var dy = y - y0;

            x0 = x;
            y0 = y;
              //console.log(dy);
            camera.transform.Translate(-dx-dy,0,dx-dy, "world");
        }

        myGame.logic.world.AddGameObject(cameraObject);

        myGame.Run();

        var viewport = myGame.graphics.CreateViewport(cameraObject, size);

        document.body.appendChild(viewport.canvas);

        window.myGame = myGame;

        var a = setInterval(function(){
            camera.transform.Rotate(0,0,1, "self");
        },40);
    });
});