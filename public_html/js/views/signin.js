define([
  'backbone',
  'tmpl/signin'
], function (Backbone, tmpl) {
  var SigninView = Backbone.View.extend({
    id: "signin-view",
    template: tmpl,

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    }
  });

  return new SigninView();
});