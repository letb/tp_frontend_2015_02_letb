define([
	'app',
	'backbone',
	'views/controller',
	'views/main',
	'views/menu',
	'views/scoreboard',
	'views/game',
	'views/joystick',
	'views/signup',
	'views/signin'
], function (app, Backbone, controller, mainView, menuView, scoreboardView, gameView, joystickView, signupView, signinView) {

	controller.load(mainView, scoreboardView, gameView, joystickView, signupView, signinView);

  $('.page').prepend(menuView.el);

	var Router = Backbone.Router.extend({
		routes: {
			'scoreboard': 'scoreboardAction',
			'game': 'gameAction',
			'joystick': 'joystickAction',
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
      menuView.render().show();
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
