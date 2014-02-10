define(['views/JQPageView','text!templates/quest_properties_view.html'],function(JQPageView,template) {
	
		var QuestPropertiesView = JQPageView.extend({
			events: function(){
				var events = _.extend(JQPageView.prototype.events.apply(this,[]),{
					'collapsibleexpand [data-role="collapsible"]':'slide_expand',
					'collapsiblecollapse [data-role="collapsible"]':'slide_collapse',
				});
				return events;
			},
			render: function() {
				var html = _.template(template,this.model.toJSON());
				
				this.$el.html(html);

				return this.$el;
			},
			refresh: function() {
				var context = this;
				require(['swipe'], function(swipe) {
					console.log("CALLING SWIPE");
					context.$el.waitForImages(function() {
						var slider = context.$el.find('#slider');
						var swiper = slider.Swipe({continuous: true,auto: 5000, speed:500}).data('Swipe');
						setTimeout(function() {
							swiper.setup();
							$("#find_quest_content").iscrollview("refresh",100);
						},500);
					});
				});
				
			},
			prepare_slide: function(e) {
				console.log("Expanding...");
				var colaps = $(e.target);
				colaps.children().next().hide();
				return colaps;
			},
			slide_expand: function(e) {
				var colapse = this.prepare_slide(e);
				colapse.children().next().slideDown(200);
			},
			slide_collapse: function(e) {
				var colaps = $(e.target);
				colaps.children().next().slideUp(200);
			},
		});
		
		return QuestPropertiesView;
	
});