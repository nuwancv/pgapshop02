var app = {


	showAlert: function(message,title) {
    	if (navigator.notification) {
    		navigator.notification.alert(message,null,title,'OK');
    	} else {
    		alert(title ? (title + ": " + message) : message);
    	}
    },
    
    
    registerEvents: function(){
    	var self = this;
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
        
    initialize: function() {
    	var self = this;
        this.store = new MemoryStore(function() {
        	//self.showAlert('Store initi done!', 'Info');
        	// Now we can use HomeView class with step-5 defining views.      self.renderHomeView();
        	$('body').html(new HomeView(self.store).render().el);
        });
        
        /* Moved to HomeView.js
         * 
         
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
        
        this.homeTpl = Handlebars.compile($("#home-tpl").html());
        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        */
       
       this.registerEvents();
    }
    
    
    /*
     *  This is to implement the tapable behaviour - after iScroll
     */


};

app.initialize();