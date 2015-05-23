define([
	'app',
	'backbone',
	'tmpl/game',
	'tmpl/waiting',
	'tmpl/finish',
	'models/colorpalette',
	'views/canvas',
	'views/colorpalette',
	'views/chat',
	'api/socket'
], function (app, Backbone, tmpl, tmplWait, tmplFinish, colorPalette, CanvasView, ColorPaletteView, ChatView, socket) {
	var GameView = Backbone.View.extend({
		id: 'game-view',
		template: tmpl,
		state: 'wait',

		initialize: function(){
			this.canvasView = new CanvasView({id: 'canvas-view'});
			this.colorpaletteView = new ColorPaletteView({id: 'color-palette-view'});
			this.chatView = new ChatView({ id: 'chat-view' });

		},

		events: {
			'click .clear-button' : 'clear'
		},

		render: function() {
			this.listenTo(app.wsEventBus, 'ws:open', this.waitGame);
			this.listenTo(app.wsEventBus, 'ws:start', this.startGame);
			this.listenTo(app.wsEventBus, 'ws:finish', this.finishGame);

			switch (this.state) {
				case 'wait':
					this.$el.html(tmplWait());
					break;
				case 'play':
					this.insert();
					break;
				case 'finish':
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
			$('.canvas-panel').prepend(this.canvasView.$el);
			$('.colors-panel').prepend(this.colorpaletteView.$el);
			$('.chat-area').prepend(this.chatView.render().$el);

			this.canvasView.render();
			this.colorpaletteView.render();
			// this.chatView.render();
		},

		clear: function(e) {
			this.canvasView.clear();
		},

		show: function() {
			if (socket.closed) {
				this.createGame();
			};
			this.$el.show();
		},

		hide: function() {
			this.$el.hide();
		},

		createGame: function() {
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