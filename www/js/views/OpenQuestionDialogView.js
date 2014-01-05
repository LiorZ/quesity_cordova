define(['Backbone','text!templates/open_question_view.html'],
function(Backbone,page_html) {
	var view =  Backbone.View.extend({
		
		events:{
			'click #open_question_ok_btn':'trigger_answer_event',
			'click #open_question_close_btn':'close_popup'
		},
		render: function() {
			var page_obj = $(page_html);
			$('body').append(page_obj);
			this.$el = page_obj;
			this.delegateEvents();
			this.$el.popup();
			this.$el.trigger('create');
			this.$el.popup('open');
		},
		
		trigger_answer_event: function() {
			this.$el.popup('close');
			var answer = this.$el.find('#txt_answer').val();
			this.model.get_next_page(answer);
		},
		close_popup: function() {
			this.$el.popup('close');
		}

	});

	return view;
});
