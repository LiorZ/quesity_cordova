define(['Backbone'],
		function(Backbone) {
	var CollectionView = Backbone.View.extend({
		initialize: function(options) {
			this.template_html = options.template_html;
			this.collection = options.collection;
			this.containing_div = options.containing_div;
			this.after_render_callback = _.bind(options.after_render_callback || function(){},this);
			this.item_view = options.item_view;
			this.item_view_params = options.item_view_params || {};
		},
		sub_items:[],
		
		render: function() {
			var page_obj = $(this.template_html);
			this.$el = page_obj;
			return this.$el;
		},
		
		open_dialog:function() {
			var collection = this.collection;
			var target_jq = this.$el.find(this.containing_div);
			var game = this.model;
			var context = this;
			collection.each(function(l) {
				var l_view = new context.item_view( _.extend(context.item_view_params,{model:l}) );
				context.sub_items.push(l_view);
				var html_item = l_view.render();
				target_jq.append(html_item);
				l_view.delegateEvents();
				l_view.after_rendering();
			});
			
			this.delegateEvents();
			this.after_render_callback();
		},
		remove: function(options) {
			_.each(this.sub_items,function(item) {
				item.remove();
			});
			Backbone.View.prototype.remove.apply(this,[options]);
		}
		
	});
	
	return CollectionView;
});