require([
  'backbone',
  'app',
  'router'
], function(Backbone, app, Router) {
    app.router = new Router();
    Backbone.history.start({ pushState: true });
});
