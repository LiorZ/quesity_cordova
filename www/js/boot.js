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
    fastclick: 'lib/fastclick/fastclick.min',
    'fb-connect': 'lib/facebook/cdv-plugin-fb-connect',
    'facebook-js-sdk':'lib/facebook/facebook-js-sdk'
  },

  shim: {
	'Underscore': {
		deps:['jQuery'],
		exports:'_'
	},

	'jquery-jsonp': {
		deps: ['jQuery']
	},

	'jQuery': {
		exports:'$'
	},
	
    'Backbone': {
    	deps: ['Underscore', 'jQuery'],
    	exports:'Backbone'
     },
     
     'BackboneRelational':{
    	deps:['Backbone'],
    	exports: 'BackboneRelational'
    },
    jqm: {
	deps: ['jQuery']
    }
  }
});

define(['jqm','domReady','Backbone','BackboneRelational','routers/AppRouter','fb-connect','facebook-js-sdk','api'], 
function(jqm,domReady,Backbone,BackboneRelational,AppRouter,fb_connect,facebook_sdk,api) {
	
		// domReady is RequireJS plugin that triggers when DOM is ready
		console.log("Before DomReady");
		domReady(function () {

			function onDeviceReady(desktop) {
				console.log("Entered onDeviceReady");
				if ( !desktop )
					navigator.splashscreen.hide();
				
				FB.init({
					appId: '211673598896341',
					nativeInterface: CDV.FB,
					useCachedDialogs: false
				});
				
				var handleStatusChange = function(response) {
					  if (response.status == "connected" ) {
						console.log("Got a valid response");
					    console.log(JSON.stringify(response));
						var json_to_send = {
								facebook_id: response.authResponse.userId,
								access_token: response.authResponse.accessToken
							};
							$.post(api.register_facebook,json_to_send, function(data,textStatus,xhr) {
								if ( xhr.status ==  200 ){
									window.localStorage.setItem('account_id',JSON.stringify(data._id));
									window.location.hash="#home";
								}
								else{
									console.log("Got a bad textstatus");
									console.log(xhr.status);
									window.location.hash = "#login";
								}

							});
					  } else {
						  console.log("Error getting response");
						  console.log(JSON.stringify(response));
						  window.location.hash = "#login";
					  }
					};

	 
				$.mobile.linkBindingEnabled = false;

				// Disabling this will prevent jQuery Mobile from handling hash changes
				$.mobile.hashListeningEnabled = false;
				$.mobile.defaultPageTransition = 'slide';
				$.mobile.ajaxEnabled = false;
				$.mobile.pushStateEnabled = false;

				//Enabling cross origin resource sharing
				$.support.cors=true;
				var app_router = new AppRouter();
				Backbone.history.start();
//				app_router.navigate("login", { trigger:true});
				FB.Event.subscribe('auth.statusChange', handleStatusChange);
				FB.getLoginStatus(handleStatusChange);

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
