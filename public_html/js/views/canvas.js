define([
  'backbone',
  'tmpl/game',
  'models/points'
], function (Backbone, tmpl, CanvasModel) {
  var CanvasView = Backbone.View.extend({
    model: canvasModel = new CanvasModel(),

    initialize: function() {
      canvasModel = new CanvasModel();
      this.$el.append('<canvas id="canvas"></canvas>');
      this.canvas = this.$('#canvas')[0];
      this.context = this.canvas.getContext('2d');
      HTMLCanvasElement.prototype.relMouseCoords = this.relMouseCoords;
    },

    render: function() {
      this.redraw(this.canvas, this.context);
      this.delegateEvents();
      return this;
    },

    events: {
      'mousedown #canvas': 'mouseDown',
      'mousemove #canvas': 'mouseMove',
      'mouseup #canvas': 'mouseUp',
      'mouseleave #canvas': 'mouseLeave'
    },

    mouseDown: function(e) {
      var coord = this.relMouseCoords(e);
      canvasModel.set('paint', true);
      canvasModel.addPoint(coord.x, coord.y, false);
      this.redraw(this.canvas, this.context);
    },

    mouseMove: function(e) {
      var coord = this.relMouseCoords(e);
      if (canvasModel.get('paint')) {
        canvasModel.addPoint(coord.x, coord.y, true);
        this.redraw(this.canvas, this.context);
      }
    },

    mouseUp: function(e) {
      if (canvasModel.get('paint')) {
        canvasModel.set('paint', false);
      }
    },

    mouseLeave: function(e) {
      if (canvasModel.get('paint')) {
        canvasModel.set('paint', false);
      }
    },

    redraw: function(canvas, context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.strokeStyle = "#df4b26";
      context.lineJoin = "round";
      context.lineWidth = 5;

      for (var i = 0; i <= canvasModel.pointsCount(); i++) {
        context.beginPath();
        if (canvasModel.isDragged(i) && i) {
          context.moveTo(canvasModel.getX(i - 1), canvasModel.getY(i - 1));
        } else {
          context.moveTo(canvasModel.getX(i) - 1, canvasModel.getY(i));
        }
        context.lineTo(canvasModel.getX(i), canvasModel.getY(i));
        context.closePath();
        context.stroke();  
      };
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    },

    relMouseCoords: function(event) {
      var totalOffsetX = 0;
      var totalOffsetY = 0;
      var canvasX = 0;
      var canvasY = 0;
      var currentElement = event.target;

      do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      }
      while (currentElement = currentElement.offsetParent);

      canvasX = event.pageX - totalOffsetX;
      canvasY = event.pageY - totalOffsetY;
      return {x: canvasX, y: canvasY};
    }
  });

  return CanvasView;
});