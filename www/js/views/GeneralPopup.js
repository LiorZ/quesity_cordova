define(['Backbone','text!templates/general_tooltip_popup.html'],function(Backbone,page_html) {
	var GeneralPopup = Backbone.View.extend({
		events: {
			'popupafterclose':'remove'
		},
		initialize:function(options) {
			this.message = options.message;
			this.page_html = options.page_html || page_html;
		},
		render: function() {
			var html = _.template(this.page_html,{message:this.message});
			this.$el = $(html);
			return this.$el;
		},
		open_tooltip: function(timeout) {
			console.log("F");
			this.$el.popup();
			console.log("G");
			this.$el.popup("open");
			console.log("H");
			var context = this;
			if (timeout) {
				setTimeout(function() {
					context.$el.popup("close");
				},timeout);
			}
		}
	});
	
	return GeneralPopup;
});