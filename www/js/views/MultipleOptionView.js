define(['Backbone','text!templates/multiple_option_view.html','views/MultipleOptionItemView'],
		function(Backbone,page_html,MultipleOptionItemView) {
	var MultipleOptionView = Backbone.View.extend({
		events:{
			'click .multiple_choice_item': 'close_popup'
		},
		render: function() {
			var page_obj = $(page_html);
			this.$el = page_obj;
			return this.$el;
		},
		
		open_dialog:function() {
			var links = this.model.get_current_page().get('links');
			var target_jq = this.$el.find('#option_list');
			var game = this.model;
			links.each(function(l) {
				var l_view = new MultipleOptionItemView({model: l, game: game});
				target_jq.append(l_view.render());
				l_view.delegateEvents();
			});
			
			this.delegateEvents();
			this.$el.popup();
			this.$el.trigger('create');
			this.$el.popup('open');
		},
		close_popup: function() {
			this.$el.popup('close');
			this.remove();
		}
		
	});
	
	return MultipleOptionView;
});