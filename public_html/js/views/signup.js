define([
	'backbone',
	'tmpl/signup'
], function (Backbone, tmpl) {
	var SignupView = Backbone.View.extend({
		id: "signup-view",
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

	return new SignupView();
});