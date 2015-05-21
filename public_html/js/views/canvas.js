define([
  'backbone',
  'tmpl/game',
  'models/points',
  'models/colorpalette'
], function (Backbone, tmpl, CanvasModel, ColorPalette) {
  var CanvasView = Backbone.View.extend({
    model: canvasModel = new CanvasModel(),
    colorPalette: colorPalette, // global variable??

    initialize: function() {
      this.$el.append('<canvas id="canvas"></canvas>');
      this.canvas = this.$('#canvas')[0];
      this.context = this.canvas.getContext('2d');
      this.paint = false;
      this.color = this.colorPalette.getCurrent();

      HTMLCanvasElement.prototype.relMouseCoords = this.relMouseCoords;

      // bind to the namespaced (for easier unbinding) event
      $(window).on("resize", _.bind(this.resize, this));
      $(document).ready(this.loadCanvas());
      this.colorPalette.on('change:current', this.changeColor, this);
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
      canvasModel.addPoint(coord.x, coord.y, false, this.color);
      this.redraw(this.canvas, this.context);
    },

    mouseMove: function(e) {
      var coord = this.relMouseCoords(e);
      if (this.paint) {
        canvasModel.addPoint(coord.x, coord.y, true, this.color);
        this.redraw(this.canvas, this.context);
      }
    },

    mouseUp: function(e) {
      if (this.paint) {
        localStorage.setItem("canvas", JSON.stringify(canvasModel));
        this.paint = false;
      }
    },

    mouseLeave: function(e) {
      if (this.paint) {
        this.paint = false;
      }
    },

    changeColor: function(e) {
      this.color = e.changed['current'];
    },

    clear: function(e) {
      localStorage.removeItem("canvas");
      canvasModel.clear();
      this.redraw(this.canvas, this.context);
    },

    loadCanvas: function() {
      var data = JSON.parse(localStorage.getItem("canvas"));
      canvasModel = new CanvasModel(data);
    },

    redraw: function(canvas, context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.strokeStyle = this.color;
      context.lineJoin = "round";
      context.lineWidth = 5;

      for (var i = 0; i <= canvasModel.pointsCount(); i++) {
        context.strokeStyle = canvasModel.getColor(i);
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
      var canoffset = $('#canvas').offset();
      canvasx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
      canvasy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;
      return {x: canvasx, y: canvasy};
    }
  });

  return CanvasView;
});