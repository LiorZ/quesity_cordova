define(['Backbone','text!templates/ok_only_popup.html','views/GeneralPopup'],function(Backbone,page_html,GeneralPopup) {
	var OKOnlyPopup = GeneralPopup.extend({
		events: function() {
			var events = _.extend({
				'click #btn_ok':'ok_clicked'
			},GeneralPopup.prototype.events);
			return events;
		},
		initialize:function(options) {
			var parsed_html = _.template(page_html,{
				title:options.title,
				message: options.message
			});
			var options_extended = _.extend(options,{page_html:parsed_html});
			GeneralPopup.prototype.initialize.apply(this,[options_extended]);
		},
		ok_clicked :function() {
			this.$el.popup("close");
		}
		
	});
	
	return OKOnlyPopup;
});