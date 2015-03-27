define([
	'backbone',
	'tmpl/game'
], function (Backbone, tmpl) {
	var GameView = Backbone.View.extend({
		id: 'game-view',
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

	return new GameView();
});