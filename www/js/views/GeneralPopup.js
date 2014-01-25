define(['Backbone','text!templates/general_tooltip_popup.html'],function(Backbone,page_html) {
	var GeneralPopup = Backbone.View.extend({
		events: {
			'popupafterclose':'remove'
		},
		initialize:function(options) {
			this.message = options.message;
		},
		render: function() {
			var html = _.template(page_html,{message:this.message});
			this.$el = $(html);
			return this.$el;
		},
		open_tooltip: function() {
			this.$el.popup();
			this.$el.popup("open");
		}
	});
	
	return GeneralPopup;
});