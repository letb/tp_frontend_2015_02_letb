define([
	'backbone',
	'tmpl/main'
], function(
	Backbone, 
	tmpl
){
	var View = Backbone.View.extend({
	
		template: tmpl,
		initialize: function() {
			// TODO
			this.$el.html(this.template());
		},
		render: function() {
			// TODO
		},
		show: function() {
			// TODO
			$(this.el).show();
		},
		hide: function() {
			// TODO
			$(this.el).hide();
		}
	});

	return new View();
});