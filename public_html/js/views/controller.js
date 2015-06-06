define([
  'backbone',
  'views/preloader'
], function (Backbone, preloader) {
  var Controller = Backbone.View.extend({

    initialize: function() {
      var self = this;

      $(document).on("click", ".js-nav", function(evt) {
        var href = $(this).attr("href");
        evt.preventDefault();
        Backbone.history.navigate(href, true);
      });

      $(document).ajaxStart(function() {
        self.preloaderOn();
      });
      $(document).ajaxStop(function() {
        self.preloaderOff();
      });
    },

    load: function() {
      _.each(arguments, function(view){
        $('.page__content').prepend(view.el);
        this.listenTo(view, 'preloader:on', this.preloaderOn);
        this.listenTo(view, 'preloader:off', this.preloaderOff);
        view.hide();
      }, this);
    },

    changeView: function(view) {
      if (this.currentView) {
        this.preloaderOff();
        this.currentView.hide();
      }
      view.render().show();
      this.currentView = view;
    },

    preloaderOn: function() {
      preloader.show();
    },

    preloaderOff: function() {
      preloader.hide();
    }
  });

  return new Controller();
});
