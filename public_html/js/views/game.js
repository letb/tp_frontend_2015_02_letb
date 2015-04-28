define([
	'backbone',
	'tmpl/game',
	'models/colorpalette',
	'views/canvas',
	'views/colorpalette',
], function (Backbone, tmpl, ColorPaletteModel, CanvasView, ColorPaletteView) {
	var GameView = Backbone.View.extend({
		id: 'game-view',
		template: tmpl,

		initialize: function(){
			this.canvasView = new CanvasView({id: 'canvas-view'});
			this.colorpaletteView = new ColorPaletteView({id: 'color-palette-view'});
		},

		events: {
			'click .clear-button' : 'clear'
		},

		render: function() {
			this.$el.html(this.template());
			this.$('.canvas-panel').prepend(this.canvasView.$el);
			this.$('.colors-panel').prepend(this.colorpaletteView.$el);

			this.canvasView.render();
			this.colorpaletteView.render();

			return this;
		},

		clear: function(e) {
			this.canvasView.clear();
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