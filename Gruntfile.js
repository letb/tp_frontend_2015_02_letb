module.exports = function (grunt) {

    grunt.initConfig({
        // Read in the project settings from the package.json file into the pkg property
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            // Show stdin and stdout in terminal
            options: {
                stdout: true,
                stderr: true
            },
            // Start server at 8000
            server: {
                command: 'java -cp L1.2-1.0-jar-with-dependencies.jar main.Main 8000'
            }
        },

        // Compile Fest templates
        fest: {
            templates: {
                files: [{
                    expand: true,               // Enable dynamic expantion.
                    cwd: 'templates', 	        // Src matches are relative to this path.
                    src: '*.xml', 		        // Actual pattern(s) to match.
                    dest: 'public_html/js/tmpl' // Destination path prefix.
                }],
		        options: {
                    // This function is called when template will be compiled
		            template: function (data) { 
                        // Make AMD module
		                return grunt.template.process(
		                    'define(function () { return <%= contents %> ; });', 
		                    {data: data}
		                );
		            }
		        }
            }
        },

        // Run predefined tasks whenever watched file patterns are added, 
        // changed or deleted.
    	watch: {
    		// Compile modified templates
            fest: {
                files: ['templates/*.xml'],     // Watch templates
                tasks: ['fest'],	            // If new then recompile
                options: {
                    atBegin: true	// Trigger the run of each task at startup of the watcher.
                }
            },
            // перезагружает страницы, если что-то изменилось
            server: {
        		files: [		                // Whatch statics
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    interrupt: true,	// Terminate the previous process and spawn a new one upon later changes.
                    livereload: true	// Works on port 35729 by default
                    // to enable in HTML: <script src="//localhost:35729/livereload.js"></script>
                }
            }
        },

        // Run grunt tasks concurrently
        concurrent: {
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true // Process log output
            }
        }
        
    });

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    
    grunt.registerTask('default', ['concurrent']);

};
