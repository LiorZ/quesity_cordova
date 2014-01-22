define(['Backbone','text!templates/quest_list_item_view.html'], 
function(Backbone,item_template) {
	
	var item = Backbone.View.extend({
		tagName:'li',
		render: function() {
			console.log(JSON.stringify(this.model.toJSON()));
			var html = _.template(item_template,this.model.toJSON());

			this.$el.html(html);

			return this.$el;
		}
	
	});

	return item;

});
