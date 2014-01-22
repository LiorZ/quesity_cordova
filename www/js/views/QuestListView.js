define(['Backbone','views/QuestListItemView','text!templates/quest_list_view.html'],
function(Backbone, QuestListItemView,list_template) {
	
	var list = Backbone.View.extend({

		render:function() {
			var collection = this.model;
			var list = $(list_template);
			collection.each(function(quest) {
				var item_view = new QuestListItemView({model:quest});

				//get the jquery object:
				var obj = item_view.render();
				obj.appendTo(list);
			});
			this.$el = list;
			return this.$el;
		},
		refresh:function() {
			this.$el.listview('refresh');
		}
	
	});

	return list;
});
