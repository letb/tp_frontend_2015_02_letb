define([
  'app'
], function(app) {

  var ws = {
    url: "ws://" + location.host + '/gameplay',
    closed: true,

    connect: function() {

      socket = new WebSocket(this.url);

      socket.onopen = function(data) {
        this.closed = false;
        var eventName = 'ws:' + data.type + location.pathname.replace('/', ':');
        app.wsEventBus.trigger(eventName, location.pathname);
      };

      socket.onclose = function(event) {
        this.closed = true;
      };

      socket.onmessage = function(message) {
        data = JSON.parse(message.data);
        app.wsEventBus.trigger('ws:' + data.type, data.body);
      };

      this.socket = socket;
    },

    send: function(msg) {
      this.socket.send(JSON.stringify(msg));
    },

    close: function(msg) {
      this.socket.close();
    }
  };

  return ws;
});
