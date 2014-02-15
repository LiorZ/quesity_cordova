define(['Backbone','views/JQPageView'],function(Backbone,JQPageView) {
	var view = JQPageView.extend({
		initialize: function(options){
			JQPageView.prototype.initialize.apply(this,[options]);
			this.$el.css('background','white !important');
			this.template = options.template;
		},
		render:function() {
			this.$el.html(this.template);
			return this.$el;
		},
		refresh:function() {
			$("#about-content").iscrollview("refresh",100);
		}
	});
	
	return view;
});