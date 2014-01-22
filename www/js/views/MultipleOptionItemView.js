define(['Backbone','text!templates/multiple_option_item.html','views/CollectionItemView'],function(Backbone,page_html,CollectionItemView) {
	var MultipleOptionItemView = CollectionItemView.extend({
		game: undefined,
		initialize: function(options) {
			options_extended = _.extend(options,{template: page_html});
			CollectionItemView.prototype.initialize.apply(this, [options_extended]);
		},
		click_event: function() {
			var answer = this.model.get('answer_txt');
			this.game.get_next_page(answer);
		}
		
	});
	
	return MultipleOptionItemView;
});