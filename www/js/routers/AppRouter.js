define(['Backbone','views/MainView','views/HomeView'], 
	function(Backbone,MainView,HomeView) {
		var AppRouter = Backbone.Router.extend({
			main_view: undefined,
			initialize: function() {
				this.main_view = new MainView();
			},

			routes: {
				"home":"show_home"	
			},

			show_home: function() {
				this.main_view.change_child_view(new HomeView());
			}
		});
		return AppRouter;
	});

