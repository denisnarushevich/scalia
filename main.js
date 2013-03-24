require(["./engine/engine"], function (scaliaEngine) {
    require([
        //'./js/gameObjects/BallObject',
        //'./engine/components/RectangleShape',
        //'./js/scripts/MoveScript'
    ], function (BallObject, RectangleShape, MoveScript) {
        var myGame = new scaliaEngine.Game();


        var cube = window.cube = new scaliaEngine.gameObjects.Cube();
        myGame.logic.world.AddGameObject(cube);
        cube.transform.SetPosition(0,80,0);
        cube.transform.SetScale(50,50,50);

        N = 100;

        for(var i = 0; i < N; i++){
            for(var j = 0; j < N; j++){
                var child = new scaliaEngine.gameObjects.Plane();
                child.transform.Translate((i - N/2) * 40,0, (j - N/2) * 40);
                child.transform.SetScale(20, 1, 20);
                myGame.logic.world.AddGameObject(child);
            }
        }

                                           /*
        for(var i = 0; i < 300; i++){
            var child = window.child = new scaliaEngine.gameObjects.Cube();
            scaliaEngine.utils.glMatrix.vec3.random(child.transform.position, 40);

            myGame.logic.world.AddGameObject(child);
            child.transform.SetScale(Math.random()*4|0 + 1,Math.random()*4|0 + 1,Math.random()*4|0 + 1);
            child.transform.Rotate((Math.random()*360) | 0, (Math.random()*360) | 0, (Math.random()*360) | 0);

            cube.transform.AddChildren(child.transform);
        }
                                             */
        var size = [document.width, document.height];

        var cameraObject = window.camera = new scaliaEngine.gameObjects.Camera();
        cameraObject.camera.SetSize(document.width, document.height);
        //cameraObject.camera.SetSize(100, 100);
        cameraObject.transform.SetPosition(700,1000,700);
        cameraObject.transform.Rotate(0,45,0);
        cameraObject.transform.Rotate(-32.264,0,0);

        document.onkeyup = function(e){
            if(e.keyCode == 65){ //a
                camera.transform.Translate(-10,0,0);
            }else if(e.keyCode == 68){ //d
                camera.transform.Translate(10,0,0);
            }else if(e.keyCode == 87){ //w
                camera.transform.Translate(0,0,-10);
            }
            else if(e.keyCode == 83){ //s
                camera.transform.Translate(0,0,10);
            }
        }

        mousepressed = false;

        document.onmousedown = function(){
            mousepressed = true;
        }

        document.onmouseup = function(){
            mousepressed = false;
        }

        var x0, y0;
        document.onmousemove = function(e){
            if(!mousepressed)return;
            if(x0 === undefined || y0 === undefined){
                x0 = e.pageX;
                y0 = e.pageY;
            }

            var x = e.pageX;
            var y = e.pageY;

            var dx = x - x0;
            var dy = y - y0;

            x0 = x;
            y0 = y;
              //console.log(dy);
            camera.transform.Rotate(-dy,-dx,0);
        }

        myGame.logic.world.AddGameObject(cameraObject);

        myGame.Run();

        var viewport = myGame.graphics.CreateViewport(cameraObject, size);

        document.body.appendChild(viewport.canvas);

        window.myGame = myGame;
    });
});