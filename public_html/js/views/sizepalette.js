define([
  'backbone',
  'tmpl/game',
  'models/sizepalette'
], function (Backbone, tmpl, SizePaletteModel) {
  var SizePaletteView = Backbone.View.extend({
    model: sizePalette = new SizePaletteModel(),

    initialize: function() {
      this.$el.append('<ul class="size-palette"></ul>');
    },

    render: function() {
      this.delegateEvents();
      return this;
    },

    mouseClick: function(e) {
    },


    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    }
  });

  return SizePaletteView;
});