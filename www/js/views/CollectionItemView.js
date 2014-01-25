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
			this.before_rendering();
			return this.$el;
		},
		before_rendering: function() {
			
		},
		after_rendering: function() {
			
		}
		
	});
	
	return CollectionItemView;
});