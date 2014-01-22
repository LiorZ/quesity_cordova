define(['Backbone','text!templates/hint_view_item.html','views/CollectionItemView'],function(Backbone,page_html,CollectionItemView) {
	var HintsItemView = CollectionItemView.extend({
		events: {
			'collapsibleexpand':'use_hint'
		},
		initialize: function(options) {
			var options_extended = _.extend(options,{template: page_html});
			CollectionItemView.prototype.initialize.apply(this, [options_extended]);
			this.check_disable_hint_item_view();
			this.listenTo(this.game,"change:remaining_hints",this.check_disable_hint_item_view);
		},		
		use_hint: function(e) {
			this.game.use_hint(this.model);
		},
		
		check_disable_hint_item_view:function() {
			if (this.game.get('remaining_hints') <= 2) {
				this.$el.collapsible({disabled:true});
			}
		}
	});
	
	return HintsItemView;
});