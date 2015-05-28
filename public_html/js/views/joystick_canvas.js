define([
  'app',
  'backbone',
  'tmpl/joystick_canvas',
  'views/canvas',
  'api/socket'
], function (app, Backbone, tmpl, CanvasView, socket){
  var Joystick = Backbone.View.extend({
    template: tmpl,

    initialize: function() {
      this.canvasView = new CanvasView({className: 'canvas-view'});
    },

    initJoystick: function() {
      var msg = { type : 'init:joystick' };
      socket.send(msg);
    },

    render: function() {
      this.listenTo(app.wsEventBus, 'ws:open:joystick_canvas', this.initJoystick);
      this.$el.html(this.template());
      $('.joystick__drawing-area').prepend(this.canvasView.$el);
      return this;
    },

    show: function() {
      this.$el.show();
      socket.connect();
    },

    hide: function() {
      this.$el.hide();
    }
  });
  return new Joystick();
});
