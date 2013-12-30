define(['Backbone'], function(Backbone) {
	console.log("Defining MainView");
	var MainView = Backbone.View.extend({
		initialize: function() {
			this.$el = $('#main-container');
		},
		currentChild: undefined,

		change_child_view: function(new_child) {
			if ( this.currentChild !== undefined ) {
				this.currentChild.remove();

			}
			this.currentChild = new_child;
			this.render();
		},
		render: function() { 
			if ( this.currentChild === undefined ) {
				return;
			}
			var j_obj = this.currentChild.render();
			$('body').append(j_obj);
			this.$el.html( this.currentChild.render() );
			this.$el.trigger("create");
		}

	});	

	return MainView;
});
