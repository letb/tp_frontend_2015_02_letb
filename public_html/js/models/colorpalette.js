define([
  'backbone',
], function(Backbone, ColorModel) {
  var ColorPaletteModel= Backbone.Model.extend({

    defaults: {
      colors: [],
      current: "#A2D39C",
      settings: {
        border : "#0D004C",
        highlight: "#EC008C",
      },
      params: {
        x: 0,
        y: 0,
        r: 10,
        gap: 2
      }
    },
    

    initialize: function () {
      this.get('colors').push(
        { name: "black",   color: "#000000"  },
        { name: "orange",  color: "#F7977A"  },
        { name: "green",   color: "#A2D39C"  },
        { name: "blue",    color: "#6ECFF6"  },
        { name: "violet",  color: "#A187BE"  }, 
        { name: "white",   color: "#FFFFFF"  });
    },


    getColor: function(i) {
      return this.get('colors')[i];
    },

    getParams: function() {
      // perform a deep copy of an object
      return $.extend(true, {}, this.get('params'));
    },

    getSettings: function() {
      return this.get('settings');
    },

    setParams: function(x, y, r, gap) {
      this.get('params').x = x;
      this.get('params').y = y;
      this.get('params').r = r;
      this.get('params').gap = gap;
    },

    setCurrent: function(i) {
      this.set('current', this.getColor(i).color);
    },

    getCurrent: function() {
      return this.get('current');
    },

    getLength: function() {
      return this.get('colors').length;
    },

    clean: function() {
      
    }
  });

  return ColorPaletteModel;
});
