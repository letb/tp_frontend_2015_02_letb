define([
	'backbone',
	'tmpl/game'
], function (Backbone, tmpl) {
	var GameView = Backbone.View.extend({
		id: 'game-view',
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

	return new GameView();
});