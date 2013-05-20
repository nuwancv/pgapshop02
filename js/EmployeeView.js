var EmployeeView = function(employee){
	/*
	 * Define an initialize() function inside the HomeView class. 
	 * Define a div wrapper for the view. The div wrapper is used 
	 * to attach the view related events. Invoke the initialize() function 
	 * inside the HomeView constructor function.
	 *
	 */  
	this.initialize = function(){
		this.el = $('<div/>');
	};
	
	this.render = function(){
		this.el.html(EmployeeView.template(employee));
		return this;
	};

	this.initialize();
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());

