define(['chai','models/Game','models/Quest','models/globals'],function(chai,Game,Quest,consts) {

  var assert = chai.assert;
  var expect = chai.expect;
 
  var globals = {
  };
  
  describe('Testing Game model', function() {
	  before(function(done) {
		globals.game = new Game({remaining_hints:2});
		globals.quest = new Quest();
		globals.quest.url = "/js/tests/jsons/mock_quest.json";
		globals.quest.fetch({
			
			error: function() {
				done("ERROR");
			},
			success:function() {
				assert.ok(globals.quest.get('title'));
				globals.game.set('quest',globals.quest);
				done();
			}
		}		
		);
		
	  });
	  
	  before(function(done) {
		  globals.pages = globals.quest.get('pages');
		  globals.pages.url = '/js/tests/jsons/mock_quest_pages.json';
		  globals.pages.fetch({
			  success:function() {
				  assert.equal(globals.pages.size(),6);
				  done();
			  },
			  error:function(){ 
				  done("ERROR fetching");
			  },
			  silent:true
		  });
	  });
	  describe("Checking page transitions" , function() {
	      it("Creation of Game", function(done) {
	    	 var first_page = globals.game.get_first_page();
	    	 assert.ok(first_page);
	    	 assert.equal(first_page.get('page_number'),1);
	    	 done();
	      });
	      
	      it("Checking first page - static page", function(done) {
	    	  var page = globals.game.get_next_page();
	    	  assert.ok(page);
	    	  assert.equal(page.get('page_number'),2);
	    	  done();
	      });
	  
	      it("Checking second page - question page, wrong answer", function(done) {
	    	  var page = globals.game.get_next_page(4);
	    	  assert.isUndefined(page);
	    	  done();
	      });
	      
	      it("Checking second page - question page, right answer" , function(done) {
	    	 var page = globals.game.get_next_page("1");
	    	 assert.ok(page);
	    	 assert.equal(page.get('page_number'),4);
	    	 done();
	      });
	      
	      it("Checking 4th page - location page , wrong location" , function(done) {
	    	 var page = globals.game.get_next_page({lat:4, lng:4});
	    	 assert.isUndefined(page);
	    	 done();
	      });
	      
	      it("Checking 4th page - location page, right location" , function( done ) {
	    	 var page = globals.game.get_next_page({lat:32.078801,lng:34.773579});
	    	 assert.ok(page);
	    	 assert.equal(page.get('page_number'),5);
	    	 done();
	      });
	      
	      it("Checking 5th page - open question page, wrong answer" , function(done) {
	    	  var page = globals.game.get_next_page("sdfsdfsd");
	    	  assert.isUndefined(page);
	    	  done();
	      });
	
	      it("Checking 5th page - open question page, right answer" , function(done) {
	    	  var page = globals.game.get_next_page("abc");
	    	  assert.ok(page);
	    	  assert.equal(page.get('page_number'),6);
	    	  done();
	      });
	      
	      it("Checking 6th and last page - static page", function(done) {
	    	 var page = globals.game.get_next_page("DDD");
	    	 assert.ok(page);
	    	 assert.equal(page,"END");
	    	 done();
	      });

	  });
	  
	  describe("Checking hints logic" , function(done) {
		 
		  before(function(done) {
			  var page = globals.game.get_first_page();
			  assert.ok(page);
			  assert.equal(page.get('page_number'),1);
			  done();
		  });
		  
		  it("Checking hints in second page", function(done) {
			  var page = globals.game.get_next_page();
			  assert.ok(page);
			  assert.equal(page.get('page_number'),2);
			  
			  var hints = globals.game.hints_in_page();
			  assert.ok(hints);
			  assert.equal(hints.size(),2);
			  
			  globals.game.use_hint(hints.at(0));
			  assert.equal(globals.game.get('remaining_hints'),1);
			  var available_hints = hints.where({is_used:false});
			  
			  assert.equal(available_hints.length, 1);
			  done();
		  });
		  
	  });
  });
  
});