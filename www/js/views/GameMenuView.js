define(['views/GeneralPopup','text!templates/game_menu_template.html'],function(GeneralPopup,game_menu_template) {
	var GameMenuView = GeneralPopup.extend({
		
		initialize:function(options) {
			if (!options){
				options = {};
			}
			var extended_options = _.extend(options, {
				page_html: game_menu_template,
				events: {
					'click #li_show_map':'show_map',
					'click #li_exit':'exit'
				}
			});
			GeneralPopup.prototype.initialize.apply(this,[extended_options]);
		},
		open_tooltip: function() {
			this.delegateEvents();
			this.$el.trigger("create");
			GeneralPopup.prototype.open_tooltip.apply(this,[]);
		},
		show_map: function() {
		},
		exit:function() {
			this.$el.popup("close");
			window.history.go(-2);
		}
		
	});
	
	return GameMenuView;
});
