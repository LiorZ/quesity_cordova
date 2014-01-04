define(['chai','models/QuestPage','models/QuestPageLocation','models/QuestPageQuestion','models/Quest','models/QuestPageCollection',
        'models/QuestPageOpenQuestion'],
		function(chai,QuestPage,QuestPageLocation,QuestPageQuestion,Quest,QuestPageCollection,QuestPageOpenQuestion) {

  var assert = chai.assert;
  var expect = chai.expect;
 
  var globals = {
  };
  
  
  describe('Testing QuestPage model', function() {
	  before(function(done) {
		  var Collection = Backbone.Collection.extend({model:QuestPage});
		  globals.collection = new Collection();
		  done();
	  });
	  
	  it("Testing QuestPage types- multiple choice question" , function(done) {
		  globals.collection.add({
			  page_type:'question',
			  page_number: 1,
			  page_title: "QuestPage - question"
		  });
		  var page = globals.collection.at(0);
		  assert.isTrue(page instanceof QuestPageQuestion);
		  done();
	  });
	  
	  it("Testing QuestPage types - location page", function(done) {
		  
		  globals.collection.add({
			  page_type:'location',
			  page_number: 2,
			  page_title: "QuestPage - location"
		  });
		  var page = globals.collection.at(1);
		  assert.isTrue(page instanceof QuestPageLocation);
		  done();
		  
	  });
	  
	  it("Testing QuestPage types- open question", function(done) {
		  globals.collection.add({
			  page_type:'open_question',
			  page_number: 3,
			  page_title: "QuestPage - open question"
		  });
		  var page = globals.collection.at(2);
		  assert.isTrue(page instanceof QuestPageOpenQuestion);
		  done();
	  });
});
	  
  });