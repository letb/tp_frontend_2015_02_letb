define([
	'backbone'
], function (Backbone) {
	var ScoreModel = Backbone.Model.extend({
		defaults: {
      id: '',
      login: '',
			score: 0
		}
	});

	return ScoreModel;
});
