define([
	'backbone',
	'tmpl/login'
], function(
	Backbone, 
	LoginTmpl
) {
	var View = Backbone.View.extend({
		id: "login-view",
		template: LoginTmpl,

		initialize: function() {
			this.$el.html(this.template());
		},

		render: function() {
			// TODO
		},

		show: function() {
			$(this.el).show();
		},
		
		hide: function() {
			// TODO
			$(this.el).hide();

		}
	});

	return new View();
});