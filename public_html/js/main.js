require([
  'backbone',
  'app',
  'router',
  'models/session'
], function(Backbone, app, Router, Session) {
    app.router = new Router();

    app.resetSession = function() {
      app.session = new Session({signedIn: false});
      app.router.listenTo(app.session, 'signin:ok', app.router.redirectRoot);
      app.router.listenTo(app.session, 'signout:ok', app.router.redirectRoot);
    };

    app.resetSession();
    Backbone.history.start({ pushState: true });
});
