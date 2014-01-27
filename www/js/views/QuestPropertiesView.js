define(['views/JQPageView','text!templates/quest_properties_view.html'],function(JQPageView,template) {
	
		var QuestPropertiesView = JQPageView.extend({
			render: function() {
				var html = _.template(template,this.model.toJSON());
//				if ( ! $('body').hasClass('body-background') ){
//					$('body').addClass('body-background');
//				}
				
				this.$el.html(html);

				return this.$el;
			},
			refresh: function() {
				var context = this;
				require(['swipe'], function(swipe) {
					context.$el.waitForImages(function() {
						var slider = context.$el.find('#slider');
						var swiper = slider.Swipe({continuous: true,auto: 3000}).data('Swipe');
						setTimeout(function() {
							swiper.setup();
							$("#find_quest_content").iscrollview("refresh",10);
						},500);
					});
				});
			}
			
		});
		
		return QuestPropertiesView;
	
});