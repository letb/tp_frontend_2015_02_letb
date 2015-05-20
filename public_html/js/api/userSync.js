define([
  'api/request'
], function(Request){
  var request = new Request('api/v1/auth/');

  return function(method, model, options) {
    var methodMap = {
      'create': {
        send: function() {
          request.send('POST', 'signup', model.toJSON())
            .done(this.success)
            .fail(this.error);
        },
        success: function(resp) {
          if (resp.status === 201) {
            model.clear();
            model.set(resp.body);
          }
        },
        error: function(resp) {}
      }
    }
    return methodMap[method].send();
  }
});
