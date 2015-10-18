'use strict';

var webpackDistConfig = require('./webpack.dist.config.js');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    paths: {
      dev: 'client',
      dist: 'dist'
    },

    webpack: {
      options: webpackDistConfig,
      dist: {
        cache: false
      }
    },

    express: {
      options: {
        port: process.env.PORT || 9000,
      },
      dev: {
        options: {
          script: './server',
          debug: true,
        },
      },
    },

    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      express: {
        files: [
          'server/**/*.js',
        ],
        tasks: [
          'express:dev',
          // 'wait',
        ],
      }
    },

    open: {
      options: {
        delay: 500
      },
      dev: {
        path: 'http://localhost:<%= express.options.port %>/',
        app: 'Google Chrome'
      },
    },

    env: {
      test: { NODE_ENV: 'test' },
      prod: { NODE_ENV: 'production' },
    },

    karma: {
      watch: {
        configFile: 'test/client/karma.conf.js',
        autoWatch: true,
        singleRun: false
      },
      single: {
        configFile: 'test/client/karma.conf.js',
      }
    },

    processhtml: {
      dist: {
        files: {
          '<%= paths.dist %>/index.html': ['<%= paths.dev %>/index.html']
        }
      }
    },

    copy: {
      dist: {
        files: [
          // includes files within path
          // {
          //   flatten: true,
          //   expand: true,
          //   src: ['<%= paths.dev %>/*'],
          //   dest: '<%= paths.dist %>/',
          //   filter: 'isFile'
          // },
          {
            flatten: true,
            expand: true,
            src: ['<%= paths.dev %>/images/*'],
            dest: '<%= paths.dist %>/images/'
          },
          {
            flatten: true,
            expand: true,
            src: ['<%= paths.dev %>/favicons/*'],
            dest: '<%= paths.dist %>/favicons/'
          }
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= paths.dist %>'
          ]
        }]
      }
    }
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
    this.async();
  });

  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');
    var done = this.async();
    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done()
    }, 1500);
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'build',
        'env:prod',
        'express',
        'open',
        'express-keepalive',
      ]);
    }

    grunt.task.run([
      'express',
      // 'open',
      // 'express-keepalive',
      // 'wait',
      'watch'
    ]);
  });

  grunt.registerTask('test', function (target) {
    if (target === 'watch') {
      return grunt.task.run([
        'karma:watch',
      ]);
    }

    grunt.task.run([
      'karma:single',
    ]);
  });

  grunt.registerTask('build', [
    'clean',
    'processhtml',
    'copy',
    'webpack'
  ]);

  grunt.registerTask('default', []);
};
