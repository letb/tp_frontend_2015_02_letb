
// Router works only with views

define([
	'backbone',
	'views/main',
	'views/scoreboard',
	'views/game',
	'views/signup',
], function (Backbone, mainView, scoreboardView, gameView, signupView) {
	var Router = Backbone.Router.extend({
		routes: {
			'scoreboard': 'scoreboardAction',
			'game': 'gameAction',
			'signup': 'signupAction',
			'*default': 'defaultActions'
		},

		scoreboardAction: function() {
			this.changeView(scoreboardView);
		},

		gameAction: function() {
			this.changeView(gameView);
		},

		signupAction: function() {
			this.changeView(signupView);
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
