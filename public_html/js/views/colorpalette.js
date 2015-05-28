define([
  'backbone',
  'tmpl/components/color_picker'
], function (Backbone, tmpl) {
  var ColorPaletteView = Backbone.View.extend({
    events: {
      'click .picker__color': 'changeColor',
    },

    render: function() {
      this.$el.html(tmpl());
      return this;
    },

    changeColor: function(e) {
      e.preventDefault();
      this.trigger('color:change', e);
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    }
  });

  return ColorPaletteView;
});