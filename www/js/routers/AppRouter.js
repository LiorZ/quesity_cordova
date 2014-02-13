define(['Backbone','views/HomeView','models/QuestCollection','views/FindQuestView','views/LoginView','config', 'models/Quest','views/QuestPropertiesView',
        'models/Game', 'views/GamePageView','views/LoadingScreen','models/MyQuests','models/globals','persistance'], 
	function(Backbone,HomeView, QuestCollection,FindQuestView,LoginView,config, Quest,QuestPropertiesView,Game,GamePageView,LoadingScreen,MyQuests,globals,persistance) {
		var AppRouter = Backbone.Router.extend({
			current_page: undefined,
			current_view:undefined,
			initialize: function() {
			},

			routes: {
				"home":"show_home", 
				"find_quests":"show_find_quests",
				"login": "show_login_view",
				"quest/:quest_id/details" : "show_quest_details",
				"quest/:quest_id/start": "start_quest",
				"loading":"show_loading",
				"loading/error" : "error_loading",
				"my_quests":"show_my_quests"
			},
			
			show_loading:function() {
				var l = new LoadingScreen();
				this.change_page(l);
			},
			error_loading:function() {
				var ok_callback = function() {
					window.location.hash="#login";
				};
				
				this.current_view.show_ok_only_popup({
					title:"Error",
					message:"Error logging in to Quesity.. please check your connection and try again.",
					ok_callback:ok_callback
				});
			},
			create_game:function(quest,callback) {
				var game = globals.game_collection.find(function(g) {
					return (g.get('quest').id == quest.id);
				});
				
				var start_new = function(q) {
					console.log("Starting a game from scratch");
					game = new Game();
					globals.game_collection.add(game);
					game.set_quest(quest);
					
					var exist_in_my_quests = globals.my_quests.find(function(q) {
						return ( q.id == quest.id );
					});
					if ( ! exist_in_my_quests ) {
						globals.my_quests.add(quest);
					}
					return game;
				};
				
				if ( game ){
					console.log("Returning existing game ... ");
					this.current_view.show_confirmation_popup({
						title:"Resume Game",
						message:"Would you like to resume your previous game?",
						yes_callback:function() {
							callback(game);
						},
						no_callback: function() {
							globals.game_collection.remove(game);
							var new_game = start_new();
							callback(new_game);
						}
						
					});
				}
				else {
					var new_game = start_new();
					callback(new_game);
				}
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
						var game_created_callback = function(ng) {
							game_view = new GamePageView({model:ng});
							context.change_page(game_view,
									{
								images_loaded: function() {
									$.mobile.loading("hide");
								}
							});
						};
						
						var game = context.create_game(quest,game_created_callback);
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
			
			show_quest_page:function(data) {
				
				var view = new FindQuestView({model:data.collection, title:data.title,icon:data.icon});
				this.change_page(view,{images_loaded:function(){
					$.mobile.loading("hide");
				}});
			},
			
			show_my_quests:function() {
				$.mobile.loading("show");
				this.show_quest_page({
					collection: globals.my_quests,
					title:"My Quests",
					icon:"img/book-full.png"
				});
			},

			show_find_quests: function() {
				console.log("Showing quests");
				var test_collection = new QuestCollection();
				test_collection.url = config.server_url + '/all_quests';
				var context = this;
				$.mobile.loading("show");
				test_collection.fetch( { 
					success: function() { 
						context.show_quest_page({
							collection:test_collection,
							title:"Find Quest",
							icon:'css/images/icons-png/search.png'
						});
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
				var prev_view = this.current_view;
				this.current_view = page;
				$('body').append(jq_obj);
				console.log("Change page " + window.location);
				jq_obj.waitForImages(function() {
					if ( this.current_page )
						this.current_page.html('');
					
					this.current_page = jq_obj;
					page.delegateEvents();
//					jq_obj.trigger('create');
					
					if (callbacks)
						callbacks.images_loaded();
					
					$.mobile.changePage(jq_obj, { changeHash: false, data:{prev_view: prev_view } } );
//					page.refresh();

				});
				
			}
		});
		return AppRouter;
	});

