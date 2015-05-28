define([
	'app',
	'backbone',
	'tmpl/main'
], function (app, Backbone, tmpl){
	var MainView = Backbone.View.extend({
		className: "main-view",
		template: tmpl,

		events: {
			'click  a.signout':     'signout'
		},

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
		},

    signout: function(e) {
      app.session.destroy();
    }
	});

	return new MainView();
});
