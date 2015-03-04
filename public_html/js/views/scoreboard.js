define([
	'backbone',
	'tmpl/scoreboard',
	'models/score',
	'collections/score',
	'views/score'
], function(
	Backbone,
	scoreboardTmpl,
	ScoreModel,
	ScoreCollection,
	ScoreView
) {
	var ScoreboardView = Backbone.View.extend({
		collection: ScoreCollection,
		id: "scoreboard-view", 
		template: scoreboardTmpl,

		initialize: function() {
			this.$el.html(this.template());
			this.$('.logo').after('<ul class="score__list"></ul>');
			this.render();
		},

		render: function() {
			this.collection.forEach(this.addOne, this);
			return this;
		},

		addOne: function(scoreItem) {
			var scoreView = new ScoreView({model: scoreItem});
			this.$('.score__list')
				.append(scoreView.render().el);
		},

		show: function() {
			this.$(el).show();
		},

		hide: function() {
			this.$(el).hide();
		}
	});

	var scoreList = new ScoreCollection();
	scoreList.comparator = function(scoreItem) {
				return -scoreItem.get("score");
			};

	scoreList.add([
		{name: "Flying Dutchman", score: 123},
		{name: "Black Pearl", score: 27381},
		{name: "lladrona", score: 9287},
		{name: "Simply doodler", score: 28},
		{name: "eliot White", score: 11},
		{name: "shallowday", score: 892},
		{name: "helloworld", score: 198},
		{name: "LkJASdjkhASh", score: 0},
		{name: "llll", score: 999999999},
		{name: "Londoners Prisoner", score: 0}
	]);

	var scoreboardView = new ScoreboardView({collection: scoreList});
	return scoreboardView;	
});

