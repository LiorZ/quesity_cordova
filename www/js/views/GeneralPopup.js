define(['Backbone','text!templates/general_tooltip_popup.html'],function(Backbone,page_html) {
	var GeneralPopup = Backbone.View.extend({
		events: {
			'popupafterclose':'remove'
		},
		initialize:function(options) {
			if ( options.message ) {
				this.message = options.message;
			}
			this.title = options.title || '';
			this.page_html = options.page_html || page_html;
			if (options.events) {
				this.events = _.extend(this.events,options.events);
			}
		},
		render: function() {
			var html = this.page_html;
			if (this.message){
				html = _.template(this.page_html,{message:this.message,title:this.title});
			}
			this.$el = $(html);
			return this.$el;
		},
		open_tooltip: function(timeout) {
			$.mobile.loading("hide");
			this.$el.popup();
			this.$el.popup("open");
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