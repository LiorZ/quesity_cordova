define(['Backbone','text!templates/quest_list_item_view.html'], 
function(Backbone,item_template) {
	
	var item = Backbone.View.extend({
		tagName:'li',
		render: function() {
			var html = _.template(item_template,this.model.toJSON());

			this.$el.html($(html).html());

			return this.$el;
		}
	
	});

	return item;

});
