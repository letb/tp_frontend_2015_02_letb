define([
  'backbone'
], function (Backbone) {
  var CanvasModel = Backbone.Model.extend({
    defaults: {
      clickX: [],
      clickY: [],
      clickDrag: [],
    },

    addPoint: function(x, y, dragging) {
      this.get('clickX').push(x);
      this.get('clickY').push(y);
      this.get('clickDrag').push(dragging);
    },

    getX: function(i) {
      return this.get('clickX')[i];
    },

    getY: function(i) {
      return this.get('clickY')[i];
    },

    isDragged: function(i) {
      return this.get('clickDrag')[i];
    },

    pointsCount: function() {
      return this.get('clickX').length;
    },
  });

  return CanvasModel;
});
