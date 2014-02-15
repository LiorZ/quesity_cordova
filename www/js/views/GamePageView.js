define(['views/JQPageView','text!templates/game_page_view.html','views/OpenQuestionDialogView',
        'views/MultipleOptionView','views/HintsView','views/GeneralPopup','views/GameMenuView'],
        function(JQPageView,template,OpenQuestionDialogView,MultipleOptionView,HintsView,GeneralPopup,GameMenuView) {
	
		var GamePageView = JQPageView.extend({
			events:function() {
				
				var events = _.extend(JQPageView.prototype.events.apply(this,[]),
				{'click #btn_game_continue': 'next_page',
				 'touchstart .game_button_container':'touch_begin_color',
				 'touchend .game_button_container':'touch_end_color',
				'click #btn_game_tactics' : 'open_tactics',
				'click #btn_game_menu':'show_menu'});
				
				return events;
			},
			id:'game_page',
			initialize: function(options) {
				
				JQPageView.prototype.initialize.apply(this, [options]);
				this.listenTo(this.model,'game:next_page:static',this.next_page_static);
				this.listenTo(this.model,'game:next_page:location',this.next_page_location);
				this.listenTo(this.model,'game:next_page:after',this.switch_to_page);
				this.listenTo(this.model,'game:wrong_answer:location',this.show_wrong_location);
				this.listenTo(this.model,'game:next_page:open_question',this.show_open_question_dialog);
				this.listenTo(this.model,'game:wrong_answer:open_question',this.show_wrong_open_answer);
				this.listenTo(this.model,'game:next_page:question',this.next_page_question);
				this.listenTo(this.model,'game:end', this.handle_game_end);
				
				//Initialize the persistance layer:
			},
			touch_begin_color:function(e) {
				var jq = $(e.target);
				if ( jq.hasClass('game_button_container') ) {
					jq.addClass('active-game-btn').find('a').addClass('active-game-btn');
				}else {
					jq.parents('.game_button_container').addClass('active-game-btn').find('a').addClass('active-game-btn');
				}
				
			},
			touch_end_color:function(e) {
				var jq = $(e.target);
				if ( jq.hasClass('game_button_container') ) {
					jq.removeClass('active-game-btn').find('a').removeClass('active-game-btn');
				}else {
					jq.parents('.game_button_container').removeClass('active-game-btn').find('a').removeClass('active-game-btn');
				}
			},
			render: function() {
				var game = this.model;
				var page = game.get('current_page');
				var page_html = _.template(template,page.toJSON());
				this.$el.html(page_html);
				return this.$el;
			},
			refresh: function() {
				var page_container = $("#page_container");
				page_container.waitForImages(function() {
					page_container.iscrollview("refresh",100);
				});
			},
			render_page: function(page) {
				var page_container = $("#page_container");
				var html = page.get('page_content');
				page_container.html(html);
				page_container.iscrollview("refresh",1000);
				
			},
			
			next_page: function() {
				console.log("Trying to move to the next page");
				var game = this.model;
				if ( ! game.is_game_over() ) {
					game.invoke_next_page();	
				}else {
					this.show_end_game_popup();
				}
				
			},
			open_tactics: function() {
				var hints_in_page = this.model.hints_in_page();
				if ( hints_in_page.size() === 0 ) {
					var tooltip = new GeneralPopup({message:"No hints for this page ..."});
					var html = tooltip.render();
					this.$el.append(html);
					tooltip.open_tooltip(2000);
					return;
				}
				var dialog = new HintsView({model:this.model});
				this.$el.append(dialog.render());
				dialog.open_dialog();
			},
			
			next_page_static: function(cur_page) {
				console.log("Moving to the next page - static");
				this.model.get_next_page();
			},
			
			switch_to_page:function(page) {
				var page_html = page.get('page_content');
				this.switch_to_page_content(page_html);
			},
			
			switch_to_page_content: function(page_html) {
				var page_container = $('#page_container');
				console.log(page_container);
				var virtual_page = $('<div id="virtual_page_container"></div>');
				$('body').append(virtual_page);
				var next_page_container = $('.iscroll-content');
				$.mobile.loading("show",{
					text:'Loading ... ',
					textVisible: true,
					theme:'b'
				});
				
				virtual_page.html(page_html);
				virtual_page.waitForImages(function() {
					page_container.fadeOut(500,function() {
						next_page_container.html(virtual_page.html());
						virtual_page.remove();
						page_container.iscrollview("scrollTo",0,0);
						page_container.fadeIn(500,function() {
							$.mobile.loading("hide");
							page_container.iscrollview("refresh",500,function() {
							});
						});
					});
				});
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
						context.show_ok_only_popup({
							title:"Location Error",
							message:"Couldn't get a fix on your location"
						});
					}
					console.log(JSON.stringify(error));
				};
				navigator.geolocation.getCurrentPosition(success,
                        error_func,
                        {enableHighAccuracy: true, timeout:20000});
			},
			show_wrong_location: function() {
				this.show_ok_only_popup({
					title:"Wrong location",
					message:"It appears that you are not at the right location .. "
				});
			},
			show_end_game_popup:function() {
				this.show_ok_only_popup({
					title:"Quest is over",
					message:"Congratulations! You have reached the end of your quest :)",
					ok_callback:function() {
						window.history.go(-2);
					}
				});
			},
			show_open_question_dialog: function() {
				var dialog = new OpenQuestionDialogView({model:this.model});
				this.$el.append(dialog.render());
				dialog.open_dialog();
			},
			show_wrong_open_answer: function() {
				alert("Wrong ... Please try again"); //#il18 #redesign
			},
			next_page_question: function() {
				var dialog = new MultipleOptionView({model:this.model});
				this.$el.append(dialog.render());
				dialog.open_dialog();
			},
			show_menu: function() {
				var menu = new GameMenuView();
				var html = menu.render();
				this.$el.append(html);
				menu.open_tooltip();
			},
			handle_game_end: function() {
				this.show_end_game_popup();
			},
			remove: function() {
				 $('#page_container').iscrollview("destroy");
				JQPageView.prototype.remove.apply(this,[]);
			}
			
			
		});
		
		return GamePageView;
	
});