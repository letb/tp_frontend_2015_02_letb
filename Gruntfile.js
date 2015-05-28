module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      // Show stdin and stdout in terminal
      options: {
          stdout: true,
          stderr: true
      },
      // Start server
      server: {
          command: 'java -cp server.v0.2.jar main.Main'
      }
    },
     // Compile Fest templates
    fest: {
      templates: {
        files: [{
          expand: true,               // Enable dynamic expantion.
          cwd: 'templates',           // Src matches are relative to this path.
          src: '**/*.xml',             // Actual pattern(s) to match.
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
    sass: {
      options: { sourcemap: 'none'},
      dev: {
        options: {style: 'nested'},
        files: [{
          expand: true,
          cwd: 'public_html/css/sass',
          src: 'base.scss',
          dest: 'public_html/css',
          ext: '.css'
        }]
      },
      dist: {
        options: {style: 'compressed'},
        files: [{
          expand: true,
          cwd: 'public_html/css/sass',
          src: 'base.scss',
          dest: 'public_html/css',
          ext: '.css'
        }],
      }
    },
    // Run predefined tasks whenever watched file patterns are added,
    // changed or deleted.
    watch: {
      // Compile modified templates
      fest: {
        files: ['templates/**/*.xml'],     // Watch templates
        tasks: ['fest'],              // If new then recompile
        options: {
            atBegin: true // Trigger the run of each task at startup of the watcher.
        }
      },
      // live reload
      server: {
        files: [                    // Watch statics
                'public_html/js/**/*.js',
                'public_html/css/*.css',
                'public_html/images/*.png',
                'public_html/images/*.jpg'
        ],
        options: {
          interrupt: true,  // Terminate the previous process and spawn a new one upon later changes.
          livereload: true  // Works on port 35729 by default
          // to enable in HTML: <script src="//localhost:35729/livereload.js"></script>
        }
      },
      sass: {
        files: ['public_html/css/sass/*.scss'],
        tasks: ['sass:dev'],
        options: {atBegin: true},
      }
    },
    // Run grunt tasks concurrently
    concurrent: {
      target: ['watch', 'shell', 'clean'],
      options: {
          logConcurrentOutput: true // Process log output
      }
    },
    requirejs: {
      build: {
        options: {
          almond: true,
          baseUrl: "public_html/js",
          mainConfigFile: "public_html/js/config.js",
          name: "config",
          optimize: "none",
          out: "public_html/js/build/config.js"
        }
      }
    },
    concat: {
      build: {
        separator: ';\n',
        src: ['public_html/js/lib/almond/almond.js',
              'public_html/js/build/config.js'
        ],
        dest: 'public_html/js/build/build.js'
      }
    },
    // Minimize
    uglify: {
      build: {
        files: {
          'public_html/js/build.min.js': ['public_html/js/build/build.js']
        }
      }
    },
    // Include proper scripts in index.html
    processhtml: {
      dev: {
        files: {
          'public_html/index.html': ['public_html/index-dev.html']
        }
      },
      dist: {
        files: {
          'public_html/index.html': ['public_html/index-dev.html']
        }
      }
    },
    // Clean all the mess
    clean:
      ['public_html/js/build', '.sass-cache', 'out']
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-fest');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask(
    'build:dist', [
      'fest',
      'sass:dist',
      'requirejs:build',
      'concat:build',
      'uglify:build',
      'processhtml:dist'
    ]
  );
  grunt.registerTask('production', ['build:dist', 'clean', 'shell:server']);
  grunt.registerTask('development', ['processhtml:dev', 'concurrent']);
  grunt.registerTask('default', ['development']);
}