define(function(){
  return function(method, collection, options) {
    var methodMap = {
      'read': {
        send: function() {
          $.ajax({
            type: 'GET',
            url: 'api/v1/scoreboard',
            dataType: 'json',
            async: false
          }).done(this.success).fail(this.error);
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
