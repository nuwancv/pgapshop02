var app = {

    findByName: function() {
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
        */
       
       
       var self = this;
       this.store.findByName($('.search-key').val(),function(employees){
       		$('.employee-list').html(self.employeeLiTpl(employees));
       });
    },

	showAlert: function(message,title) {
    	if (navigator.notification) {
    		navigator.notification.alert(message,null,title,'OK');
    	} else {
    		alert(title ? (title + ": " + message) : message);
    	}
    },
    
    
    renderHomeView: function() {
	    /*var html =
	            "<div class='header'><h1>Home</h1></div>" +
	            "<div class='search-view'>" +
	            "<input class='search-key'/>" +
	            "<ul class='employee-list'></ul>" +
	            "</div>";
	    $('body').html(html);
	    
	    /* 
	    * Now  we can use the defined template insdead of this.
	    * */
	   
	   $('body').html(this.homeTpl());
	   $('.search-key').on('keyup', $.proxy(this.findByName, this));
	},

    initialize: function() {
    	var self = this;
        this.store = new MemoryStore(function() {
        	//self.showAlert('Store initi done!', 'Info');
        	self.renderHomeView();
        });
        
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
        
        this.homeTpl = Handlebars.compile($("#home-tpl").html());
        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        
    }
    
    

};

app.initialize();