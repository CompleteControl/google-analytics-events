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
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};