var HomeView = function(store){
	
	this.initialize = function(){
		// This div wrapper is to attach events
		var that = this; // This hack is to make it work on Jquery - Valadmir
		this.el = $('<div />');
		//this.el.on('keyup','.search-key', this.findByName);
		this.el.on('keyup', '.search-key', function(){that.findByName();});
	};
	
	this.render = function() {
	    /*var html =
	            "<div class='header'><h1>Home</h1></div>" +
	            "<div class='search-view'>" +
	            "<input class='search-key'/>" +
	            "<ul class='employee-list'></ul>" +
	            "</div>";
	    $('body').html(html);
	    
	    /* 
	    * Now  we can use the defined template insdead of this.
	    * 
	    * Move this function from main.js to here - as we are now 
	    * creating a seperate view object with its own methods
	    * for viewing all this stuff
	    * 
	    * 
	   
	   $('body').html(this.homeTpl());
	   $('.search-key').on('keyup', $.proxy(this.findByName, this));
	   
	   */
	  
	  this.el.html(HomeView.template());
	  return this;
	  
	};



	this.findByName = function() {
		/* With template code changes..
		 * 
		 
	    console.log('findByName');
	    this.store.findByName($('.search-key').val(), function(employees) {
	        var l = employees.length;
	        var e;
	        $('.employee-list').empty();
	        for (var i=0; i<l; i++) {
	            e = employees[i];
	            $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
	        }
	    });
	    
	    *
	    * Moved from main.js to here with intro of views. 
	    */
	   
	      
	   //var self = this; this is a store object now.
	   /* We implement this wih iscroll now.
	    * 
	    store.findByName($('.search-key').val(),function(employees){
	   		$('.employee-list').html(HomeView.liTemplate(employees));
	   });
	   */
	   
	   store.findByName($('.search-key').val(),function(employees){
	        $('.employee-list').html(HomeView.liTemplate(employees));
	        if (self.iscroll) {
	        	console.log('Refresh iScroll');
	        	self.iscroll.refresh();
	        } else {
	        	console.log('New iscroll');
	        	self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar:false, vScrollbar: false});
	        }	        
	   });
	};
	        
	this.initialize();
}


HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());

