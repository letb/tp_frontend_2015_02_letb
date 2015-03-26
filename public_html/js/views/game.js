define([
	'backbone',
	'tmpl/game'
], function(
	Backbone,
	GameTmpl
) {
	var View = Backbone.View.extend({
		id: 'game-view',
		template: GameTmpl,

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