define([
	'app',
	'backbone',
	'tmpl/signup',
	'models/session',
	'api/storage'
], function (app, Backbone, tmpl, Session, storage) {
	var SignupView = Backbone.View.extend({
		className: "signup-view",
		template: tmpl,

		initialize: function() {
		},

		events: {
			'submit .sign-form__signup': 'signup',
			'keyup .sign-form__input' : 'save'
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},

		show: function() {
			this.$el.show();
			$('.sign-form__signup').ready(this.load);
		},

		hide: function() {
			this.$el.hide();
			
		},

		load: function(el) {
			var name = storage.get('signup-name');
			var email = storage.get('signup-email');
			$("input[name=name]").val(name);
			$("input[name=email]").val(email);
		},

		save: function(e) {
			var target = e.currentTarget;
			if (target.type != 'password')
				storage.set("signup-"+target.name, target.value);
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
