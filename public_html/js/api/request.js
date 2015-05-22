define(function(){
  var Request = function(baseUrl) {
    this.baseUrl = baseUrl || '';

    this.OK = function(resp) {
      return resp.status.match(/^(200|201)$/);
    }

    this.send = function(method, url, data) {
      var def = $.Deferred();
      var self = this;

      function sanitized(url) {
        return url ? url : ''
      };

      $.ajax({
        type: method,
        url: self.baseUrl + sanitized(url),
        data: data,
        dataType: 'json'
      }).done(function(resp) {
        if (self.OK(resp)) {
          def.resolve(resp);
        } else {
          def.reject(resp);
        }
      }).fail(function() {
        def.reject("error");
      });

      return def.promise();
    };
  };

  return Request;
});
