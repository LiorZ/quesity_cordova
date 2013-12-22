define(['Backbone'], 
	function(Backbone) {
		console.log("Defining HomeView");
		var HomeView = Backbone.View.extend({
			template:$('#home_view_template'),
			render: function() {
				this.$el.html(this.template.html());
				return this.$el;
			}	
		});	

		return HomeView;
});
