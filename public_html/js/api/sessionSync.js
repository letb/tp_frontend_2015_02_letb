define([
  'app',
  'api/request'
], function(app, Request){
  var request = new Request('api/v1/auth/');

  return function(method, model, options) {
    var methodMap = {
      'create': {
        send: function() {
          request.send('POST', 'signin', model.toJSON())
            .done(this.success)
            .fail(this.error);
        },
        success: function(resp) {
          if (resp.status.match(request.okStatus)) {
            model.clear();
            model.user.set(resp.body);
          }
        },
        error: function() {}
      },

      'delete': {
        send: function() {
          request.send('GET', 'signout')
            .done(this.success)
            .fail(this.error);
        },
        success: function(resp) {
          if (resp.status.match(request.okStatus)) {
            app.resetSession();
            model.trigger('signout:ok');
          }
        },
        error: function() {}
      }
    }
    return methodMap[method].send();
  }
});
