define([
  'backbone',
  'tmpl/game',
  'models/points'
], function (Backbone, tmpl, CanvasModel) {
  var CanvasView = Backbone.View.extend({
    model: canvasModel = new CanvasModel(),

    initialize: function() {
      this.$el.append('<canvas id="canvas"></canvas>');
      this.canvas = this.$('#canvas')[0];
      this.context = this.canvas.getContext('2d');
      this.paint = false;

      HTMLCanvasElement.prototype.relMouseCoords = this.relMouseCoords;

      // bind to the namespaced (for easier unbinding) event
      $(window).on("resize", _.bind(this.resize, this));
    },

    events: {
      'mousedown #canvas': 'mouseDown',
      'mousemove #canvas': 'mouseMove',
      'mouseup #canvas': 'mouseUp',
      'mouseleave #canvas': 'mouseLeave',
      'resized #canvas': 'resize'
    },

    render: function() {
      this.redraw(this.canvas, this.context);
      this.delegateEvents();
      return this;
    },

    resize: function() {
      this.canvas.width = this.canvas.parentElement.offsetWidth;
      this.canvas.height = this.canvas.parentElement.offsetHeight;
      this.render();
    },

    mouseDown: function(e) {
      var coord = this.relMouseCoords(e);
      this.paint = true;
      canvasModel.addPoint(coord.x, coord.y, false);
      this.redraw(this.canvas, this.context);
    },

    mouseMove: function(e) {
      var coord = this.relMouseCoords(e);
      if (this.paint) {
        canvasModel.addPoint(coord.x, coord.y, true);
        this.redraw(this.canvas, this.context);
      }
    },

    mouseUp: function(e) {
      if (this.paint) {
        this.paint = false;
      }
    },

    mouseLeave: function(e) {
      if (this.paint) {
        this.paint = false;
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

    remove: function() {
      // unbind the namespaced event (to prevent accidentally unbinding some
      // other resize events from other code in your app
      $(window).off("resize");

      // don't forget to call the original remove() function
      Backbone.View.prototype.remove.call(this);
    },

    relMouseCoords: function(event) {
      var totalOffsetX = 0;
      var totalOffsetY = 0;
      var currentElement = event.target;
      var canvasX =  currentElement.scrollLeft;
      var canvasY =  currentElement.scrollTop;

      do {
        totalOffsetX += currentElement.offsetLeft ;
        totalOffsetY += currentElement.offsetTop ;
      }
      while (currentElement = currentElement.offsetParent);

      canvasX = event.pageX - totalOffsetX ;
      canvasY = event.pageY - totalOffsetY ;
      return {x: canvasX, y: canvasY};
    }
  });

  return CanvasView;
});