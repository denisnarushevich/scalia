define(function() {
    function Item(data) {
        if (typeof(data[0]) === "number")
            this.type = Item.POINT;
        else
            this.type = Item.BOUNDS;
        
        this.data = data;
    }

    Item.POINT = 0;
    Item.BOUNDS = 1;

    var p = Item.prototype;

    p.type = null;
    p.data = null;

    return Item;
});