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
		
		this.el.on('click', '.add-location-btn', this.addLocation);
	};
	
	this.addLocation=function(event){
		event.preventDefault();
		console.log('addLocation');
		navigator.geolocation.getCurrentPosition(
			function (position){
				$('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
			},
			function() {
				alert('Error getting this location');
			}
		);
	};
	
	this.render = function(){
		this.el.html(EmployeeView.template(employee));
		return this;
	};

	this.initialize();
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());

