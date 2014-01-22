define(['Backbone','text!templates/login_page.html','views/JQPageView','models/api'], 
	function(Backbone,home_template, JQPageView,api) {
		var LoginView = JQPageView.extend({
			events:{
				'click #facebook_login_div': 'facebook_login'
			},
			render: function() {
				var jq_obj = this.format_template(home_template);
				this.$el.append(jq_obj);
//				if ( ! $('body').hasClass('body-background') ){
//					$('body').addClass('body-background');
//				}
				this.delegateEvents();
				console.log("Returning LoginView");
				console.log(this.$el.html());
				return this.$el;
			},
			facebook_login: function() {
				//['email','user_location', 'user_birthday']
				FB.login(null, {scope:'email,user_location,user_birthday'});	

			}
		});	

		return LoginView;
});
