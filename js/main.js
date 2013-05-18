var app = {


	showAlert: function(message,title) {
    	if (navigator.notification) {
    		navigator.notification.alert(message,null,title,'OK');
    	} else {
    		alert(title ? (title + ": " + message) : message);
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
       
       
    }
    
    

};

app.initialize();