/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a group of controls (and open/expand by defult)
	
	this.gui.add(this.scene, 'submarineAppearanceGUI', this.scene.submarineAppearancesList);
	
	var group=this.gui.addFolder("Lights");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'Light_0');
	group.add(this.scene, 'Light_1');
	group.add(this.scene, 'Light_2');
	group.add(this.scene, 'Light_3');

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'Stop_Clock');	
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'Velocity', 0.1, 2.0);

//	this.gui.add(this.scene, 'Animated_Clock');

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (87): case (119):	//W w
			this.scene.submarine.move('FORWARD', this.scene.Velocity);
			break;
		case (65):	case (97):	//A a
			this.scene.submarine.move('R_LEFT', this.scene.Velocity);
			break;
		case (83): case (115):	//S s
			this.scene.submarine.move('BACKWARD', this.scene.Velocity);
			break;
		case (68): case (100):	//D d
			this.scene.submarine.move('R_RIGHT', this.scene.Velocity);
			break;


		default: break;
	};
};


MyInterface.prototype.processKeyDown = function(event) {

    switch (event.keyCode) {
        case (80): case (112):	//P p
        this.scene.submarine.periscope.lower();
        break;
        case (76): case (108):	//L l
        this.scene.submarine.periscope.lift();
        break;
		case (65):	case (97):	//A a
		this.scene.submarine.isTurningLeft = true;
		break;
		case (68): case (100):	//D d
		this.scene.submarine.isTurningRight = true;
		break;
    }

};

MyInterface.prototype.processKeyUp = function (event) {

    switch (event.keyCode) {
        case (80): case (112):	//P p
        this.scene.submarine.periscope.stopLower();
        break;
        case (76): case (108):	//L l
        this.scene.submarine.periscope.stopLift();
        break;
        case (65):	case (97):	//A a
		this.scene.submarine.isTurningLeft = false;
		break;
		case (68): case (100):	//D d
		this.scene.submarine.isTurningRight = false;
		break;
    }
};


