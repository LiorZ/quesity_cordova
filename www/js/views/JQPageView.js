define(['Backbone','models/globals','views/OKOnlyPopup','views/ConfirmationPopup'], 
	function(Backbone,globals,OKOnlyPopup,ConfirmationPopup) {
		var view = Backbone.View.extend({
			initialize: function() {
				this.$el.attr('data-role','page');
			},
			
			events:function(){
				var core_events = {
						'pageremove':'page_remove',
						'pagebeforeshow':'refresh',
						'pageshow':'remove_prev_page'
				};
				
				if ( globals.platform.os == "Android" && globals.platform.version > -1 && globals.platform.version   < 3 ) {
					console.log("Adding manual touch events");
					core_events = _.extend(core_events,{
						'touchstart a.ui-btn' : 'apply_style_manually',
						'touchend a.ui-btn' : 'remove_style_manually'
					});
				}
				
				return core_events;
			},
			remove_prev_page:function(event, ui){
				var prev = $(ui.prevPage);
				if (prev){
				  prev.trigger("pageremove");
				}else {
				}
			},
			page_remove: function() {
				this.remove();
			},
			format_template: function(template_html) {
				var raw_html = $(template_html).html().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				return $(raw_html);

			},
			render: function() {
				return this.$el;
			},
			refresh:function() {
				
			},
			
			apply_style_manually: function(ev) {
				$(ev.target).addClass('main-menu-btn-manual');
			},
			remove_style_manually: function(ev) {
				$(ev.target).removeClass('main-menu-btn-manual');
			},
			draw_popup:function(data,view) {
				var popup = new view(data);
				var html = popup.render();
				this.$el.append(html);
				popup.delegateEvents();
				$('body').trigger('create');
				this.delegateEvents();
				popup.open_tooltip();
			},
			show_ok_only_popup: function(data) {
				this.draw_popup(data,OKOnlyPopup);
			},
			show_confirmation_popup: function(data) {
				this.draw_popup(data,ConfirmationPopup);
			}
			
			
		});	

		return view;
});
