define([
	'backbone',
	'tmpl/scoreboard',
	'collections/scoreboard'
], function (Backbone, tmpl, scoreboard) {
	var ScoreboardView = Backbone.View.extend({
		collection: scoreboard,
		id: "scoreboard-view",

		initialize: function() {
			this.listenTo(this.collection, 'reset', this.update);
		},

		template: function() {
			return tmpl(_.first(this.collection.toJSON(), 10));
		},

		render: function() {
			this.trigger('preloader:on');
			this.collection.fetch({reset: true});
			return this;
		},

		show: function() {
			this.$el.show();
		},

		hide: function() {
			this.$el.hide();
		},

		update: function () {
			this.trigger('preloader:off');
			this.$el.html(this.template());
		}
	});

	return new ScoreboardView();
});
