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
					'click #li_exit':'exit',
					'touchstart li':'apply_style',
					'touchend li':'remove_style'
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
		},
		get_elem_from_event:function(e) {
			if (!e || !e.target)
				return undefined;
			var clicked = $(e.target);
			if ( clicked.prop("tagName") == "li"){
				return clicked;
			}
			return clicked.parents('li');
		},
		apply_style:function(e) {
			var elem = this.get_elem_from_event(e);
			if (!elem)
				return;
			elem.addClass('list-item-active');
		},
		remove_style:function(e){
			var elem = this.get_elem_from_event(e);
			if (!elem)
				return;
			
			elem.removeClass('list-item-active');
		}
		
	});
	
	return GameMenuView;
});
