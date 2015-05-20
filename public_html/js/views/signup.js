define([
	'app',
	'backbone',
	'tmpl/signup',
	'models/session'
], function (app, Backbone, tmpl, Session) {
	var SignupView = Backbone.View.extend({
		id: "signup-view",
		template: tmpl,

		events: {
			'submit .signup-form': 'signup'
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},

		show: function() {
			this.$el.show();
		},

		hide: function() {
			this.$el.hide();
		},

		signup: function(e) {
			e.preventDefault();
			app.session.user.save({
				name: this.$("input[name=name]").val(),
				email: this.$("input[name=email]").val(),
				password: this.$("input[name=password]").val()
			});
		}
	});

	return new SignupView();
});
