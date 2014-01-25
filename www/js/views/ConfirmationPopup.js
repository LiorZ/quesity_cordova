define(['Backbone','text!templates/confirmation_popup.html','views/GeneralPopup'],function(Backbone,page_html,GeneralPopup) {
	var ConfirmationPopup = GeneralPopup.extend({
		events: function() {
			var events = _.extend({
				'click #btn_yes':'yes_clicked',
				'click #btn_no':'no_clicked'
			},GeneralPopup.prototype.events);
			return events;
		},
		initialize:function(options) {
			var options_extended = _.extend(options,{page_html:page_html});
			GeneralPopup.prototype.initialize.apply(this,[options_extended]);
			this.yes_clicked = options.yes_callback || function() {};
			this.no_clicked = options.no_callback || function() { this.$el.popup("close"); };
			
		}
	});
	
	return ConfirmationPopup;
});