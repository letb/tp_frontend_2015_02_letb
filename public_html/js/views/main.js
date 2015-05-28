define([
	'app',
	'backbone',
	'tmpl/main',
	'api/storage'
], function (app, Backbone, tmpl, storage){
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
			storage.remove('signup-name');
			storage.remove('signup-email');
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
