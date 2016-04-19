module.exports = function(grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //concat: {
    //  dist: {
    //    src: ['src/js/jquery.js','src/js/intro.js', 'src/js/main.js', 'src/js/outro.js'],
    //    dest: 'dist/build.js',
    //  }
    //},
    //
    // UNCSS
    uncss: {
      dist: {
        options: {
        },
        files: {
          'dist/css/tidy.css': ['src/index.html', 'src/contact.html', 'src/service.html']
        }
      }
    },
    // CONCAT JS AND CSS
    concat: {
      basic : {
        src: ['css/style.css', 'css/normalize.css'],
        dest: 'css/production.css',
      },
      extras : {
        src: ['js/scripts.js', 'js/boostrap.js'],
        dest: 'js/production.js',
      },
    },
    // critical: {
    //   test: {
    //     options: {
    //       base: './',
    //       css: [
    //         'test/fixture/styles/main.css',
    //         'test/fixture/styles/bootstrap.css'
    //       ],
    //       width: 320,
    //       height: 70
    //       },
    //     src: 'test/fixture/index.html',
    //     dest: 'test/generated/critical.css'
    //   }
    // },
    // CSS MIN
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      combine: {
       files: {
         'css/production.min.css': ['css/production.css']
       }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/build.min.js': ['dist/build.js']
        }
      }
    },
    minifyHtml: {
      options: {
        cdata: true
      },
      dist: {
        files: {
          'dist/index.html': 'src/index.html'
        }
      }
    },
    imagemin: {
      options: {
        cache: false
      },

      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },
    linkChecker: {
      // Use a large amount of concurrency to speed up check
      options: {
        maxConcurrency: 20
      },
      dev: {
        site: 'localhost',
        options: {
          initialPort: 8080
        }
      },
      postDeploy: {
        site: 'http://jose8a.github.io/performance_optimization_project/'
      }
    },
    clean: {
      build: ["path/to/dir/one", "path/to/dir/two"],
      release: ["path/to/another/dir/one", "path/to/another/dir/two"]
    }
    //
    //copy: {
    //  main: {
    //    files: [
    //      // includes files within path
    //      {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},
    //
    //      // includes files within path and its sub-directories
    //      {expand: true, src: ['path/**'], dest: 'dest/'},
    //
    //      // makes all src relative to cwd
    //      {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
    //
    //      // flattens results to a single level
    //      {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
    //    ],
    //  },
    //},
    // WATCH
    // watch: {
    //   gruntfile: {
    //     files: 'Gruntfile.js',
    //     tasks: ['jshint:gruntfile'],
    //   },
    //   src: {
    //     files: ['lib/*.js', 'css/**/*.scss', '!lib/dontwatch.js'],
    //     tasks: ['default'],
    //   },
    //   test: {
    //     files: '<%= jshint.test.src %>',
    //     tasks: ['jshint:test', 'qunit'],
    //   }
    // }
  });

  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-critical');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-minify-html');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-link-checker');

  grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);

};
