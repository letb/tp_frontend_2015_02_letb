define([
	'backbone',
	'models/score',
  'api/scoreboardSync'
], function(Backbone, scoreModel, scoreboardSync) {
	var ScoreboardCollection = Backbone.Collection.extend({
		model: scoreModel,
    sync: scoreboardSync,

    comparator: function (score) {
      return -score.get('score')
    }
	});

	return new ScoreboardCollection();
});
