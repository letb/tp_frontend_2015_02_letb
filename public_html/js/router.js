define([
	'app',
	'backbone',
	'views/controller',
	'views/main',
	'views/scoreboard',
	'views/game',
	'views/signup',
	'views/signin'
], function (app, Backbone, controller, mainView, scoreboardView, gameView, signupView, signinView) {

	controller.load(mainView, scoreboardView, gameView, signupView, signinView);

	var Router = Backbone.Router.extend({
		routes: {
			'scoreboard': 'scoreboardAction',
			'game': 'gameAction',
			'signup': 'signupAction',
			'signin': 'signinAction',
			'*default': 'defaultActions'
		},

		initialize: function() {
			this.listenTo(app.session, 'signin:ok', this.redirectRoot);
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
		},

		redirectRoot: function() {
			this.navigate('/', {trigger: true});
		}
	});

	return Router;
});
