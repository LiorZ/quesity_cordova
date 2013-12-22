require.config({
  baseUrl: "./js",
  paths: {
    jQuery: 'lib/jquery/jquery.1.9.0',
    Underscore: 'lib/underscore/underscore',
    Backbone: 'lib/backbone/backbone',
    text: 'lib/text/text',
    BackboneRelational: 'lib/backbone/backbone-relational',
    domReady:'lib/require/domReady',
    jqm:"lib/jquery-ui-mobile/jquery.mobile-1.4.0",
    fastclick: 'lib/fastclick/fastclick.min'

  },

  shim: {
	'Underscore': {
		deps:['jQuery'],
		exports:'_'
	},
	'jQuery': {
		exports:'$'
	},
    'Backbone': {
	deps: ['Underscore', 'jQuery'],
	exports:'Backbone'
    } ,
    'BackboneRelational':{
	deps:['Backbone'],
	exports: 'BackboneRelational'
    },
    jqm: {
	deps: ['jQuery']
    }
  }
});

define(['jqm','domReady','Backbone','routers/AppRouter'], 
function(jqm,domReady,Backbone,AppRouter) {
	
		// domReady is RequireJS plugin that triggers when DOM is ready
		console.log("Before DomReady");
		domReady(function () {

			function onDeviceReady(desktop) {
				console.log("Entered onDeviceReady");
			// Hiding splash screen when app is loaded
//				if (desktop !== true)
					//cordova.exec(null, null, 'SplashScreen', 'hide', []);
				$.mobile.defaultPageTransition = 'slide';
				$.mobile.allowCrossDomainPages = true;
				$.support.cors = true;
			
				var app_router = new AppRouter();
				Backbone.history.start();
				console.log("Started Backbone history");

				app_router.navigate("home", { trigger:true});
				console.log("Navigated to home");

			// Setting jQM pageContainer to #container div, this solves some jQM flickers & jumps
			// I covered it here: http://outof.me/fixing-flickers-jumps-of-jquery-mobile-transitions-in-phonegap-apps/
			//$.mobile.pageContainer = $('#container');

			// Setting default transition to slide
			// Pushing MainView
			//$.mobile.jqmNavigator.pushView(new HomeView());
			}

			if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
			// This is running on a device so waiting for deviceready event
			console.log("Adding event listener for deviceready");
			document.addEventListener('deviceready', onDeviceReady, false);
			} else {
			// On desktop don't have to wait for anything
			onDeviceReady(true);

			}
		});

});
