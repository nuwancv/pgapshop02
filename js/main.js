var app = {

	// App methods here...
	//
	
	showAlert: function(message,title) {
    	if (navigator.notification) {
    		navigator.notification.alert(message,null,title,'OK');
    	} else {
    		alert(title ? (title + ": " + message) : message);
    	}
    },
    
    
    registerEvents: function(){
    	var self = this;
    	
    	// Routing
    	$(window).on('hashchange', $.proxy(this.route, this)); // 2- add an event listener to listen to URL hash tag changes:
    	
    	
    	// Check of browser supports touch events..
    	if (document.documentElement.hasOwnProperty('ontouchstart')){
    		
    		// if yes: register touch event listener to change the "selected" state of the item
    		$('body').on('touchstart', 'a', function(event){
    			$(event.target).addClass('tappable-active');
    		});
    		
    		$('body').on('touchend', 'a', function(event){
    			$(event.target).removeClass('tappable-active');
    		});
    		
    	} else {
    		
    		// if not: register mouse events instead
    		$('body').on('mousedown', 'a', function(event){
    			$(event.target).addClass('tappable-active');
    		});
    		
    		$('body').on('mouseup', 'a', function(event){
    			$(event.target).removeClass('tappable-active');
    		});
    		
    	}    	
    },
        
    
    route: function(){
    	var hash = window.location.hash;
    	console.log("Hash : " + hash);
    	if(!hash){  // If there is no hash tag in the URL: display the HomeView
    		$('body').html(new HomeView(this.store).render().el);
    		return;
    	}
    	
    	var match = hash.match(app.detailsURL);
    	if(match){   // If there is a hash tag matching the pattern for an employee details URL: 
    				// display an EmployeeView for the specified employee.
    		console.log("Hash match number: " + Number(match[1]));
    		this.store.findById(Number(match[1]), function(employee){
    			$('body').html(new EmployeeView(employee).render().el);
    		});
    	}
    },
    
    
    initialize: function() {
    	var self = this;
    	console.log ("init default URL: " + this.defaultURL);
    	this.detailsURL = /^#employees\/(\d{1,})/; 		// 1 - define a regular expression that matches employee details urls.
    	this.registerEvents();
       
        /*
        this.store = new MemoryStore(function() {
        	//self.showAlert('Store initi done!', 'Info');
        	// Now we can use HomeView class with step-5 defining views.      self.renderHomeView();
    
			We now use view routing, so we do not need this here.    
        	$('body').html(new HomeView(self.store).render().el);
        });
        */
       
        /* Moved to HomeView.js
         * 
         
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
        
        this.homeTpl = Handlebars.compile($("#home-tpl").html());
        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        */
       
       // Now with the views being routed to item view or Details view, we call the route()
       this.store = new MemoryStore (function (){
        		self.route();
       });  
       
       
       // Try phonegap database functions.
       console.log("Try DB functions");
       dbAccess.dbInit();     
    }
    
    
    /*
     *  This is to implement the tapable behaviour - after iScroll
     */


};

app.initialize();