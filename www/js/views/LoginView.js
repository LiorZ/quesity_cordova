define(['Backbone','text!templates/login_page.html','views/JQPageView','models/api'], 
	function(Backbone,home_template, JQPageView,api) {
		var LoginView = JQPageView.extend({
			id:'login_view',
			events:{
				'click #facebook_login_div': 'facebook_login',
				'click #submit_btn' :'manual_login'
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
				FB.login(null, {scope:'email,user_location,user_birthday'});	
			},
			manual_login:function() {
				$.mobile.loading("show");
				var email = this.$el.find('#email').val();
				var password = this.$el.find('#password').val();
				var json_to_send = {email: email, password: password};
				$.ajax({
						type:"POST",
						url:api.login_local(),
						data:json_to_send,
						timeout:15000,
						success:function(data,textStatus,xhr) {
							console.log("Manual Login was successful");
							if ( xhr.status ==  200 ){
								window.localStorage.setItem('account_id',JSON.stringify(data._id));
								window.location.hash="#home";
							}
						},
						error:function(jqXHR, textStatus, errorThrown){
							console.log(JSON.stringify(errorThrown));
							console.log("Status number: " + jqXHR.status);
							console.log("TEXT STATUS: " + textStatus);
							alert("Error logging in, please try again");
						}
				}).always(function() {
					$.mobile.loading("hide");
				});
			}
		});	

		return LoginView;
});
