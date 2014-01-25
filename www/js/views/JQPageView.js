define(['Backbone','models/globals'], 
	function(Backbone,globals) {
		var view = Backbone.View.extend({
			initialize: function() {
				this.$el.attr('data-role','page');
			},
			
			events:function(){
				var core_events = {
						'pageremove':'page_remove'
				};
				
				if ( globals.platform.os == "Android" && globals.platform.version > -1 && globals.platform.version   < 3 ) {
					console.log("Adding manual touch events");
					core_events = _.extend(core_events,{
						'touchstart .ui-btn' : 'apply_style_manually',
						'touchend .ui-btn' : 'remove_style_manually'
					});
				}
				
				return core_events;
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
			
			
		});	

		return view;
});
