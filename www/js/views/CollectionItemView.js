define(['Backbone'],function(Backbone) {
	var CollectionItemView = Backbone.View.extend({
		game: undefined,
		initialize: function(options) {
			this.game = options.game;
			this.template = options.template;
		},
		events:{
			'click':'click_event'
		},
		render: function() {
			var tmpl_page = _.template(this.template,this.model.toJSON());
			this.$el = $(tmpl_page);
			return this.$el;
		},
		click_event: function() {
		}
		
	});
	
	return CollectionItemView;
});