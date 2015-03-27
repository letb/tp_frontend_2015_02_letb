define([
	'backbone',
	'tmpl/login'
], function (Backbone, tmpl) {
	var LoginView = Backbone.View.extend({
		id: "login-view",
		template: tmpl,

		initialize: function() {
			$('#page').append(this.$el);
			this.render();
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
		}
	});

	return new LoginView();
});