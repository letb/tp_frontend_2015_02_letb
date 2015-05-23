require([
  'backbone',
  'app',
  'router',
  'models/session'
], function(Backbone, app, Router, Session) {
    app.wsEventBus = _.extend({}, Backbone.Events);
    app.router = new Router();

    app.resetSession = function() {
      app.session = new Session({signedIn: false});
      app.router.listenTo(app.session, 'signin:ok', app.router.redirect);
      app.router.listenTo(app.session, 'signout:ok', app.router.redirect);
      app.router.listenTo(app.wsEventBus, 'ws:open', app.router.redirect);
    };

    app.resetSession();
    Backbone.history.start({ pushState: true });
});
