require([
  'backbone',
  'app',
  'router',
  'models/session'
], function(Backbone, app, Router, Session) {
    app.session = new Session({signedIn: false});
    app.router = new Router();
    Backbone.history.start({ pushState: true });
});
