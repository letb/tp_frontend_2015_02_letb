define([
  'app',
  'backbone',
  'tmpl/components/timer'
], function (app, Backbone, tmpl) {
  var TimerView = Backbone.View.extend({
    timeout: 60,

    startTimer: function startTimer(duration, display) {
      var timer = duration, minutes, seconds;
      var self = this;
      var timerID = setInterval(function () {
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          $('.timer').html(minutes + ":" + seconds);
          if (--timer < 0) {
              clearInterval(timerID);
              self.finishGame();
          }
      }, 1000);
    },

    render: function() {
      this.$el.html(tmpl());
      this.startTimer(this.timeout, $('span.timer'));
      return this;
    },

    finishGame: function() {
      app.wsEventBus.trigger('ws:finish', { win: 0 });
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    }
  });

  return TimerView;
});