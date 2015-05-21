define([
  'backbone',
], function(Backbone) {
  var SizePaletteModel= Backbone.Model.extend({

    defaults: {
      sizes: [],
      current: 5,
      settings: {
        border : "#0D004C",
        highlight: "#EC008C",
      }
    },
    
    initialize: function () {
      this.get('sizes').push(
        5, 10, 15, 20);
    },


    getColor: function(i) {
      return this.get('sizes')[i];
    },

    getParams: function() {
      // perform a deep copy of an object
      return $.extend(true, {}, this.get('params'));
    },

    getSettings: function() {
      return this.get('settings');
    },

    setCurrent: function(i) {
      this.set('current', this.getColor(i).color);
    },

    getCurrent: function() {
      return this.get('current');
    },

    getLength: function() {
      return this.get('sizes').length;
    }
  });

  return SizePaletteModel;
});
