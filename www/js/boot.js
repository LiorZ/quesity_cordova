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
    'facebook-js-sdk':'lib/facebook/facebook-js-sdk',
    waitForImages: 'lib/jquery/plugins/waitForImages',
    swipe:'lib/swipejs/swipe',
    iscroll:'lib/iscroll-4.2/iscroll-lite',
    'jqm-iscroll':'lib/jquery-mobile-iscrollview-1.3.6/jquery.mobile.iscrollview',
    'backbone-dualstorage':'lib/backbone/backbone.dualstorage'
  },

  shim: {
	'Underscore': {
		deps:['jQuery'],
		exports:'_'
	},
	'backbone-dualstorage':{
		deps:['Backbone']
	},
	iscroll:{
		deps:['jQuery']
	},
	'jqm-iscroll': {
		deps:['jqm','iscroll']
	},
	swipe: {
		deps: ['jQuery']
	},
	'waitForImages': {
		deps:['jQuery']
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

define(['jqm','domReady','Backbone','BackboneRelational','routers/AppRouter','fb-connect','facebook-js-sdk','models/api','models/globals',
        'waitForImages','iscroll','jqm-iscroll','views/ConfirmationPopup','platform'], 
function(jqm,domReady,Backbone,BackboneRelational,AppRouter,fb_connect,facebook_sdk,api,globals,waitForImages,iscroll,jqm_iscroll,ConfirmationPopup) {
	
		// domReady is RequireJS plugin that triggers when DOM is ready
		console.log("Before DomReady");
		Backbone.Relational.store.addModelScope(globals);
		var onBackKeyPress = function() {
			var page_id = $.mobile.activePage.attr('id');
			console.log("PAGE ID IS " + page_id);
			if ( _.isUndefined(page_id) || _.isNull(page_id) ) {
				navigator.app.backHistory();
				return;
			}
			if ( page_id == "game_page" ) {
				console.log('B');
				var dialog = new ConfirmationPopup({
					message:"Leave Quest?",
					title:"Exit",
					yes_callback:function(){
						navigator.app.backHistory();
					}
				});
				var jqobj = dialog.render();
				$.mobile.activePage.find("#page_container").append(jqobj);
				dialog.delegateEvents();
				$('body').trigger('create');
				dialog.open_tooltip();

			}else if ( page_id == "home_view" || page_id == "login_view" ) {
				navigator.app.exitApp();
			}
			else {
				navigator.app.backHistory();
			}
		};
		
		domReady(function () {

			function onDeviceReady(desktop) {
				console.log("Entered onDeviceReady");
	            document.addEventListener("backbutton", onBackKeyPress, false);
			    //Fixing the content-height issue:
				
				FB.init({
					appId: '211673598896341',
					nativeInterface: CDV.FB,
					useCachedDialogs: false
				});
				
				var loading_timeout = setTimeout(function() {
					navigator.splashscreen.hide();
					window.location.hash="#loading";
				},4000);
				
				
				var handleStatusChange = function(response) {
					  if (response.status == "connected" ) {
						console.log("Got a valid response");
					    console.log(JSON.stringify(response));
						var json_to_send = {
								facebook_id: response.authResponse.userId,
								access_token: response.authResponse.accessToken
							};
						
						$.ajax({
							type:"POST",
							url:api.register_facebook,
							data:json_to_send,
							timeout:15000,
							success:function(data,textStatus,xhr) {
								console.log('SENT DATA TO QUESITY');
								navigator.splashscreen.hide();
								clearTimeout(loading_timeout);
								$.mobile.loading("hide");
								if ( xhr.status ==  200 ){
									window.localStorage.setItem('account_id',JSON.stringify(data._id));
									window.location.hash="#home";
								}
								else{
									console.log("Got a bad textstatus");
									console.log(xhr.status);
									FB.logout();
									window.location.hash = "#login";
								}
							},
							error: function(jqXHR, textStatus, errorThrown){
								clearTimeout(loading_timeout);
//								FB.logout();
								if ( textStatus == "error"){
									alert("Network error. Please try again");
									window.location.hash="#login";
								}else if ( textStatus == "timeout" ) {
									window.location.hash = "#loading/error";
								}
							}
						});
					  } else {
						  clearTimeout(loading_timeout);
						  navigator.splashscreen.hide();
						  console.log("Error getting response");
						  console.log(JSON.stringify(response));
						  window.location.hash = "#login";
					  }
					};

	 
				$.mobile.linkBindingEnabled = false;

				// Disabling this will prevent jQuery Mobile from handling hash changes
				$.mobile.hashListeningEnabled = false;
				console.log("Platform: " + globals.platform.os + " Version: "  +globals.platform.version);
				if ( globals.platform.os == "Android" && globals.platform.version < 3 ) {
					$.mobile.defaultPageTransition = 'slide';
				}else {
					$.mobile.defaultPageTransition = 'fade';
				}
				$.mobile.ajaxEnabled = false;
				$.mobile.pushStateEnabled = false;

				//Enabling cross origin resource sharing
				$.support.cors=true;
				var app_router = new AppRouter();
				Backbone.history.start();
//				app_router.navigate("login", { trigger:true});
				FB.Event.subscribe('auth.statusChange', handleStatusChange);
				FB.getLoginStatus(handleStatusChange,true);
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
