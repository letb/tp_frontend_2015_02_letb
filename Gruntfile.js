module.exports = function (grunt) {

    grunt.initConfig({
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'java -cp L1.2-1.0-jar-with-dependencies.jar main.Main 8000'
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates', 	// исходная директория
                    src: '*.xml', 		// имена шаблонов 
                    dest: 'public_html/js/tmpl' // результирующая директория
                }],
		        options: {
		            template: function (data) { // задаем формат функции-шаблона
		                return grunt.template.process(
		                    'var <%= name %>Tmpl = <%= contents %> ;', 
		                    {data: data}
		                );
		            }
		        }
            }
        },
        // отслеживает изменения в files и запускает tasks
    	watch: {
    		// автоматически компилит темплейты
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],	// перекомпилировать
                options: {
                    atBegin: true	// запустить задачу при старте
                }
            },
            // перезагружает страницы, если что-то изменилось
            server: {
        		files: [		// отслеживает статику
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    interrupt: true,	
                    livereload: true	// перезагрузить страницу
                }
            }
        },
        // все задачи из таргета запускает как отдельные процессы
        concurrent: {
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true // вывод процесса
            }
        }
        
    });

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    
    grunt.registerTask('default', ['concurrent']);

};
