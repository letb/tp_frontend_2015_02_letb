define([
], function() {

  var storage = {
    set: function(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {};
    },

    get: function(key) {
      try {
        var value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (e) {};
    },

    remove: function(key) {
      localStorage.removeItem(key);
    },

    clear: function() {
      localStorage.clear();
    }
  }

  return storage;
});
