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
    
   mocha_phantomjs: {
    all: {
      options: {
        urls: [
          "http://localhost:8000/js/tests/backbone/index.html",
        ]
      }
    }
  },
  connect: {
      server: {
        options: {
          port: 8000,
          base: 'www/.',
        }
      }
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
      },
      clear_logcat_android: {
	command: 'adb logcat -c'
      }
    },
    jshint: {
      app: ['www/js/*.js','www/js/views/*.js','www/js/models/*.js','www/js/routers/*.js'],
      test: ['www/js/tests/backbone/*.js','www/js/models/*.js'],
      options: {
        curly: false,
        immed: true,
        latedef: true,
        noarg: true,
	smarttabs: true,
        sub: true,
        undef: false,
        boss: true,
        devel: true,
        eqnull: true,
        browser: false,
        "-W099": true,
        "-W030":true,
        "-W020":true,
        globals: {
		cordova: true,
		jQuery: true,
		Backbone: true,
		_ : true
        }
    }
    },

    copy: {
	release: {
		files: [
			{expand: true, flatten:true, src:['config/config_release.js'],dest:'www/js'}
		]
	},

	debug: {
		files: [
			{expand: true, flatten:true, src:['config/config_debug.js'],dest:'www/js'}
		]
	},
	'test-libs': {
		files:[ 
			{expand: true, flatten:true, src:['node_modules/mocha/mocha.css','node_modules/mocha/mocha.js'], dest:'www/js/tests/lib'},
			{expand:true, flatten:true, src: ['node_modules/chai/*'], dest:'www/js/tests/lib/chai'}
		]
	}
    },

    rename: {
	release: { 
		files: [ {src:['www/js/config_release.js'], dest:'www/js/config.js'} ]
	},

	debug: { 
		files: [ {src:['www/js/config_debug.js'], dest:'www/js/config.js'} ]
	}


    }
});

	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy'); 
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-rename'); 
	grunt.loadNpmTasks('grunt-mocha-phantomjs');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Custom tasks
	grunt.registerTask('min', ['uglify']); // polyfil for uglify
	grunt.registerTask('debug','Create a debug build', function(platform) {
		grunt.task.run('jshint','concat','min');
		grunt.task.run('shell:debug_' + platform);
	});

	grunt.registerTask('debug_device','Create a debug build and run on device', function(platform) {
		grunt.task.run('jshint');
		grunt.task.run('copy:debug');
		grunt.task.run('rename:debug');
		grunt.task.run('shell:clear_logcat_android');
		grunt.task.run('shell:debug_' + platform + "_device");
	});

	grunt.registerTask('release_device','Create a release buid and run it on the device', function(platform) {
		grunt.task.run('jshint:app');
		grunt.task.run('copy:release');
		grunt.task.run('rename:release');
		grunt.task.run('test:models');
		grunt.task.run('shell:clear_logcat_android');

		grunt.task.run('shell:debug_' + platform + "_device");
	});
	
	grunt.registerTask('test:models', ['jshint:app','copy:test-libs','connect', 'mocha_phantomjs']);



  // Default task
  grunt.registerTask('default', ['jshint']);
  

};
