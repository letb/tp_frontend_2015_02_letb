define([
  'backbone'
], function (Backbone) {
  var Controller = Backbone.View.extend({
    load: function() {
      _.each(arguments, function(view){
        $('#page').append(view.render().el);
        view.hide();
      }, this);
    },

    changeView: function(view) {
      if (this.currentView) {
        if (this.currentView == view) { return; }
        this.currentView.hide();
      }
      view.show();
      this.currentView = view;
    }
  });

  return new Controller();
});