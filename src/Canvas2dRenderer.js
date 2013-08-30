define(["./config","./lib/gl-matrix", "./components/PathRenderer", "./components/SpriteRenderer"], function (config, glMatrix, PathRenderer, SpriteRenderer) {
    function Canvas2dRenderer(graphics) {
        this.graphics = graphics;
        this.layerBuffers = [];
        for (var i = 0; i < config.layersCount; i++)
            this.layerBuffers[i] = [];
        this.M = [];
    }

    var p = Canvas2dRenderer.prototype,
        bufferVec3 = new Float32Array([0, 0, 0]),
        buffer2Vec3 = new Float32Array([0, 0, 0]),
        bufferMat4 = new Float32Array(16);

    p.graphics = null;

    p.screenSpaceCulling = function (gameObject, viewport) {
        //primitive culling
        //todo this should be using bounding box
        if (gameObject.spriteRenderer !== undefined && gameObject.spriteRenderer.enabled) {
            gameObject.transform.getPosition(bufferVec3);
            glMatrix.vec3.transformMat4(bufferVec3, bufferVec3, this.M);
            var sprite = gameObject.spriteRenderer;
            bufferVec3[0] -= sprite.pivotX;
            bufferVec3[1] -= sprite.pivotY;

            if (bufferVec3[0] <= viewport.width && bufferVec3[0] + sprite.width >= 0 && bufferVec3[1] <= viewport.height && bufferVec3[1] + sprite.height >= 0) {
                this.layerBuffers[sprite.layer].push(sprite);

                if(gameObject.pathRenderer && gameObject.pathRenderer.enabled)
                    this.layerBuffers[gameObject.pathRenderer.layer].push(gameObject.pathRenderer)
            }
        }else if(gameObject.pathRenderer !== undefined && gameObject.pathRenderer.enabled){
            gameObject.transform.getPosition(bufferVec3);
            glMatrix.vec3.transformMat4(bufferVec3, bufferVec3, this.M);

            if (bufferVec3[0] <= viewport.width && bufferVec3[0] >= 0 && bufferVec3[1] <= viewport.height && bufferVec3[1] >= 0) {
                this.layerBuffers[gameObject.pathRenderer.layer].push(gameObject.pathRenderer)
            }
        }
    }

    p.render = function (camera, viewport) {
        var gameObjects = camera.world.retrieve(camera),
            gameObjectsCount = gameObjects.length,
            layersCount = config.layersCount,
            renderer, renderers, renderersCount,
            i, j, ctx;

        this.M = camera.camera.getWorldToScreen();


        //1.do culling
        //2.opredelitj Z index. kakoj sloj pervim
        //3.risovatj na4inaja s samogo malenjkogo Z
        //3.4. risuja sortirovatj

        viewport.context.clearRect(0, 0, viewport.width, viewport.height);

        for (i = 0; i < gameObjectsCount; i++)
            this.screenSpaceCulling(gameObjects[i], viewport);

        for (i = 0; i < layersCount; i++) {
            ctx = viewport.layers[i];
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            renderers = this.layerBuffers[i];
            renderersCount = renderers.length;

            if (config.depthSortingMask & (1 << i)) {
                renderers.sort(function (a, b) {
                    a.gameObject.transform.getPosition(bufferVec3);
                    a = bufferVec3[0] + bufferVec3[1] + bufferVec3[2];
                    b.gameObject.transform.getPosition(bufferVec3);
                    b = bufferVec3[0] + bufferVec3[1] + bufferVec3[2];
                    return a - b;
                });
            }

            for (j = 0; j < renderersCount; j++) {
                renderer = renderers.pop();

                if(renderer.constructor === SpriteRenderer)
                    this.renderSprite(renderer, ctx);
                else
                    this.renderPath(renderer, ctx);

                //this.RenderAxis(gameObject);
            }

            viewport.context.drawImage(ctx.canvas, 0, 0);
        }

        if(config.renderOctree && config.useOctree && camera.world.octree.root !== null)
                this.renderOctreeNode(camera.world.octree.root, viewport.context);

    }

    //Rounding coordinates with Math.round is slow, but looks better
    //Rounding to lowest with pipe operator is faster, but looks worse
    p.renderSprite = function (sprite, layer) {
        glMatrix.vec3.transformMat4(bufferVec3, sprite.gameObject.transform.getPosition(bufferVec3), this.M);

        layer.drawImage(sprite.image, sprite.offsetX, sprite.offsetY, sprite.width, sprite.height, Math.round(bufferVec3[0] - sprite.pivotX), Math.round(bufferVec3[1] - sprite.pivotY), sprite.width, sprite.height);
    }

    p.renderAxis = function (gameObject, ctx) {
        var W = gameObject.transform.getLocalToWorld(),
            pos0 = gameObject.transform.getPosition();

        glMatrix.vec3.transformMat4(pos0, pos0, this.M);

        var pos = bufferVec3;

        //draw X
        pos[0] = 100;
        pos[1] = 0;
        pos[2] = 0;

        glMatrix.vec3.transformMat4(pos, pos, W);
        glMatrix.vec3.transformMat4(pos, pos, this.M);

        ctx.beginPath();
        ctx.moveTo(pos0[0], pos0[1]);
        ctx.lineTo(pos[0], pos[1]);
        ctx.closePath();
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();

        //draw Y
        pos[0] = 0;
        pos[1] = 100;
        pos[2] = 0;

        glMatrix.vec3.transformMat4(pos, pos, W);
        glMatrix.vec3.transformMat4(pos, pos, this.M);

        ctx.beginPath();
        ctx.moveTo(pos0[0], pos0[1]);
        ctx.lineTo(pos[0], pos[1]);
        ctx.closePath();
        ctx.strokeStyle = '#00ff00';
        ctx.stroke();

        //draw Z
        pos[0] = 0;
        pos[1] = 0;
        pos[2] = 100;

        glMatrix.vec3.transformMat4(pos, pos, W);
        glMatrix.vec3.transformMat4(pos, pos, this.M);

        ctx.beginPath();
        ctx.moveTo(pos0[0], pos0[1]);
        ctx.lineTo(pos[0], pos[1]);
        ctx.closePath();
        ctx.strokeStyle = '#0000ff';
        ctx.stroke();
    }

    p.renderOctreeNode = function (node, ctx) {
        this.renderBound(node.bounds, ctx);

        if (node.type === 1) {
            for (var i = 0; i < 8; i++)
                if (node.nodes[i] !== undefined)
                    this.renderOctreeNode(node.nodes[i], ctx)
        }
    }


    p.renderBound = function (bound, ctx) {
        var min = bound.min,
            max = bound.max,
            w = max[0] - min[0],
            h = max[1] - min[1],
            d = max[2] - min[2];
        
        var m1 = [min[0] + w, min[1], min[2]],
            m2 = [min[0], min[1] + h , min[2]],
            m3 = [min[0] + w, min[1] + h, min[2]];

        var mx1 = [min[0], min[1], min[2] + d],
            mx2 = [min[0] + w, min[1] , min[2] + d],
            mx3 = [min[0], min[1] + h, min[2] + d];
        
        
        var p = bufferVec3;
        
        ctx.beginPath();
        glMatrix.vec3.transformMat4(p, min, this.M); 
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, m1, this.M);
        ctx.lineTo(p[0], p[1]);
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, m3, this.M);
        ctx.lineTo(p[0], p[1]);
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, m2, this.M);
        ctx.lineTo(p[0], p[1]);
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, min, this.M);
        ctx.lineTo(p[0], p[1]);
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, mx1, this.M);
        ctx.lineTo(p[0], p[1]);
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, mx2, this.M);
        ctx.lineTo(p[0], p[1]);
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, max, this.M);
        ctx.lineTo(p[0], p[1]);
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, mx3, this.M);
        ctx.lineTo(p[0], p[1]);
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, mx1, this.M);
        ctx.lineTo(p[0], p[1]);

        glMatrix.vec3.transformMat4(p, m1, this.M);
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, mx2, this.M);
        ctx.lineTo(p[0], p[1]);

        glMatrix.vec3.transformMat4(p, m2, this.M);
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, mx3, this.M);
        ctx.lineTo(p[0], p[1]);

        glMatrix.vec3.transformMat4(p, m3, this.M);
        ctx.moveTo(p[0], p[1]);
        glMatrix.vec3.transformMat4(p, max, this.M);
        ctx.lineTo(p[0], p[1]);

        ctx.closePath();
        ctx.strokeStyle = bound.color || (bound.color = '#'+((0xFFFFFF*Math.random())|0).toString(16));
        ctx.stroke();

    }

    p.renderPath = function(path, ctx){
        var vec3 = glMatrix.vec3,
            points = path.points,
            len = points.length,
            M = glMatrix.mat4.mul(bufferMat4, this.M, path.gameObject.transform.getLocalToWorld()),
            i;

        if(points.length < 2)
            return;

        ctx.beginPath();
        ctx.lineWidth = path.width;
        vec3.transformMat4(bufferVec3, points[0], M);
        ctx.moveTo(bufferVec3[0], bufferVec3[1]);
        for(i = 1; i < len; i++){
            vec3.transformMat4(bufferVec3, points[i], M);
            ctx.lineTo(bufferVec3[0], bufferVec3[1]);
            ctx.moveTo(bufferVec3[0], bufferVec3[1]);
        }
        vec3.transformMat4(bufferVec3, points[0], M);
        ctx.lineTo(bufferVec3[0], bufferVec3[1]);
        ctx.closePath();
        ctx.strokeStyle = path.color;
        ctx.stroke();
    }

    return Canvas2dRenderer;
});