define(['Backbone','text!templates/hint_view_item.html','views/CollectionItemView'],function(Backbone,page_html,CollectionItemView) {
	var HintsItemView = CollectionItemView.extend({
		events: {
			'collapsibleexpand':'use_hint'
		},
		initialize: function(options) {
			var options_extended = _.extend(options,{template: page_html});
			CollectionItemView.prototype.initialize.apply(this, [options_extended]);
			this.listenTo(this.game,"change:remaining_hints",this.check_disable_hint_item_view);
		},		
		use_hint: function(e) {
			this.game.use_hint(this.model);
			this.$el.addClass('used-hint');
		},
		after_rendering:function() {
			this.check_disable_hint_item_view();
		},
		
		before_rendering: function() {
			if ( this.model.get('is_used') ) { 
				this.$el.addClass('used-hint');
			}
		},
		
		check_disable_hint_item_view:function() {
			if (this.game.get('remaining_hints') <= 0 && ! this.model.get('is_used')) {
				this.$el.collapsible({disabled:true});
			}
		}
	});
	
	return HintsItemView;
});