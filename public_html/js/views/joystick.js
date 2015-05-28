define([
  'app',
  'backbone',
  'tmpl/joystick',
  'tmpl/components/chat_message',
  'api/socket'
], function (app, Backbone, tmpl, tmplMessage, socket){
  var Joystick = Backbone.View.extend({
    template: tmpl,

    events: {
      'submit .chat__message-form' : 'sendMessage'
    },

    initJoystick: function() {
      var msg = { type : 'init:joystick' };
      socket.send(msg);
    },

    render: function() {
      this.listenTo(app.wsEventBus, 'ws:open:joystick', this.initJoystick);
      this.listenTo(app.wsEventBus, 'ws:chat', this.getMessage);
      this.$el.html(this.template());
      return this;
    },

    show: function() {
      this.$el.show();
      socket.connect();
    },

    hide: function() {
      this.$el.hide();
    },

    getMessage: function(message) {
      $('.chat__history').append(tmplMessage(message));
    },

    formattedTime: function(date) {
      return date.toLocaleTimeString()
    },

    sendMessage: function(e) {
      e.preventDefault();
      var msg = { type : 'chat',
                  body: {
                    message: $('.message-form__input').val(),
                    time: this.formattedTime(new Date()),
                    user: app.session.user.name()
                  }
                };
      $('.message-form__input').val("");
      socket.send(msg);
    }
  });

  return new Joystick();
});
