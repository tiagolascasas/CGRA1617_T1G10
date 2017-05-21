/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene, xmin, xmax, ymin, ymax, zmin, zmax) 
{
	CGFobject.call(this,scene);

	this.cylinder = new MyCylinder(this.scene, 40, 20);
	this.top = new MyLamp(this.scene, 40, 20);
	this.lid = new MyPolygon(this.scene, 40);
	this.helix = new MyHelix(this.scene);
	this.prism = new MyPrism(this.scene, 1, 1);
	this.cube = new MyUnitCubeQuad(this.scene);
	this.periscope = new MyPeriscope(this.scene);
	this.backFin = new BackFin(this.scene);
	this.horizontalFin = new HorizontalFin(this.scene);

	this.xmin = xmin;
	this.xmax = xmax;
	this.ymin = ymin;
	this.ymax = ymax;
	this.zmin = zmin;
	this.zmax = zmax;

	this.x = 0.0;
	this.y = 3.0;
	this.z = 0.0;
	this.rotation = 0.0;
	this.verticalRotation = 0.0;
	this.previousTime = Date.now();

	this.px = 0.0;
	this.py = 3.0;
	this.pz = 6.0;

	this.goingUp= false;
	this.goingDown = false;
	this.turningLeft = false;
	this.turningRight = false;
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;

MySubmarine.prototype.display = function()
{
	this.scene.pushMatrix();

	this.scene.translate(this.x, this.y, this.z);
	this.scene.rotate(this.verticalRotation, 1, 0, 0);
	this.scene.rotate(this.rotation, 0, 1, 0);
	this.scene.translate(0, 0, -2.04);

	this.scene.pushMatrix();	//front h fin
		this.scene.translate(0, 0.8, 2.1);
		this.scene.rotate(Math.PI, 1, 0, 0);
		this.scene.scale(0.7, 1, 1);
		this.horizontalFin.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//back h fin
		this.horizontalFin.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//back v fin
		this.backFin.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//left helix, back
		this.scene.translate(-0.53, -0.25, 0.1);
		this.helix.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//right helix, back
		this.scene.translate(0.53, -0.25, 0.1);
		this.helix.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//left helix, cover
		this.scene.translate(0.53, -0.25, 0.1);
		this.scene.scale(0.025, 0.025, 0.1);
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//left turbine
		this.scene.translate(-0.53, -0.25, 0);
		this.scene.scale(0.2, 0.2, 0.2);
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//right turbine
		this.scene.translate(0.53, -0.25, 0);
		this.scene.scale(0.2, 0.2, 0.2);
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//horizontal pipe back lid
		this.scene.translate(0, 1.52, 2.52);
		this.scene.scale(0.05, 0.05, 0.25);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.lid.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//top cylinder lid
		this.scene.translate(0, 1.07, 2.3);
		this.scene.scale(0.3, 1, 0.44);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.lid.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//top cylinder
		this.scene.translate(0, 1.07, 2.3);
		this.scene.scale(0.3, 1, 0.44);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//back lid
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.scale(0.365, 0.5, 0.92 / 2);
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//front lid
		this.scene.translate(0, 0, 4.08);
		this.scene.scale(0.365, 0.5, 0.92 / 2);
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//base cylinder
		this.scene.scale(0.365, 0.5, 4.08);
		this.cylinder.display();
	this.scene.popMatrix();

	this.periscope.display();

	this.scene.popMatrix();
};

MySubmarine.prototype.move = function(mov)
{
	if (mov == 'FORWARD')
	{
		if (this.scene.Speed < 2)
			this.scene.Speed  += 0.1;
	}
	else if (mov == 'BACKWARD')
	{
		if (this.scene.Speed > -2)
			this.scene.Speed -= 0.1;
	}
};

MySubmarine.prototype.applyAppearance = function ()
{
	this.scene.submarineAppearance[this.scene.currSubmarineAppearance].apply();
};


MySubmarine.prototype.update = function(t)
{
	var deltaT = t - this.previousTime;
	this.previousTime = t;
	this.helix.update(t);
	this.periscope.update(t);
	this.backFin.update();
	this.horizontalFin.update();

	if (this.goingUp) {
		if(this.verticalRotation > -(Math.PI /12))
		 this.verticalRotation -= Math.PI / 360;
		 this.y += 0.02;
		 this.py += 0.02;
	}
	else if (this.goingDown) {
		if(this.verticalRotation < (Math.PI /12))
		 this.verticalRotation += Math.PI / 360;
		 this.y -= 0.02;
		 this.py -= 0.02;
	}
	else{
		 if(this.verticalRotation != 0)
		 this.verticalRotation += -1 * this.verticalRotation/20;
	}

	if(this.turningLeft){
		this.rotation += Math.PI/200;
	}
	else if(this.turningRight) {
		this.rotation -= Math.PI/200;
	}

	this.x += (Math.sin(this.rotation)/100)*this.scene.Speed;
	this.z += (Math.cos(this.rotation)/100)*this.scene.Speed;

	this.px += (Math.sin(this.rotation)/100)*this.scene.Speed;
	this.pz += (Math.cos(this.rotation)/100)*this.scene.Speed;

	this.checkBounds();
};

MySubmarine.prototype.checkBounds = function()
{
	if (this.x <= this.xmin)
		this.x = this.xmin;
	if (this.x >= this.xmax)
		this.x = this.xmax;

	if (this.y <= this.ymin)
		this.y = this.ymin;
	if (this.y >= this.ymax)
		this.y = this.ymax;

	if (this.z <= this.zmin)
		this.z = this.zmin;
	if (this.z >= this.zmax)
		this.z = this.zmax;	
};
