module.exports = function(grunt) {

    grunt.initConfig({

      jshint: {
        files: {
          src: [
            'server/**/*.js',
            'client/app/**/*.js'
          ]
        }
      },

      nodemon: {
        dev: {
          script: 'server/app.js'
        }
      }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('default', [
      'nodemon'
    ]);
};
