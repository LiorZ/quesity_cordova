define(['models/GameCollection','models/globals'],function(GameCollection,globals) {
	
	globals.game_collection = new GameCollection();
	
	var PersistanceModel = Backbone.Model.extend({
		initialize:function() {
			this.listenTo(globals.game_collection,"change:game:page",this.save_game);
			this.listenTo(globals.game_collection,"remove",this.save_game());
		},
		save_game:function() {
			console.log("Saving Game!!");
			var obj = globals.game_collection.toJSON();
			window.localStorage.saved_games = obj;
			console.log(JSON.stringify(obj));
		}
		
	});
	globals.persistance = new PersistanceModel();
});