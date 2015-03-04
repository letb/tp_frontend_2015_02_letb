define([
	'backbone',
	'models/score'
], function(
	Backbone,
	ScoreModel
) {
	var ScoreCollection = Backbone.Collection.extend({
		model: ScoreModel 
	});

	return ScoreCollection;
});