define([
	'app',
	'backbone',
	'views/controller',
	'views/main',
	'views/scoreboard',
	'views/game',
	'views/joystick',
	'views/joystick_canvas',
	'views/signup',
	'views/signin'
], function (app, Backbone, controller, mainView, scoreboardView, gameView, joystickView, joystickCanvasView, signupView, signinView) {

	controller.load(mainView, scoreboardView, gameView, joystickView, joystickCanvasView, signupView, signinView);

	var Router = Backbone.Router.extend({
		routes: {
			'scoreboard': 'scoreboardAction',
			'game': 'gameAction',
			'joystick': 'joystickAction',
			'joystick_canvas': 'joystickCanvasAction',
			'signup': 'signupAction',
			'signin': 'signinAction',
			'*default': 'defaultActions'
		},

		scoreboardAction: function() {
			controller.changeView(scoreboardView);
		},

		joystickAction: function() {
			controller.changeView(joystickView);
		},

		joystickCanvasAction: function() {
			controller.changeView(joystickCanvasView);
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

		redirect: function(url) {
			this.navigate(url, {trigger: true});
			if (!Backbone.history.fragment) {
				Backbone.history.loadUrl(url);
			}
		}
	});

	return Router;
});
