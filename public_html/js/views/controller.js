define([
  'backbone'
], function (Backbone) {
  var Controller = Backbone.View.extend({
    initialize: function() {
      this.views = [];
    },

    changeView: function(view) {
      if (this.currentView) {
        this.currentView.remove();
      }
      $('#page').append(view.render().el);
      this.currentView = view
    }
  });

  return new Controller();
});