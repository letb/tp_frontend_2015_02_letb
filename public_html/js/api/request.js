define(function(){
  var Request = function(baseUrl) {
    this.baseUrl = baseUrl || '';
    this.okStatus = /^(200|201)$/;

    this.send = function(method, url, data) {
      var def = $.Deferred();

      function sanitized(url) {
        return url ? url : ''
      };

      $.ajax({
        type: method,
        url: this.baseUrl + sanitized(url),
        data: data,
        dataType: 'json'
      }).done(function(resp) {
        if (resp.status.match(this.okStatus)) {
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
