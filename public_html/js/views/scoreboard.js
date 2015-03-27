define([
	'backbone',
	'tmpl/scoreboard',
	'collections/scoreboard'
], function (Backbone, tmpl, scoreboard) {
	var ScoreboardView = Backbone.View.extend({
		collection: scoreboard,
		id: "scoreboard-view",

		template: function() {
			return tmpl(this.collection.toJSON());
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

	return new ScoreboardView();
});
