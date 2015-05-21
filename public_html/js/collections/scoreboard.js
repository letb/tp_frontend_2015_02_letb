define([
	'backbone',
	'models/user',
  'api/scoreboardSync'
], function(Backbone, userModel, scoreboardSync) {
	var ScoreboardCollection = Backbone.Collection.extend({
		model: userModel,
    sync: scoreboardSync,

    comparator: function (score) {
      return -score.get('score')
    }
	});

	return new ScoreboardCollection();
});
