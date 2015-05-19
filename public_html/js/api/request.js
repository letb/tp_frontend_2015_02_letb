define(function(){
  var Request = function(baseUrl) {
    this.baseUrl = baseUrl || '';

    this.send = function(method, url, data) {
      var def = $.Deferred();

      function sanitized(url) {
        return url ? url : ''
      };

      $.ajax({
        type: method,
        url: this.baseUrl + sanitized(url),
        data: data,
        dataType: 'json',
        async: false
      }).done(function(resp) {
        if (resp.status === 200) {
          def.resolve(resp);
        } else {
          def.reject(resp);
        }
      }).fail(function() {
        def.reject(resp);
      });

      return def.promise();
    };
  };

  return Request;
});
