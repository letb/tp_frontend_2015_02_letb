define([
	'backbone',
	'models/score'
], function(
	Backbone,
	ScoreModel
) {
	var ScoreView = Backbone.View.extend({
		model: ScoreModel,
		tagName: "li",    
		className: "score__item",
		template: _.template('<h3> <%= name %> : <%= score %></h3>'),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	return ScoreView;	
});

