/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() 
{
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) 
{
	CGFinterface.prototype.init.call(this, application);
	
	this.gui = new dat.GUI();
	
	var group=this.gui.addFolder("Lights");
	group.open();
	group.add(this.scene, 'Light_0');
	group.add(this.scene, 'Light_1');
	group.add(this.scene, 'Light_2');
	group.add(this.scene, 'Light_3');

	this.gui.add(this.scene, 'Stop_Clock');	

	this.gui.add(this.scene, 'Speed', -0.5, 0.5);

	this.gui.add(this.scene, 'submarineAppearanceGUI', this.scene.submarineAppearancesList);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	
	CGFinterface.prototype.processKeyboard.call(this,event);

	switch (event.keyCode)
	{
		case (87): case (119):	//W w
			this.scene.submarine.move('FORWARD');
			break;

		case (83): case (115):	//S s
			this.scene.submarine.move('BACKWARD');
			break;

		default: break;
	};
};


MyInterface.prototype.processKeyDown = function(event) 
{
    switch (event.keyCode) {
        case (80): case (112):	//P p
			this.scene.submarine.periscope.lower();
			break;
        case (76): case (108):	//L l
			this.scene.submarine.periscope.lift();
			break;
		case (65):	case (97):	//A a
			this.scene.submarine.turningLeft = true;
			this.scene.submarine.backFin.isTurningLeft = true;
			break;
		case (68): case (100):	//D d
			this.scene.submarine.turningRight = true;
			this.scene.submarine.backFin.isTurningRight = true;
			break;
		case (81): case (113):	//Q q
			this.scene.submarine.goingUp = true;
			this.scene.submarine.horizontalFin.isGoingUp = true;
			break;
		case (69): case (101):	//E e
			this.scene.submarine.goingDown = true;
			this.scene.submarine.horizontalFin.isGoingDown = true;
			break;
		case (70): case (102): 	//F f
			for (i = 0; i < this.scene.targets.length; i++)
			{
				if (this.scene.targets[i] != null)
				{
					this.scene.torpedo.startAnimation = true;
					break;
				}
			}
			break;
    }
};

MyInterface.prototype.processKeyUp = function (event) 
{
    switch (event.keyCode) {
        case (80): case (112):	//P p
        this.scene.submarine.periscope.stopLower();
        break;
        case (76): case (108):	//L l
        this.scene.submarine.periscope.stopLift();
        break;
        case (65):	case (97):	//A a
        this.scene.submarine.turningLeft = false;
		this.scene.submarine.backFin.isTurningLeft = false;
		break;
		case (68): case (100):	//D d
		this.scene.submarine.turningRight = false;
		this.scene.submarine.backFin.isTurningRight = false;
		break;
		case (81): case (113):	//Q q
		this.scene.submarine.goingUp = false;
		this.scene.submarine.horizontalFin.isGoingUp = false;
		break;
		case (69): case (101):	//E e
		this.scene.submarine.goingDown = false;
		this.scene.submarine.horizontalFin.isGoingDown = false;
		break;
    }
};