define([],function() {
	var utils = {
			getOSVersion: function(){
				var ua = navigator.userAgent;
				if( ua.indexOf("Android") >= 0 )
				{
				  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
				  return androidversion;
				}
				return -1;
			},
			getOS: function() {
				return "Android";
			}
	};
	
	return utils;
});