define([
  'app',
  'backbone',
  'tmpl/signin',
  'models/session'
], function (app, Backbone, tmpl, Session) {
  var SigninView = Backbone.View.extend({
    className: "signin-view",
    template: tmpl,

    events: {
      'submit .sign-form__signin': 'signin'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    },

    signin: function(e) {
      e.preventDefault();
      app.session.save({
        name: this.$("input[name=name]").val(),
        password: this.$("input[name=password]").val()
      });
    }
  });

  return new SigninView();
});
