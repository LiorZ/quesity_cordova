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
  remove: {
  'test-libs':{
    options: {
      trace: false
    },
    fileList: ['www/js/tests/lib/mocha.css','www/js/tests/lib/mocha.js'],
    dirList: ['www/js/tests/lib/chai']
  },
  'dist': {
  	dirList: ['dist']
  },
  'dist-prepare': {
  	dirList:['dist/www/js/tests']
  },
  'unoptimized-js':{
  	dirList: ['dist/www/js']
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
      },
      'build-release': {
        options: {
        	stdout:true,
        	 execOptions: {
                    cwd: 'dist'
                }        	
        },
      	command: 'cp -rf ../.cordova . && chmod +x platforms/android/cordova/build && cordova build android --release'
      },
      'sign-release': {
        options:{
        	stdout:true
        },
      	command: function() {
      		var pass_json = grunt.file.readJSON('./storepass');
      		return 'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /home/lior/workspace/Quesity/Tools/key-store/quesity-release-key.keystore -storepass ' + pass_json.password + ' dist/platforms/android/bin/Quesity-release-unsigned.apk alias_name'
      	}
      	
      },
      'zipalign-release': {
      	command: 'zipalign -v 4 dist/platforms/android/bin/Quesity-release-unsigned.apk dist/platforms/android/bin/Quesity-release.apk'
      }
    },
    jshint: {
      app: ['www/js/*.js','www/js/views/*.js','www/js/models/*.js','www/js/routers/*.js','!www/js/requirejs-config.js'],
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
	},
	dist: {
		files: [{expand: true, src:['./**','!./node_modules/**','!./www/js/tests/**'], dest:'dist'},
		{expand:true,flatten:true, src:['./config/project.properties'], dest:'dist/platforms/android/'}
		]
	}
    },

    rename: {
	release: { 
		files: [ {src:['www/js/config_release.js'], dest:'www/js/config.js'} ]
	},

	debug: { 
		files: [ {src:['www/js/config_debug.js'], dest:'www/js/config.js'} ]
	},
	'optimized-js': {
		files:[ {src:['dist/www/js_optimized'] , dest:'dist/www/js' } ]
	}


    },
	requirejs: {
	  compile: {
	    options: {
		appDir: './dist/www/js',
		baseUrl:'./dist/www/js',
		dir:'./dist/www/js_optimized',
		mainConfigGile:'./dist/www/js/boot.js',
		optimize:'uglify'
	    }
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
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-remove');
	
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
		grunt.task.run('test:models');
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
	grunt.registerTask('dist','Create a distribution', function(platform) {
		grunt.task.run('jshint:app');
		grunt.task.run('copy:release');
		grunt.task.run('rename:release');
		grunt.task.run('test:models');
		grunt.task.run('remove:dist');
		grunt.task.run('copy:dist');
		grunt.task.run('requirejs:compile');
		grunt.task.run('remove:unoptimized-js');
		grunt.task.run('rename:optimized-js');
		grunt.task.run('shell:build-release');
		grunt.task.run('shell:sign-release');
		grunt.task.run('shell:zipalign-release');
		
	});	
	grunt.registerTask('test:models', ['jshint:app','copy:test-libs','connect', 'mocha_phantomjs','remove:test-libs']);



  // Default task
  grunt.registerTask('default', ['jshint']);
  

};
