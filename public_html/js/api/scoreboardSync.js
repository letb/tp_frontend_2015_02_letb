define([
  'api/request'
], function(Request){
  var request = new Request('api/v1/scoreboard');

  return function(method, collection, options) {
    var methodMap = {
      'read': {
        send: function() {
          request.send('GET').done(this.success).fail(this.error);
        },
        success: function(resp) {
          if (resp.status === 200) {
            collection.reset(resp.body.users);
          }
        },
        error: function(resp) {}
      }
    }
    return methodMap[method].send();
  }
});
