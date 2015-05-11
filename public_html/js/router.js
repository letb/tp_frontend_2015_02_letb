
// Router works only with views

define([
	'backbone',
	'views/controller',
	'views/main',
	'views/scoreboard',
	'views/game',
	'views/signup',
	'views/signin'
], function (Backbone, controller, mainView, scoreboardView, gameView, signupView, signinView) {

	controller.load(mainView, scoreboardView, gameView, signupView, signinView);

	var Router = Backbone.Router.extend({
		routes: {
			'scoreboard': 'scoreboardAction',
			'game': 'gameAction',
			'signup': 'signupAction',
			'signin': 'signinAction',
			'*default': 'defaultActions'
		},

		scoreboardAction: function() {
			controller.changeView(scoreboardView);
		},

		gameAction: function() {
			controller.changeView(gameView);
		},

		signupAction: function() {
			controller.changeView(signupView);
		},

		signinAction: function() {
			controller.changeView(signinView);
		},

		defaultActions: function() {
			controller.changeView(mainView);
		}
	});

	return new Router();
});
