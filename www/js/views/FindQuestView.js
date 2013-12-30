define(['Backbone','views/QuestListView','text!templates/find_quest_page.html','views/JQPageView'],
function(Backbone,QuestListView,page_html,JQPageView) {
	var view = JQPageView.extend({
		render: function() {
			var list_view = new QuestListView({model:this.model});
			var list_obj = list_view.render();
			list_obj.appendTo(this.$el);
			return this.$el;
		}

	});

	return view;
});
