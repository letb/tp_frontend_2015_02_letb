define([
  'backbone',
  'api/socket'
], function (Backbone, socket) {
  var CanvasModel = Backbone.Model.extend({
    defaults: {
      x: [],
      y: [],
      xc: [],
      yc: [],
      drag: [],
      color: [],
      size: []
    },

    addPoint: function(point) {
      this.get('x').push(point.x);
      this.get('y').push(point.y);
      this.get('drag').push(point.drag);
      this.get('color').push(point.color);

      point['xc'] = point.x / window.screen.width;
      point['yc'] = point.y / window.screen.height;
      this.wsSendPoint(point);
    },

    addRemotePoint: function(point) {
      this.get('x').push(point.xc * window.screen.width);
      this.get('y').push(point.yc * window.screen.height);
      this.get('drag').push(point.drag);
      this.get('color').push(point.color);
    },

    getX: function(i) {
      return this.get('x')[i];
    },

    getPoints: function() {
      return this;
    },

    getY: function(i) {
      return this.get('y')[i];
    },

    isDragged: function(i) {
      return this.get('drag')[i];
    },

    getColor: function(i) {
      return this.get('color')[i];
    },

    pointsCount: function() {
      return this.get('x').length;
    },

    clear: function(remote) {
      this.get('x').length = 0;
      this.get('y').length = 0;
      this.get('drag').length = 0;
      this.get('color').length = 0;
      this.get('size').length = 0;
      if (!remote) {
        this.wsSendClear({ clear: true });
      };
    },

    wsSendClear: function(clear) {
      var msg = { type: 'canvas:clear', body: clear };
      socket.send(msg);
    },

    wsSendPoint: function(point) {
      var msg = { type: 'canvas', body: point };
      socket.send(msg);
    }
  });

  return CanvasModel;
});
