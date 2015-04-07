define([
	'backbone',
	'tmpl/game',
	'views/canvas'
], function (Backbone, tmpl, CanvasView) {
	var GameView = Backbone.View.extend({
		id: 'game-view',
		template: tmpl,

		initialize: function(){
			this.canvasView = new CanvasView({id: 'canvas-view'});
			console.log(this.canvasView.el);
		},

		render: function() {
			this.$el.html(this.template());
			this.$('#canvas-area').prepend(this.canvasView.$el);
			this.canvasView.render();
			return this;
		},

		show: function() {
			this.$el.show();
		},

		hide: function() {
			this.$el.hide();
		}
	});

	return new GameView();
});