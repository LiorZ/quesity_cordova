define(['Backbone','text!templates/multiple_option_view.html','views/MultipleOptionItemView','views/CollectionView'],
		function(Backbone,page_html,MultipleOptionItemView,CollectionView) {
	var MultipleOptionView = CollectionView.extend({
		events:{
			'click .multiple_choice_item': 'close_popup'
		},
		initialize:function() {
			var item_view_params = {
				game: this.model
			};
			
			var options = {
					template_html: page_html,
					collection: this.model.get_current_page().get('links'),
					containing_div: '#option_list',
					after_render_callback: this.open_popup,
					item_view: MultipleOptionItemView,
					item_view_params: item_view_params
			};
			
			CollectionView.prototype.initialize.apply(this, [options]);
		},
		open_popup:function() {
			this.$el.popup();
			this.$el.trigger('create');
			this.$el.popup('open');
			console.log("Option List");
			console.log(this.$el.find('#option_list'));
			this.$el.find('#option_list').listview('refresh');
		},
		close_popup: function() {
			this.$el.popup('close');
			this.remove();
		}
		
	});
	
	return MultipleOptionView;
});