'use strict';

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    paths: {
      dev: 'src',
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
          script: './server/main.js',
          debug: true
        },
      },
    },

    open: {
      options: {
        delay: 500
      },
      dev: {
        path: 'http://localhost:<%= express.options.port %>/'
      },
    },

    env: {
      test: { NODE_ENV: 'test' },
      prod: { NODE_ENV: 'production' },
    },

    // 'webpack-dev-server': {
    //   options: {
    //     hot: true,
    //     port: 8000,
    //     webpack: webpackDevConfig,
    //     publicPath: '/assets/',
    //     contentBase: './<%= pkg.src %>/'
    //   },

    //   start: {
    //     keepAlive: true
    //   }
    // },

    karma: {
      unit: {
        configFile: 'test/client/karma.conf.js'
      }
    },

    copy: {
      dist: {
        files: [
          // includes files within path
          {
            flatten: true,
            expand: true,
            src: ['<%= paths.dev %>/*'],
            dest: '<%= paths.dist %>/',
            filter: 'isFile'
          },
          {
            flatten: true,
            expand: true,
            src: ['<%= paths.dev %>/images/*'],
            dest: '<%= paths.dist %>/images/'
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
      // 'webpack-dev-server'
      'express',
      'open',
      'express-keepalive',
    ]);
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'webpack'
  ]);

  grunt.registerTask('default', []);
};
