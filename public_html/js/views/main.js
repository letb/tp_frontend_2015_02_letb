define([
	'app',
	'backbone',
	'tmpl/main'
], function (app, Backbone, tmpl){
	var MainView = Backbone.View.extend({
		id: "main-view",
		template: tmpl,

		render: function() {
			this.$el.html(
				this.template({
					signedIn: app.session.signedIn(),
					user: app.session.user
				})
			);
			return this;
		},

		show: function() {
			this.$el.show();
		},

		hide: function() {
			this.$el.hide();
		}
	});

	return new MainView();
});
