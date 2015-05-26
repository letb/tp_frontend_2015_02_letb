define(function() {
  var Response = function(data) {
    this.data = data;
    this.body = this.data.body;

    this.isOK = function() {
      return this.data.status.match(/^(200|201)$/);
    };
  };

  return Response;
});
