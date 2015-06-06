define([
  'app',
  'backbone',
  'tmpl/menu',
  'api/storage'
], function (app, Backbone, tmpl, storage){
  var MenuView = Backbone.View.extend({
    className: "menu-view",
    template: tmpl,
    
    events: {
      'click  a.signout':     'signout'
    },

    render: function() {
      this.$el.html(
        this.template({
          signedIn: app.session.signedIn(),
          user: app.session.user
        })
      );
      return this;
    },

    show: function() {
      this.$el.show();
      storage.remove('signup-name');
      storage.remove('signup-email');
    },

    hide: function() {
      this.$el.hide();
    },

    signout: function(e) {
      app.session.destroy();
    }
  });

  return new MenuView();
});
