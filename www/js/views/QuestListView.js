define(['Backbone','views/QuestListItemView','text!templates/quest_list_view.html'],
function(Backbone, QuestListItemView,list_template) {
	
	var list = Backbone.View.extend({

		render:function() {
			var collection = this.model;
			var text = $(list_template).html().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			var list = $(text);

			collection.each(function(quest) {
				var item_view = new QuestListItemView({model:quest});

				//get the jquery object:
				var obj = item_view.render();
				obj.appendTo(list);
			});
			this.$el = list;
			return this.$el;
		}
	
	});

	return list;
});
