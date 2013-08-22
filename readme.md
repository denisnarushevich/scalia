# Scalia  
This is little game engine I created to make isometric simcity/transport tycoon/rollercoaster tycoon style game.
It's proper 3d engine, but I use it to render in dimetric projection and only with sprites.
I haven't fully implemented 3d rendering, but engine is capabale to handle it.

## Features
* Component based
* Simple & small
* Canvas rendering
* Requirejs module format

## Examples
* Soon

## Simple usage

```
 require("engine", function(engine){
  var game = new engine.Game();

  //create simple game object with sprite attached
  var go = new engine.GameObject();
  var sprite = new engine.SpriteComponent();
    sprite.image.onload = function(){
    sprite.width = IMAGE_H;
    sprite.height = IMAGE_H;
  }
  sprite.image = new Image(PATH_TO_YOUR_IMAGE);

  go.addComponent(sprite);

  
  //create camera gameobject
  var cam = new engine.Camera();
  cam.transform.translate(0,0,-100, "self");
  
  game.logic.world.addGameObject(go);
  game.logic.world.addGameObject(cam);

  game.run();

        
  var viewport = this.game.graphics.createViewport();
  viewport.setCamera(mainScript.mainCamera).setSize(640, 480);
  
  document.body.addChild(viewport.canvas);
 });
```