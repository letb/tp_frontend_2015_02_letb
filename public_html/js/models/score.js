define([
	'backbone'
], function (
	Backbone
) {
	var ScoreModel = Backbone.Model.extend({
		default: {
			name: '',
			score: 0
		}
	});

	return ScoreModel;	
});


