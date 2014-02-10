define(['views/JQPageView','models/globals'],function(JQPageView,globals) {
	var LoadingScreen = JQPageView.extend({
		loading_img:undefined,
		id:'loading_view',
		events: function() {
			var core_events = _.extend(JQPageView.prototype.events,{
				'pageshow':'show_loading_message',
				'pagehide':'hide_loading_message'
			});
			return core_events;
		},
		initialize:function(options) {
			JQPageView.prototype.initialize.apply(this,[options]);
			if (globals.platform.os == "Android" && globals.platform.version < 3) {
				this.loading_img = $("<img src='img/main_screen.png/>");
			}
			else {
				this.loading_img = $("<img src='img/main_screen.svg' />");
			}
			this.loading_img.css('width','100%').css('height','100%').css('position','absolute');
		},
		render: function() {
			this.$el.append(this.loading_img);
			return this.$el;
		},
		show_loading_message:function() {
			console.log("Showing loading screen");
			$.mobile.loading("show",{
				text:'Logging in to Quesity ... ',
				textVisible: true,
				theme:'b'
			});
		},
		hide_loading_message:function() {
			$.mobile.loading("hide");
		}
	});
	
	return LoadingScreen;
});