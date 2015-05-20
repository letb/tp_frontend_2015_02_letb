define([
  'backbone'
], function (Backbone) {
  var Controller = Backbone.View.extend({

    initialize: function(){
      $(document).on("click", ".navigate", function(evt) {
        var href = $(this).attr("href");
        evt.preventDefault();
        Backbone.history.navigate(href, true);
      });
    },

    load: function() {
      _.each(arguments, function(view){
        $('#page').append(view.el);
        view.hide();
      }, this);
    },

    changeView: function(view) {
      if (this.currentView) {
        if (this.currentView == view) { return; }
        this.currentView.hide();
      }
      view.render().show();
      this.currentView = view;
    }
  });

  return new Controller();
});