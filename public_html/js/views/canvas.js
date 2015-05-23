define([
  'app',
  'backbone',
  'tmpl/game',
  'models/points',
  'models/colorpalette',
  'api/socket'
], function (app, Backbone, tmpl, CanvasModel, ColorPalette, socket) {
  var CanvasView = Backbone.View.extend({
    model: canvasModel = new CanvasModel(),
    colorPalette: colorPalette,

    initialize: function() {
      this.$el.append('<canvas id="canvas"></canvas>');
      this.canvas = this.$('#canvas')[0];
      this.context = this.canvas.getContext('2d');
      this.paint = false;
      this.color = this.colorPalette.getCurrent();

      HTMLCanvasElement.prototype.relMouseCoords = this.relMouseCoords;

      $(window).on("resize", _.bind(this.resize, this));
      this.once('render', this.resize, this);
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
      if (app.session.user.isLeader()) {
        this.delegateEvents();
      } else {
        this.undelegateEvents();
        this.listenTo(app.wsEventBus, 'ws:canvas', this.wsRedraw);
        this.listenTo(app.wsEventBus, 'ws:canvas:clear', this.wsClear);
      }
      this.trigger('render');
      return this;
    },

    changeSize: function() {
      this.canvas.width = this.canvas.parentElement.offsetWidth;
      this.canvas.height = this.canvas.parentElement.offsetHeight;
    },

    resize: function() {
      this.changeSize();
      this.render();
    },

    mouseDown: function(e) {
      var coord = this.relMouseCoords(e);
      this.paint = true;
      var point = { x: coord.x, y: coord.y, drag: false, color: this.color }
      canvasModel.addPoint(point);
      this.redraw(this.canvas, this.context);
    },

    mouseMove: function(e) {
      var coord = this.relMouseCoords(e);
      if (this.paint) {
        var point = { x: coord.x, y: coord.y, drag: true, color: this.color }
        canvasModel.addPoint(point);
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

    wsClear: function() {
      localStorage.removeItem("canvas");
      canvasModel.clear(true);
      this.redraw(this.canvas, this.context);
    },

    wsRedraw: function(point) {
      canvasModel.addPoint(point, true);
      this.redraw(this.canvas, this.context);
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