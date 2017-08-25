module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*\n Name: <%= pkg.name %>\n Version: <%= pkg.version %>\n Updated: <%= grunt.template.today("yyyy-mm-dd") %>\n */\n'
            },
            dist: {
                src: ['src/google-analytics-events.js'],
                dest: 'src/google-analytics-events.min.js'
            }
        },
        jsdoc : {
            dist : {
                src: ['src/*.js'],
                jsdoc: './node_modules/.bin/jsdoc',
                options: {
                    destination: 'doc'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('jsdoc', ['jsdoc']);
};