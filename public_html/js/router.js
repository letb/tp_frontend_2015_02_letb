
// Router works only with views

define([
	'backbone',
	'views/scoreboard',
	'views/main',
	'views/game',
	'views/login'
], function(
	Backbone,
	scoreboardView,
	mainView,
	gameView,
	loginView
) {
	var $page = $('#page');
	var Router = Backbone.Router.extend({
		routes: {
			'scoreboard': 'scoreboardAction',
			'game': 'gameAction',
			'login': 'loginAction',
			'*default': 'defaultActions'
		},

		defaultActions: function() {
			$page.html(mainView.el);
		},

		scoreboardAction: function() {
			$page.html(scoreboardView.el);
		},

		gameAction: function() {
			$page.html(gameView.el);
		},

		loginAction: function() {
			$page.html(loginView.el);
		}
	});

	return new Router();
});
