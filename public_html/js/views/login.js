define([
	'backbone',
	'tmpl/login'
], function (Backbone, tmpl) {
	var LoginView = Backbone.View.extend({
		id: "login-view",
		template: tmpl,

		render: function() {
			this.$el.html(this.template());
			return this;
		},

		show: function() {
			this.$el.show();
		},

		hide: function() {
			this.$el.hide();
		}
	});

	return new LoginView();
});