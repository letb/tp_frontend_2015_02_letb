define([
  'app',
  'backbone',
  'tmpl/chat',
  'tmpl/chat-message',
  'api/socket'
], function (app, Backbone, tmplChat, tmplMessage, socket) {
  var ChatView = Backbone.View.extend({

    events: {
      'submit .send-message' : 'sendMessage'
    },

    render: function() {
      this.listenTo(app.wsEventBus, 'ws:chat', this.getMessage);
      this.$el.html(tmplChat());
      return this;
    },

    getMessage: function(message) {
      $('.chat-history').append(tmplMessage(message));
    },

    formattedTime: function(date) {
      return date.toLocaleTimeString()
    },

    sendMessage: function(e) {
      e.preventDefault();
      var msg = { type : 'chat',
                  body: {
                    message: $('.input-message').val(),
                    time: this.formattedTime(new Date()),
                    user: app.session.user.name()
                  }
                };
      $('.input-message').val("");
      socket.send(msg);
    }
  });

  return ChatView;
});
