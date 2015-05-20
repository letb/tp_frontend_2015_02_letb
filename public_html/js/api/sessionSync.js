define([
  'api/request'
], function(Request){
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
          if (resp.status === 200) {
            model.clear();
            model.user.set(resp.body);
          }
        },
        error: function() {}
      }
    }
    return methodMap[method].send();
  }
});
