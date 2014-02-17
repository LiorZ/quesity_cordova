define(['Backbone','BackboneRelational','models/Quest'],function(Backbone,BackboneRelational,Quest) {
	var QuestCollection = Backbone.Collection.extend({
		url:'/account/quests',
		model:Quest,
		comparator:function(q) {
			return - q.get('rating'); //sorting in a descending order
		}
	});
	
	return QuestCollection;
});