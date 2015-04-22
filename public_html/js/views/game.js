define([
	'backbone',
	'tmpl/game',
	'views/canvas',
	'views/colorpalette',
	'models/colorpalette'
], function (Backbone, tmpl, CanvasView, ColorPaletteView, ColorPalette) {
	var GameView = Backbone.View.extend({
		id: 'game-view',
		template: tmpl,

		initialize: function(){
			this.canvasView = new CanvasView({id: 'canvas-view'});
			this.colorpaletteView = new ColorPaletteView({id: 'color-palette-view'});
		},

		render: function() {
			this.$el.html(this.template());
			this.$('#canvas-area').prepend(this.canvasView.$el);
			this.$('#colors-panel').prepend(this.colorpaletteView.$el);

			this.canvasView.render();
			this.colorpaletteView.render();
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