define(['views/JQPageView','text!templates/quest_properties_view.html'],function(JQPageView,template) {
	
		var QuestPropertiesView = JQPageView.extend({
			render: function() {
				var html = _.template(template,this.model.toJSON());
				this.$el.html($(html).html());
				this.$el.addClass('page-theme');
				return this.$el;
			},
			
		});
		
		return QuestPropertiesView;
	
});