define(function () {
    function EventManager() {
        this.eventListeners = {};
    }

    var p = EventManager.prototype;

    p.eventListeners = null;

    p.AddListener = function (eventName, callback) {
        var listeners = this.eventListeners[eventName];

        if (listeners)
            listeners[listeners.length] = callback;
        else
            listeners = [callback];

        this.eventListeners[eventName] = listeners;
    }

    p.DispatchEvent = function (eventName, sender) {
        var listeners = this.eventListeners[eventName],
            listenersCount = listeners ? listeners.length : 0;

        for (var i = 0; i < listenersCount; i++)
            listeners[i](sender);
    }

    return EventManager;
});
