define(['Backbone','views/HomeView','models/QuestCollection','views/FindQuestView','views/LoginView','config', 'models/Quest','views/QuestPropertiesView',
        'models/Game', 'views/GamePageView'], 
	function(Backbone,HomeView, QuestCollection,FindQuestView,LoginView,config, Quest,QuestPropertiesView,Game,GamePageView) {
		var AppRouter = Backbone.Router.extend({
			current_page: undefined,
			initialize: function() {
			},

			routes: {
				"home":"show_home", 
				"find_quests":"show_find_quests",
				"login": "show_login_view",
				"quest/:quest_id/details" : "show_quest_details",
				"quest/:quest_id/start": "start_quest"
			},
			
			start_quest:function(quest_id) {
				var quest = Quest.findOrCreate({_id:quest_id},{create:false});
				if ( !quest ) {
					//TODO: handle error...
					return;
				}
				$.mobile.loading("show");
				var context = this;
				quest.get('pages').fetch({
					success: function() {
						$.mobile.loading("show");
						var game = new Game();
						game.set_quest(quest);
						game_view = new GamePageView({model:game});
						context.change_page(game_view,
								{
							images_loaded: function() {
								$.mobile.loading("hide");
							}
								});
						
					},
					error: function() {
						$.mobile.loading("hide");
						//TODO: Handle error..
					},
					silent: true
				});
				
			},
			
			show_quest_details: function(quest_id) {
				console.log("Changing to quest with id " + quest_id);
				var model = Quest.findOrCreate({_id:quest_id},{create:false});
				if ( ! _.isUndefined(model) && !_.isNull(model) ){
					$.mobile.loading("show");
					var quest_page = new QuestPropertiesView({model:model});
					this.change_page(quest_page,{
						images_loaded: function() {
							$.mobile.loading("hide");
						}
					});
				}else{
					alert("Error displaying quest, please try to logout and retry");
				}
			},

			show_home: function() {
				console.log("Changing to Home");
				this.change_page(new HomeView());
			},

			show_find_quests: function() {
				console.log("Showing quests");
				var test_collection = new QuestCollection();
				test_collection.url = config.server_url + '/all_quests';
				var context = this;
				$.mobile.loading("show");
				test_collection.fetch( { 
					success: function() { 
						var view = new FindQuestView({model: test_collection});
						context.change_page(view,{images_loaded:function(){
							$.mobile.loading("hide");
						}});
					},
					error: function(collection,response) {
						$.mobile.loading("hide");
						console.log("ERROR Fetching");
						console.log(JSON.stringify(response));
					}


				} );	
			}, 

			show_login_view: function() {
				
				console.log("Showing Login view");
				this.change_page(new LoginView());
			},

			change_page: function(page,callbacks) {
				var jq_obj = page.render();
				$('body').append(jq_obj);
				if ( this.current_page )
					this.current_page.html('');
				
				this.current_page = jq_obj;
				page.delegateEvents();
				$('body').trigger('create');
				console.log("Change page " + window.location);
				jq_obj.waitForImages(function() {
					if (callbacks)
						callbacks.images_loaded();
					$.mobile.changePage(jq_obj, { changeHash: false } );
				});
				
				page.refresh();
			}
		});
		return AppRouter;
	});

