
// Router works only with views

define([
	'backbone',
	'views/main',
	'views/scoreboard',
	'views/game',
	'views/login'
], function (Backbone, mainView, scoreboardView, gameView, loginView) {
	var Router = Backbone.Router.extend({
		routes: {
			'scoreboard': 'scoreboardAction',
			'game': 'gameAction',
			'login': 'loginAction',
			'*default': 'defaultActions'
		},

		scoreboardAction: function() {
			this.changeView(scoreboardView);
		},

		gameAction: function() {
			this.changeView(gameView);
		},

		loginAction: function() {
			this.changeView(loginView);
		},

		defaultActions: function() {
			this.changeView(mainView);
		},

		changeView: function(view) {
			if (this.currentView) {
				this.currentView.remove();
			}
			$('#page').append(view.render().el);
			this.currentView = view
		}
	});

	return new Router();
});
