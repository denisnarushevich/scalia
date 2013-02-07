define(function(){
    /**
     * @param {BallObject} ball
     * @constructor
     */
    function BallRenderer() {
        this.color = "rgb(" + ((Math.random() * 255) | 0) + "," + ((Math.random() * 255) | 0) + "," + ((Math.random() * 255) | 0) + ")";
    }

    var p = BallRenderer.prototype = Object.create(scaliaEngine.components.RendererComponent.prototype);

    /**
     * @type {String}
     */
    p.color = null;

    /**
     * @static
     * @type {float}
     */
    p.angle360 = 2 * Math.PI;

    p.Draw = function (context) {
        var ball = this.gameObject;
        context.beginPath();
        context.fillStyle = this.color; //SLOW SLOW SLOW
        context.arc(ball.transform.position[0] | 0, ball.transform.position[1] | 0, ball.radius, 0, this.angle360);
        context.fill();
        context.closePath();
    };

    return BallRenderer;
});