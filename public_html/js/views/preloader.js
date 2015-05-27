define([
  'backbone',
  'tmpl/preloader'
], function (Backbone, tmpl){
  var Preloader = Backbone.View.extend({

    initialize: function() {
      $('.page').append(this.$el);
    },

    render: function() {
      this.$el.html(tmpl());
      return this;
    },

    show: function() {
      this.render().$el.show();
    },

    hide: function() {
      this.$el.hide();
    }
  });

  return new Preloader();
});
