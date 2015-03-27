define([
	'backbone',
	'tmpl/scoreboard',
	'models/score',
	'collections/score'
], function(
	Backbone,
	scoreboardTmpl,
	ScoreModel,
	ScoreCollection
) {
	var ScoreboardView = Backbone.View.extend({
		collection: ScoreCollection,
		id: "scoreboard-view",

		template: function() {
			return scoreboardTmpl(this.collection.toJSON());
		},

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

	var scoreboardView = new ScoreboardView();
	return scoreboardView;
});

