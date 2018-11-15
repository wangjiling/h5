var indicator = document.createElement('div');
indicator.className = 'state-indicator';
document.body.appendChild(indicator);

var lastDeviceState = util.getDeviceState(),
    pubSub = new PubSub();

window.addEventListener('resize', function() {
    var state = util.getDeviceState();

    // resize
    pubSub.emit('device-resize', state);

    // state change
    if(state !== lastDeviceState) {
        lastDeviceState = state;
        pubSub.emit('device-state-change', state);
    }
});
