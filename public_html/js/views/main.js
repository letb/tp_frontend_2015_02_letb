define([
	'backbone',
	'tmpl/main'
], function(
	Backbone, 
	MainTmpl
){
	var View = Backbone.View.extend({
		id: "main-view",
		template: MainTmpl,

		initialize: function() {
			this.$el.html(this.template());
		},

		show: function() {
			$(this.el).show();
		},

		hide: function() {
			$(this.el).hide();
		}
	});

	return new View();
});