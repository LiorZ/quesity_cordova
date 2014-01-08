define(['Backbone','views/QuestListView','text!templates/find_quest_page.html','views/JQPageView'],
function(Backbone,QuestListView,page_html,JQPageView) {
	var view = JQPageView.extend({
		render: function() {
			this.$el.append(page_html);
			var list_view = new QuestListView({model:this.model});
			var list_obj = list_view.render();
			list_obj.appendTo(this.$el);
			this.$el.addClass('page-theme');
			return this.$el;
		},

		
	});

	return view;
});
