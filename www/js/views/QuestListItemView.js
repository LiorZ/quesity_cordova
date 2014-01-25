define(['Backbone','text!templates/quest_list_item_view.html','models/globals'], 
function(Backbone,item_template,globals) {
	
	var item = Backbone.View.extend({
		tagName:'li',
		timeout:undefined,
		events: {
			'touchstart':'apply_active_style',
			'touchend':'remove_active_style',
			'scrollstart':'scrolling_started'
		},
		render: function() {
			console.log(JSON.stringify(this.model.toJSON()));
			var html = _.template(item_template,this.model.toJSON());

			this.$el.html(html);

			return this.$el;
		},
		apply_active_style:function() {
			var context = this;
			this.timeout = setTimeout(function( ){ context.$el.addClass('list-item-active'); },20);
		},
		remove_active_style:function() {
			clearTimeout(this.timeout);
			this.$el.removeClass('list-item-active');
		},
		scrolling_started: function() {
			this.remove_active_style();
		}
	
	});

	return item;

});
