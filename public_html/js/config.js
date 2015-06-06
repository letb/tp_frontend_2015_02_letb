require.config({
	urlArgs: "_=" + (new Date()).getTime(),
	baseUrl: "js",
	paths: {
		jquery: "lib/jquery/dist/jquery",
		underscore: "lib/underscore/underscore",
		backbone: "lib/backbone/backbone",
    materialize : 'lib/materialize/dist/js/materialize.min'
	},
	shim: {
    'materialize': {
      deps: ['jquery'],
      exports: 'Materialize'
    },
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

require(['main']);
