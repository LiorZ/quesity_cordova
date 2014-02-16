define(['models/globals','utils'],function(globals,utils) {
		
	
	
	globals.platform = {
			os: utils.getOS(),
			version: utils.getOSVersion()
	};
	
	
	console.log("Starting with " + globals.platform.os + " Version " + globals.platform.version);
	
});