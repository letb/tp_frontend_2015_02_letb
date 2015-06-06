define([
	'app',
	'backbone',
	'tmpl/game',
	'tmpl/waiting',
	'tmpl/finish',
	'views/canvas',
	'views/colorpalette',
	'views/chat',
	'views/timer',
	'api/socket'
], function (app, Backbone, tmpl, tmplWait, tmplFinish, CanvasView, ColorPaletteView, ChatView, TimerView, socket) {
	var GameView = Backbone.View.extend({
		className: 'game-view',
		template: tmpl,
		state: 'wait',

		initialize: function(){
			this.canvasView = new CanvasView({className: 'canvas-view'});
			this.colorpaletteView = new ColorPaletteView({className: 'color-palette-view'});
			this.chatView = new ChatView({ className: 'chat-view' });
			this.timerView = new TimerView ({ className: 'timer-view' })

			this.canvasView.listenTo(this.colorpaletteView,
															'color:change',
															this.canvasView.changeColor, this);
		},

		events: {
			'click .picker__color--eraser' : 'clear'
		},

		render: function() {
			this.listenTo(app.wsEventBus, 'ws:open:game', this.initGame);
			this.listenTo(app.wsEventBus, 'ws:start', this.startGame);
			this.listenTo(app.wsEventBus, 'ws:finish', this.finishGame);

			switch (this.state) {
				case 'wait':
					this.trigger('preloader:on');
					this.trigger('game:wait');
					this.$el.html(tmplWait());
					break;
				case 'play':
					this.trigger('preloader:off');
					this.trigger('game:start');
					this.insert();
					break;
				case 'finish':
					this.trigger('game:finished');
					this.$el.html(tmplFinish({
							win: app.session.user.get('win')
						})
					);
					this.waitGame();
					break;
			}
			return this;
		},

		insert: function() {
			this.$el.html(this.template({
					leader: app.session.user.get('leader'),
					user: app.session.user
				})
			);
			$('.game__drawing-area').prepend(this.canvasView.$el);
			$('.game__pen-color').prepend(this.colorpaletteView.$el);
			$('.game__chat-wrapper').prepend(this.chatView.render().$el);
			$('.game__chat-wrapper').prepend(this.timerView.render().$el);
			this.canvasView.render();
			this.colorpaletteView.render();
			// this.chatView.render();
		},

		clear: function(e) {
			this.canvasView.clear();
		},

		show: function() {
			if (socket.closed) {
				this.connectToGame();
			};
			this.$el.show();
		},

		hide: function() {
			this.waitGame();
			$('.page__content').removeClass("total-height");
			this.$el.hide();
		},

		initGame: function() {
			this.waitGame();
      var msg = { type : 'init:desktop' };
      socket.send(msg);
		},

		connectToGame: function() {
			socket.connect();
		},

		waitGame: function() {
			this.state = 'wait';
		},

		startGame: function() {
			this.state = 'play';
			this.render();
		},

		finishGame: function() {
			this.state = 'finish';
			this.render();
			socket.close();
		}
	});

	return new GameView();
});