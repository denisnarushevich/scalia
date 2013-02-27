define(["../GameObject"], function (GameObject) {
    /**
     * World represents root node in GameObject hierarchy,
     * treat it as space, where all children GameObjects exist,
     * it's visual representation could be skybox and similar.
     *
     * @param {Logic} logic
     * @constructor
     */
    function World(logic) {
        GameObject.call(this);
        this.logic = logic;
    }

    var p = World.prototype = Object.create(GameObject.prototype);

    /**
     * @type {Logic}
     */
    p.logic = null;

    return World;
});