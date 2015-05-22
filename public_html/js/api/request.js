define([
  'api/response'
], function(Response){
  var Request = function(baseUrl) {
    this.baseUrl = baseUrl || '';

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
      }).done(function(data) {
        var resp = new Response(data);

        if (resp.isOK()) {
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
