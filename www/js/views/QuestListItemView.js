define(['Backbone','text!templates/quest_list_item_view.html','models/globals'], 
function(Backbone,item_template,globals) {
	
	var item = Backbone.View.extend({
		tagName:'li',
		timeout:undefined,
		events: {
			'touchstart':'apply_active_style',
			'touchend':'remove_active_style',
			'scrollstart':'scrolling_started',
			'click #btn_bookmark':'bookmark'
		},
		render: function() {
			var object = this.model.toJSON();
			this.check_bookmark(object);
			var html = _.template(item_template,object);

			this.$el.html(html);

			return this.$el;
		},
		check_bookmark:function(object) {
			var match = globals.my_quests.findWhere({_id:object._id});
			if (match) {
				object = _.extend(object,{bookmarked: true});
			}else {
				object = _.extend(object,{bookmarked: false});
			}
		},
		
		bookmark:function(e) {
			e.preventDefault();
			if ( ! globals.my_quests.findWhere({_id: this.model.get('_id')})) {
				globals.my_quests.add(this.model);	
				this.$el.find('.ui-icon-quesity-book-empty').removeClass('ui-icon-quesity-book-empty').addClass('ui-icon-quesity-book-full');	
			} else {
				globals.my_quests.remove(this.model);
				this.$el.find('.ui-icon-quesity-book-full').removeClass('ui-icon-quesity-book-full').addClass('ui-icon-quesity-book-empty');	
			}
		},
		apply_active_style:function(e) {
			if (!e) {
				return;
			}
			var target = $(e.target);
			if ( ! target )
				return;
			
			if ( target.hasClass('ui-icon-quesity-book-full') || target.hasClass('ui-icon-quesity-book-empty') ){
				return;
			}
			var context = this;
			this.timeout = setTimeout(function( ){ context.$el.addClass('list-item-active'); },20);
		},
		remove_active_style:function(e) {
			clearTimeout(this.timeout);
			if (!e)
				return;
			
			var target = $(e.target);
			if ( !target )
				return;
			if ( target.hasClass('ui-icon-quesity-book-full') || target.hasClass('ui-icon-quesity-book-empty') ){
				return;
			}
			this.$el.removeClass('list-item-active');
		},
		scrolling_started: function() {
			this.remove_active_style();
		}
	
	});

	return item;

});
