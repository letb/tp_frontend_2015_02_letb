define([
	'backbone',
	'tmpl/main'
], function(
	Backbone,
	MainTmpl
){
	var View = Backbone.View.extend({
		template: MainTmpl,
		id: "main-view",

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

	return new View();
});
