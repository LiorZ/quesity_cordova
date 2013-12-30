define(['Backbone'], 
	function(Backbone) {
		var view = Backbone.View.extend({
			
			initialize: function() {
				this.$el.attr('data-role','page');
			},
			
			events: {
				'pageremove':'page_remove'
			},
			
			page_remove: function() {
				this.remove();
			},
			format_template: function(template_html) {
				var raw_html = $(template_html).html().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				return $(raw_html);

			},
			render: function() {
				return this.$el;
			}	
		});	

		return view;
});
