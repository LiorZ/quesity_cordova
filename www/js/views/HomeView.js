define(['Backbone','text!templates/home_template.html','views/JQPageView'], 
	function(Backbone,home_template, JQPageView) {
		var HomeView = JQPageView.extend({
			render: function() {
				var jq_obj = this.format_template(home_template);
				this.$el.append(jq_obj);
				this.$el.addClass('page-theme');
				return this.$el;
			}	
		});	

		return HomeView;
});
