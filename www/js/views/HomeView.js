define(['Backbone','text!templates/home_template.html','views/JQPageView'], 
	function(Backbone,home_template, JQPageView) {
		var HomeView = JQPageView.extend({
			render: function() {
//				if ( ! $('body').hasClass('body-background') ){
//					$('body').addClass('body-background');
//				}
				var jq_obj = this.format_template(home_template);
				this.$el.append(jq_obj);
				return this.$el;
			}	
		});	

		return HomeView;
});
