function PubSub() {
    this.handlers = {};
}

PubSub.prototype = {
    // subscribe event
    on: function(eventType, handler){
        var self = this;
        if(!(eventType in self.handlers)) {
            self.handlers[eventType] = [];
        }
        self.handlers[eventType].push(handler);
        return this;
    },
    // publish event
    emit: function(eventType){
        var self = this;
        if (!self.handlers[eventType]) return;
        var handlerArgs = Array.prototype.slice.call(arguments,1);
        for(var i = 0; i < self.handlers[eventType].length; i++) {
            self.handlers[eventType][i].apply(self,handlerArgs);
        }
        return self;
    },
    // delete subscribe event
    off: function(eventType, handler){
        var currentEvent = this.handlers[eventType];
        var len = 0;
        if (currentEvent) {
            len = currentEvent.length;
            for (var i = len - 1; i >= 0; i--){
                if (currentEvent[i] === handler){
                    currentEvent.splice(i, 1);
                }
            }
        }
        return this;
    }
};