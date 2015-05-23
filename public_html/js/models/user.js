define([
  'app',
  'backbone',
  'api/userSync'
], function (app, Backbone, userSync) {

  var UserModel = Backbone.Model.extend({
    sync: userSync,

    initialize: function() {
      this.on('change:id', function() {
        this.trigger('user:created', this)
      });
      this.listenTo(app.wsEventBus, 'ws:start', this.addEnemy);
      this.listenTo(app.wsEventBus, 'ws:finish', this.endGame);
    },

    isLeader: function() {
      return this.get('leader');
    },

    name: function() {
      return this.get('name') ? this.get('name') : 'Anonymous';
    },

    addEnemy: function(data) {
      if (data.leader) {
        this.set({ leader: data.leader, enemy: data.enemy, keyword: data.keyword });
      } else {
        this.set({ leader: data.leader, enemy: data.enemy });
      }
    },

    endGame: function(data) {
      this.set({ win: data.win });
    }
  });

  return UserModel;
});
