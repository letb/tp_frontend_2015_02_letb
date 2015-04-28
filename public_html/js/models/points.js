define([
  'backbone'
], function (Backbone) {
  var CanvasModel = Backbone.Model.extend({
    defaults: {
      x: [],
      y: [],
      drag: [],
      color: [],
      size: []
    },

    addPoint: function(x, y, dragging, color) {
      this.get('x').push(x);
      this.get('y').push(y);
      this.get('drag').push(dragging);
      this.get('color').push(color);
    },

    getX: function(i) {
      return this.get('x')[i];
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

    clear: function() {
      this.get('x').length = 0;
      this.get('y').length = 0;
      this.get('drag').length = 0;
      this.get('color').length = 0;
      this.get('size').length = 0;
    }
  });

  return CanvasModel;
});
