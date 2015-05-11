require.config({
	urlArgs: "_=" + (new Date()).getTime(),
	baseUrl: "js",
	paths: {
		jquery: "lib/jquery/dist/jquery",
		underscore: "lib/underscore/underscore",
		backbone: "lib/backbone/backbone"
	},
	shim: {
		'backbone': {
	        // These script dependencies should be loaded before loading
        	// backbone.js
			deps: ['jquery', 'underscore'],
			// Once loaded, use the global 'Backbone' as the
            // module value.
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
    'jquery': {
      exports: '$'
    }
	}
});

define([
	'backbone',
	'router'
], function(Backbone, router) {
		Backbone.history.start({ pushState: true });
});
