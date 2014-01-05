define(['views/JQPageView','text!templates/game_page_view.html','views/OpenQuestionDialogView'],function(JQPageView,template,OpenQuestionDialogView) {
	
		var GamePageView = JQPageView.extend({
			events: {
				'click #btn_game_continue': 'next_page'
			},
			initialize: function() {
				this.listenTo(this.model,'game:next_page:static',this.next_page_static);
				this.listenTo(this.model,'game:next_page:location',this.next_page_location);
				this.listenTo(this.model,'game:next_page:after',this.switch_to_page);
				this.listenTo(this.model,'game:wrong_answer:location',this.show_wrong_location);
				this.listenTo(this.model,'game:next_page:open_question',this.show_open_question_dialog);
				this.listenTo(this.model,'game:wrong_answer:open_question',this.show_wrong_open_answer);
			},
			render: function() {
				var game = this.model;
				var page = game.get_first_page();
				var page_html = this.render_page(page);
				this.$el.html($(page_html).html());
				return this.$el;
			},
			render_page: function(page) {
				var html = _.template(template,page.toJSON());
				return html;
			},
			
			next_page: function() {
				console.log("Trying to move to the next page");
				var game = this.model;
				game.invoke_next_page();
			},
			
			next_page_static: function(cur_page) {
				console.log("Moving to the next page - static");
				this.model.get_next_page();
			},
			
			switch_to_page:function(page) {
				var page_html = page.get('page_content');
				var page_container = this.$el.find('#page_container');
				$.mobile.loading("show",{
					text:'Moving to next page ... ',
					textVisible: true,
					theme:'b'
				});
				page_container.animate({opacity:0},{duration:300, complete:function() {
					page_container.html($(page_html));
					page_container.waitForImages(function() {
						page_container.animate({opacity:1},300);
						$.mobile.loading("hide");
					});
						
				}});
				
			},
			
			next_page_location:function() {
				$.mobile.loading("show",{
					text:'Getting your location ... ',
					textVisible: true,
					theme:'b'
				});
				var context = this;
				var success = function(position) {
					var location = {
							lat: position.coords.latitude,
							lng: position.coords.longitude
					};
					
					var next_page = context.model.get_next_page(location);
					$.mobile.loading("hide");
				};
				
				var error_func = function(error) {
					$.mobile.loading("hide");
					if ( error.code = PositionError.TIMEOUT ){
						alert("Couldn't get a fix on your location"); //#il8 #redesign
					}
					console.log(JSON.stringify(error));
				};
				navigator.geolocation.getCurrentPosition(success,
                        error_func,
                        {enableHighAccuracy: true, timeout:10000});
			},
			show_wrong_location: function() {
				alert("You are not at the right location...");
			},
			
			show_open_question_dialog: function() {
				var dialog = new OpenQuestionDialogView({model:this.model});
				dialog.render();
			},
			show_wrong_open_answer: function() {
				alert("Wrong ... Please try again"); //#il18 #redesign
			}
			
		});
		
		return GamePageView;
	
});