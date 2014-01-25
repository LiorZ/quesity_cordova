define(['Backbone','text!templates/hints_view.html','views/HintItemView','views/CollectionView'],
		function(Backbone,page_html,HintsItemView,CollectionView) {
	var HintsView = CollectionView.extend({
		events: {
			'popupafterclose':'remove'
		},
		initialize:function() {
			rendered_html = _.template(page_html,{remaining_hints: this.model.get('remaining_hints')});
			var options = {
					template_html: rendered_html,
					collection: this.model.hints_in_page(),
					containing_div: '#hint_collapsibles',
					after_render_callback: this.open_popup,
					item_view: HintsItemView,
					item_view_params: {game: this.model}
			};
			this.listenTo(this.model,'change:remaining_hints',this.update_hint_count);
			CollectionView.prototype.initialize.apply(this, [options]);
		},
		
		open_popup:function() {
			this.$el.popup();
			this.$el.trigger('create');
			this.$el.popup('open');
		},
		close_popup: function() {
			this.$el.popup('close');
			this.remove();
		},
		update_hint_count:function() {
			this.$el.find('#remaining_hints').html(this.model.get('remaining_hints'));
		}
		
	});
	
	return HintsView;
});