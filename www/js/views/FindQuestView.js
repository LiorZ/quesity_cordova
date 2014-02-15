define(['Backbone','views/QuestListView','text!templates/find_quest_page.html','views/JQPageView'],
function(Backbone,QuestListView,page_html,JQPageView) {
	var view = JQPageView.extend({
		list_view:undefined,
		initialize:function(options) {
			JQPageView.prototype.initialize.apply(this,[options]);
			this.icon = options.icon;
			this.title = options.title;
		},
		render: function() {
			var processed_html = _.template(page_html,{
				title: this.title,
				icon: this.icon
			});
			this.$el.append(processed_html);
			var list_view = new QuestListView({model:this.model});
			this.list_view = list_view;
			var list_obj = list_view.render();
			var content = $("<div data-role='content' id='find-quest-page-content' class='fast-listview-scroll' style='max-height: 100000px !important; padding:0px !important;' data-iscroll></div>");
			list_obj.appendTo(content);
			content.appendTo(this.$el);
//			if ( ! $('body').hasClass('body-background') ){
//				$('body').addClass('body-background');
//			}
			return this.$el;
		},
		refresh: function() {
			var context = this;
			 $("#find-quest-page-content").iscrollview("refresh",100,function(){
				 context.list_view.refresh();
			 });
			 
		},
		page_remove: function() {
			$("#find-quest-page-content").iscrollview("destroy");
			JQPageView.prototype.page_remove.apply(this,[]);
		}
		
	});

	return view;
});
