define([
  'backbone',
  'api/userSync'
], function (Backbone, userSync) {

  var UserModel = Backbone.Model.extend({
    sync: userSync,

    initialize: function() {
      this.on('change:id', function() {
        this.trigger('user:created', this)
      });
    },
  });

  return UserModel;
});
