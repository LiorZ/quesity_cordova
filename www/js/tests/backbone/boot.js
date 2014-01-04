require.config({
    baseUrl: '../../',
    paths: {
        // Testing libs
        'jquery'        : 'lib/jquery/jquery.1.9.0',
        'underscore'    : 'lib/underscore/underscore',
        'Backbone'      : 'lib/backbone/backbone',
        'mocha'			:'tests/lib/mocha',
        'BackboneRelational': 'lib/backbone/backbone-relational',
        'models'		: 'models/',
        'views'		: 'views/',
        'chai': 'tests/lib/chai/chai',
    },
    shim: {
        Backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        mocha: {
           exports: 'mocha'
        },
        'BackboneRelational':{
        	deps:['Backbone'],
        	exports: 'BackboneRelational'
        },
    },
    priority: [
        'jquery',
        'underscore',
        'common'
    ]
});


mocha.setup({
    ui: 'bdd',
    ignoreLeaks: true	
});

var runMocha = function(testGame,testQuestPage,Backbone,BackboneRelational,globals) {
	Backbone.Relational.store.addModelScope(globals);
	console = window.console || function() {};
	
	if (window.mochaPhantomJS) { 
		mochaPhantomJS.run(); 
	}
	else
		mocha.run();
};

require([
         'tests/backbone/Game','tests/backbone/QuestPage','Backbone','BackboneRelational','models/globals'
       ], runMocha);