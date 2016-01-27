module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ['css'],
                    compress: true
                },
                files: {
                    "css/style.css": "less/style.less"
                }
            }
        },
        copy: {
            main: {
                src: "node_modules/requirejs/require.js",
                dest: "js/require.js"
            }
        },
        watch: {
            less: {
                files: ['less/*.less'],
                tasks: ['less']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['index.html','less/*','js/**/*', 'Gruntfile.js']
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "dev_js",
                    dir: "js/",
                    optimize: 'uglify',
                    logLevel: 0,
                    findNestedDependencies: true,
                    inlineText: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['less', 'copy']);
    grunt.registerTask('production', ['less', 'copy', 'requirejs']);
};