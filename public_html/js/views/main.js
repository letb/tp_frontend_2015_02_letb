define([
	'backbone',
	'tmpl/main'
], function (Backbone, tmpl){
	var MainView = Backbone.View.extend({
		id: "main-view",
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

	return new MainView();
});
