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
		this.el.on('click', '.add-contact-btn', this.addToContacts);
		this.el.on('click', '.change-pic-btn', this.changePicture);
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
	
	
	this.addToContacts = function(){
		event.preventDefault();
		console.log('addToContacts');
		if(!navigator.contacts){
			app.showAlert("Contacts API not supported", "Error");
			return;
		}	
		
		var contact = navigator.contacts.create();
		contact.name = {giveName: employee.firstName, familyName: employee.lastName};
		var phoneNumbers = [];
		phoneNumber[0] = new ContactField('work', employee.officePhone, false);
		phoneNumber[1] = new ContactField('mobile', employee.cellPhone, true); // Preferred Number
		contact.phoneNumbers = phoneNnumbers;
		contact.save();
		return false;
	};
	
	
	this.changePicture = function(event) {
		event.preventDefault();
		if (!navigator.camera){
			app.showAlert("Camera API not supported", "Error");
			return;
		}
		
		var options = { quality: 50,
						destinationType: Camera.DestinationType.DATA_URL,
						sourceType: 1, //0: Photo Library, 1=Camera, 2=Saved Photo Album
						encordingType: 0
					  };
		
		navigator.camera.getPicture(
			function(imageData){
				$('.employee-image', this.el).attr('src', "data:image/jpeg:based64," + imageData);
			},
			
			function(){
				app.showAlert('Error taking picture', 'Error');
			},
			options);
			
			return false;		
	};
	
	this.render = function(){
		this.el.html(EmployeeView.template(employee));
		return this;
	};

	this.initialize();
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());

