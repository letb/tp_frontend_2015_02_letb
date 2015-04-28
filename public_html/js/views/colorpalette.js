define([
  'backbone',
  'tmpl/game',
  'models/colorpalette'
], function (Backbone, tmpl, ColorPaletteModel) {
  var ColorPaletteView = Backbone.View.extend({
    model: colorPalette = new ColorPaletteModel(),

    initialize: function() {
      this.$el.append('<canvas id="color-palette"></canvas>');
      this.canvas = this.$('#color-palette')[0];
      this.context = this.canvas.getContext('2d');

      HTMLCanvasElement.prototype.relMouseCoords = this.relMouseCoords;

      $(window).on("resize", _.bind(this.resize, this));
      this.model.on('change:current', this.render, this);
    },

    events: {
      'resized #color-palette': 'resize',
      'click #color-palette': 'mouseClick',
    },

    resize: function() {
      var canvas = this.canvas;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;

      var gap = 10;
      var r = Math.min(canvas.height/4, 
        (canvas.width - (colorPalette.getLength() + 1) * gap) / (2 * colorPalette.getLength()));
      var x = gap + r;
      var y = canvas.height / 2;

      colorPalette.setParams(x, y, r, gap);
      this.render();
    },

    render: function() {
      this.draw(this.canvas, this.context);
      this.delegateEvents();
      return this;
    },

    mouseClick: function(e) {
      var coord = this.relMouseCoords(e);
      var p = colorPalette.getParams();

      if (coord.y < (p.y + p.r) && 
          coord.y > (p.y - p.r) ) {
        for (var i = 0; i < colorPalette.getLength(); i++) {
          if (coord.x < (p.x + p.r) && 
              coord.x > (p.x - p.r)) {
            colorPalette.setCurrent(i);
            break;
          }
          p.x += p.gap + 2 * p.r;
        }
      }
    },

    draw: function(canvas, context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.lineJoin = "round";

      var p = colorPalette.getParams();
      var settings = colorPalette.getSettings();
      var colors = colorPalette.get('colors');

      _.each(colors, function(color) {
        context.beginPath();
        if (color.color === colorPalette.get('current')) {
          context.strokeStyle = settings.highlight;
          context.lineWidth = 4;
        }
        else {
          context.strokeStyle = settings.border;
          context.lineWidth = 1;
        }
        context.arc(p.x, p.y, p.r, 0, 2 * Math.PI, false);
        context.fillStyle = color.color;
        context.fill();
        context.stroke(); 
        p.x += p.gap + 2 * p.r;
      });
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    },

    remove: function() {
      $(window).off("resize");
    },

    relMouseCoords: function(event) {
      var canoffset = $('#color-palette').offset();
      canvasx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
      canvasy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;
      return {x: canvasx, y: canvasy};
    }
  });

  return ColorPaletteView;
});