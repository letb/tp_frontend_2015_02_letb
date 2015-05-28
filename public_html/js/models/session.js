define([
  'backbone',
  'models/user',
  'api/sessionSync'
], function (Backbone, User, sessionSync) {
  var SessionModel = Backbone.Model.extend({
    defaults: {
      signedIn: 'false'
    },
    sync: sessionSync,

    initialize: function() {
      this.user = new User();
      this.listenTo(this.user, 'user:created', this.autoLogin)
    },

    autoLogin: function(user) {
      function urlBackOrTo(url) {
        var fragment = Backbone.history.getFragment();
        return fragment.match(/(signin|signup)/) ? url : fragment;
      };

      this.user = user;
      this.set({ id: user.id, signedIn: true });

      this.trigger('signin:ok', urlBackOrTo('/'));
    },

    signedIn: function() {
      return this.get('signedIn');
    }
  });

  return SessionModel;
});
