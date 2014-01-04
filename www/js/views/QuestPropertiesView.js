define(['views/JQPageView','text!templates/quest_properties_view.html'],function(JQPageView,template) {
	
		var QuestPropertiesView = JQPageView.extend({
			
			events: {
				'click #btn_start_quest': 'start_quest'
			},
			render: function() {
				var html = _.template(template,this.model.toJSON());
				this.$el.html($(html).html());
				return this.$el;
			},
			start_quest: function() {
				alert("Starting Quest!!");
			}
			
		});
		
		return QuestPropertiesView;
	
});