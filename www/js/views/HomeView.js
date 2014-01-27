define(['Backbone','text!templates/home_template.html','views/JQPageView'], 
	function(Backbone,home_template, JQPageView) {
		var HomeView = JQPageView.extend({
			id:'home_view',
			render: function() {
//				if ( ! $('body').hasClass('body-background') ){
//					$('body').addClass('body-background');
//				}
				this.$el.html(home_template);
				return this.$el;
			}	
		});	

		return HomeView;
});
