define(['Backbone','text!templates/multiple_option_item.html'],function(Backbone,page_html) {
	var MultipleOptionItemView = Backbone.View.extend({
		game: undefined,
		initialize: function(options) {
			this.game = options.game;
		},
		events:{
			'click':'next_page'
		},
		render: function() {
			
			var tmpl_page = _.template(page_html,this.model.toJSON());
			this.$el = $(tmpl_page);
			return this.$el;
		},
		next_page: function() {
			var answer = this.model.get('answer_txt');
			this.game.get_next_page(answer);
		}
		
	});
	
	return MultipleOptionItemView;
});