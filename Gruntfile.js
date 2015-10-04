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

      concat: {
        client: {
          src: [
            'client/app/**/*.js'
          ],
          dest: 'client/dist/client.js'
        },
        dependencies: {
          src: [
            'client/lib/jquery/dist/jquery.min.js',
            'client/lib/bootstrap/dist/js/bootstrap.min.js',
            'client/lib/angular/angular.js',
            'client/lib/angular-ui-router/release/angular-ui-router.min.js',
            'client/lib/angular-bootstrap/ui-bootstrap.min.js',
            'client/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'client/lib/lodash/dist/lodash.min.js',
            'client/lib/angularjs-dropdown-multiselect/dist/angularjs-dropdown-multiselect.min.js'
          ],
          dest: 'client/dist/dependencies.min.js'
        }
      },

      uglify: {
        client: {
          src: [
            'client/dist/client.js'
          ],
          dest: 'client/dist/client.min.js'
        }
      },

      cssmin: {
        target: {
          src: [
            'client/styles/styles.css'
          ],
          dest: 'client/dist/styles.min.css'
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    grunt.registerTask('build', [
      'concat',
      'uglify',
      'cssmin'
    ]);

    grunt.registerTask('default', [
      'nodemon'
    ]);
};
