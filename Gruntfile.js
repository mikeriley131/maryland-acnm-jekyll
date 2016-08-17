module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> - Written by <%= pkg.author %> (<%= pkg.contact %>) */\n'
    },
    // Jekyll
    jekyll: {
      build: {
        dest: '_site'
      }
    },
    // SASS
    sass: {
      prod: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
          banner: '<%= meta.banner %>'
        },
        files: [{
          expand: true,     // Enable dynamic expansion.
          cwd: '_assets/scss',
          src: ['*.scss'],  // Actual pattern(s) to match.
          dest: '_assets/css/',
          ext: '.min.css'  // Dest filepaths will have this extension.
        }]
      },
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
          banner: '<%= meta.banner %>'
        },
        files: [{
          expand: true,     // Enable dynamic expansion.
          cwd: '_assets/scss',
          src: ['*.scss'],  // Actual pattern(s) to match.
          dest: '_assets/css/',
          ext: '.css'      // Dest filepaths will have this extension.
        }]
      }
    },
    // Adds vendor prefixes as needed based on caniuse-db
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
        },
        files:{
          '_assets/css/main.css':'_assets/css/main.css',
          '_assets/css/main.min.css':'_assets/css/main.min.css'
        }
      }
    },
    // Uglify
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        report: 'min'
      },
      target: {
        files: '<%= pkg.js %>'
      }
    },
    // Watch
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'autoprefixer']
      },
      scripts: {
        files: '_assets/js/*.js',
        tasks: ['uglify']
      },
      jekyll: {
        files: [
          'index.html',
          '_includes/*.html',
          '_layouts/*.html',
          '_pages/*/*.html',
          '_assets/css/*.css',
          '_assets/js/*.js',
          '!_site/**/*' // Stops watch from triggering again after Jekyll compiles
        ],
        tasks: ['jekyll']
      }
    },
    // BrowserSync
    browserSync: {
      files: ['_site/*.html', '_site/_assets/css/*.css', '_site/_assets/js/*.js'],
      options: {
        watchTask: true,
        server: {
          baseDir: '_site'
        }
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Custom task
  grunt.registerTask('build', ['sass:prod','sass:dev', 'autoprefixer:dist', 'uglify', 'jekyll']);

  // Default task
  grunt.registerTask('default', ['build', 'browserSync', 'watch']);
};