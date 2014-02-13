define(['models/GameCollection','models/globals'],function(GameCollection,globals) {
	
	globals.game_collection = new GameCollection();
	if ( window.localStorage.saved_games ) {
		globals.game_collection.add(window.localStorage.saved_games);
	}
	
	if (  window.localStorage.my_quests ) {
		globals.my_quests.add( window.localStorage.my_quests );
	}
	
	var PersistanceModel = Backbone.Model.extend({
		initialize:function() {
			this.listenTo(globals.game_collection,"change:game:page",this.save_game);
			this.listenTo(globals.game_collection,"remove",this.save_game);
			this.listenTo(globals.my_quests,'add remove',this.save_my_quests);
		},
		save_game:function() {
			console.log("Saving Game!!");
			var obj = globals.game_collection.toJSON();
			window.localStorage.saved_games = obj;
		},
		save_my_quests:function() {
			console.log("Saving My Quests");
			var obj = globals.my_quests.toJSON();
			window.localStorage.my_quests = obj;
		}
		
	});
	globals.persistance = new PersistanceModel();
});