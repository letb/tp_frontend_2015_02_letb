define(function(){
  var Request = function(baseUrl) {
    this.baseUrl = baseUrl || '';

    this.send = function(method, url, data) {
      var def = $.Deferred();
      var self = this;
      var okable = {
        isOK: function() {
          return this.status.match(/^(200|201)$/);
        }
      };

      function sanitized(url) {
        return url ? url : ''
      };

      $.ajax({
        type: method,
        url: self.baseUrl + sanitized(url),
        data: data,
        dataType: 'json'
      }).done(function(resp) {
        resp.__proto__ = okable;

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
