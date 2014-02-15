define(['models/GameCollection','models/globals','models/MyQuests'],function(GameCollection,globals) {
	
	globals.game_collection = new GameCollection();
	var saved_games_str = window.localStorage.getItem('saved_games'); 
	if ( saved_games_str ) {
		console.log("SAVED GAME STRING " + saved_games_str);
		var saved_games = JSON.parse(saved_games_str);
		globals.game_collection.add(saved_games);
	}
//	
//	var my_quests_str = window.localStorage.getItem('my_quests');
//	if ( my_quests_str ) {
//		var my_quests = JSON.parse(my_quests_str);
//		globals.my_quests.add(my_quests);
//	}
//	
//	var PersistanceModel = Backbone.Model.extend({
//		initialize:function() {
//			this.listenTo(globals.game_collection,"change:game:page",this.save_game);
//			this.listenTo(globals.game_collection,"remove",this.save_game);
//			this.listenTo(globals.my_quests,'add remove',this.save_my_quests);
//		},
//		save_game:function() {
//			console.log("Saving Game!!");
//			var obj = globals.game_collection.toJSON();
//			window.localStorage.setItem('saved_games',JSON.stringify(obj));
//		},
//		save_my_quests:function() {
//			console.log("Saving My Quests");
//			var obj = globals.my_quests.toJSON();
//			window.localStorage.setItem('my_quests',JSON.stringify(obj));
//		}
//		
//	});
//	globals.persistance = new PersistanceModel();
});