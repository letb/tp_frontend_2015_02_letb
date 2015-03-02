define([
	'backbone',
	'views/main',
	'views/scoreboard',
	'views/game',
	'views/login'
], function(
	Backbone,
	mainView,
	scoreboardView,
	gameView,
	loginView
){
	$('#page').append(mainView.el);
	// mainView.hide();

	var Router = Backbone.Router.extend({
		routes: {
			'scoreboard': 'scoreboardAction',
			'game': 'gameAction',
			'login': 'loginAction',
			'*default': 'defaultActions'
		},
		defaultActions: function() {
			// TODO
			mainView.show();
		},
		scoreboardAction: function() {
			// TODO
			mainView.hide();
			scoreboardView.show();
		},
		gameAction: function() {
			// TODO
			mainViw.hide();
			gameView.show();
		},
		loginAction: function() {
			// TODO
			mainView.hide();
			loginView.show();
		}
	});

	return new Router();
});