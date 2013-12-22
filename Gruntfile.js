/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>' + '\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage : "" %>' + '\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' + '\n' +
        ' * License: <%= _.pluck(pkg.licenses, "type").join(", ") %> (<%= _.pluck(pkg.licenses, "url").join(", ") %>)' + '\n' +
        ' */\n\n'
    },
    concat: {
      options: {
        banner:  '<%= meta.banner %>' + '// GENERATED FILE - DO NOT EDIT\n'
      },
      dist: {}
    },
    uglify: {
      dist: {}
    },
    watch: {
      files: [
        '<%= jshint.files %>'
      ],
      tasks: ['jshint', 'concat', 'min']
    },
    shell: {
      _options: {
        failOnError: true,
        stdout: true
      },
      debug_ios: {
        command: 'cordova build ios && cordova emulate ios'
      },
      debug_android: {
        command: 'cordova build android && cordova emulate android'
      },
      debug_android_device: {
	command:'cordova build android && cordova emulate android --device'

      },
      debug_blackberry10: {
        command: 'cordova build blackberry10 && cordova emulate blackberry10'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'www/js/*.js'],
      options: {
        curly: false,
        eqeqeq: false,
        immed: true,
        latedef: true,
        noarg: true,
        sub: true,
        undef: false,
        boss: true,
        devel: true,
        eqnull: true,
        browser: false,
        globals: {
		cordova: true,
		jQuery: true,
		Backbone: true,
		_ : true
        }
    }
    }
});

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  

  // Custom tasks
  grunt.registerTask('min', ['uglify']); // polyfil for uglify
  grunt.registerTask('debug','Create a debug build', function(platform) {
    grunt.task.run('jshint','concat','min');
    grunt.task.run('shell:debug_' + platform);
  });

  grunt.registerTask('debug_device','Create a debug build and run on device', function(platform) {
    grunt.task.run('jshint');
    grunt.task.run('shell:debug_' + platform + "_device");
  });



  // Default task
  grunt.registerTask('default', ['jshint']);
  

};
