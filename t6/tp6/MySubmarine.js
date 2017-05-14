/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene, xmin, xmax, zmin, zmax) 
{
	CGFobject.call(this,scene);

	this.cylinder = new MyCylinder(this.scene, 40, 20);
	this.top = new MyLamp(this.scene, 40, 20);
	this.lid = new MyPolygon(this.scene, 40);
	this.helix = new MyHelix(this.scene);
	this.prism = new MyPrism(this.scene, 1, 1);
	this.cube = new MyUnitCubeQuad(this.scene);
	this.periscope = new MyPeriscope(this.scene);

	
	this.xmin = xmin;
	this.xmax = xmax;
	this.zmin = zmin;
	this.zmax = zmax;

	this.x = 0.0;
	this.y = 3.0;
	this.z = 0.0;
	this.rotation = 0.0;
	this.speed = 0.1;
	
	this.previousTime = Date.now();

	this.isTurningLeft = false;
	this.isTurningRight = false;
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;

MySubmarine.prototype.display = function()
{
	this.scene.pushMatrix();	//front h fin edge #2
		this.scene.translate(-0.61, 0.8, 2.4);
		this.scene.rotate(3*Math.PI / 2, 0, 0, 1);
		this.scene.scale(0.075, 0.35, 0.25);
		this.scene.rotate(-Math.PI, 1, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(-1, 0, -0.5);
		this.prism.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//front h fin edge #1
		this.scene.rotate(Math.PI / 2, 0, 0, 1);
		this.scene.translate(0.8, -0.61, 2.4);
		this.scene.scale(0.075, 0.35, 0.25);
		this.scene.rotate(-Math.PI, 1, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(-1, 0, -0.5);
		this.prism.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//front horizontal fin
		this.scene.translate(0, 0.8, 2.4);
		this.scene.rotate(Math.PI / 2, 0, 0, 1);
		this.scene.scale(0.075, 1.22, 0.25);
		this.scene.translate(0, 0, -0.5);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//back h fin edge #2
		this.scene.rotate(3 * Math.PI / 2, 0, 0, 1);
		this.scene.translate(0, -0.82, 0);
		this.scene.scale(0.075, 0.35, 0.25);
		this.scene.rotate(-Math.PI, 1, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(-1, 0, -0.5);
		this.prism.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//back h fin edge #1
		this.scene.rotate(Math.PI / 2, 0, 0, 1);
		this.scene.translate(0, -0.82, 0);
		this.scene.scale(0.075, 0.35, 0.25);
		this.scene.rotate(-Math.PI, 1, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(-1, 0, -0.5);
		this.prism.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//back horizontal fin
		this.scene.rotate(Math.PI / 2, 0, 0, 1);
		this.scene.scale(0.075, 1.64, 0.25);
		this.scene.translate(0, 0, -0.5);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//back v fin edge #2
		this.scene.translate(0, 0.82, 0);
		if (this.isTurningRight)
			this.scene.rotate(-Math.PI / 6, 0, 1, 0);
		if (this.isTurningLeft)
			this.scene.rotate(Math.PI / 6, 0, 1, 0);
		this.scene.scale(0.075, 0.35, 0.25);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(-1, 0, -0.5);
		this.prism.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//back v fin edge #1
		this.scene.translate(0, -0.82, 0);
		if (this.isTurningRight)
			this.scene.rotate(-Math.PI / 6, 0, 1, 0);
		if (this.isTurningLeft)
			this.scene.rotate(Math.PI / 6, 0, 1, 0);
		this.scene.scale(0.075, 0.35, 0.25);
		this.scene.rotate(-Math.PI, 1, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(-1, 0, -0.5);
		this.prism.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//back vertical fin
		if (this.isTurningRight)
			this.scene.rotate(-Math.PI / 6, 0, 1, 0);
		if (this.isTurningLeft)
			this.scene.rotate(Math.PI / 6, 0, 1, 0);
		this.scene.translate(0, 0, 0);
		this.scene.scale(0.075, 1.64, 0.25);
		this.scene.translate(0, 0, -0.5);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//left helix, back
		this.scene.translate(-0.53, -0.25, 0.1);
		this.helix.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//right helix, back
		this.scene.translate(0.53, -0.25, 0.1);
		this.helix.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//right helix, front
		this.scene.translate(0.53, -0.25, 0.1);
		this.scene.rotate(this.helixR, 0, 0, 1);
		this.scene.scale(0.05, 0.35, 1);
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
};

MySubmarine.prototype.move = function(mov, ds)
{
	if (mov == 'FORWARD')
	{
		this.speed  += 0.1;
		this.isTurningLeft = false;
		this.isTurningRight = false;
	}
	else if (mov == 'BACKWARD')
	{
		this.speed -= 0.1;
		this.isTurningLeft = false;
		this.isTurningRight = false;
	}
	else if (mov == 'R_LEFT')
	{
		this.rotation += ds / 100;
		this.isTurningLeft = true;
		this.isTurningRight = false;
	}
	else if (mov == 'R_RIGHT')
	{
		this.rotation -= ds / 100;
		this.isTurningRight = true;
		this.isTurningLeft = false;
	}

	if (this.x < this.xmin)
		this.x = this.xmin;
	if (this.x > this.xmax)
		this.x = this.xmax;
	if (this.z < this.zmin)
		this.z = this.zmin;
	if (this.z > this.zmax)
		this.z = this.zmax;
};

MySubmarine.prototype.applyAppearance = function ()
{
	
	this.scene.submarineAppearance[this.scene.currSubmarineAppearance].apply();
	
//	this.appearance1.apply();
};


MySubmarine.prototype.update = function(t)
{
	if(this.speed >0) {
        this.x += Math.sin(this.speed + this.rotation)/100;
        this.z += Math.cos(this.speed + this.rotation)/100;
    }
    else
	{
        this.x -= Math.sin(-1 * this.speed + this.rotation)/100;
        this.z -= Math.cos(-1 * this.speed + this.rotation)/100;
	}
	var deltaT = t - this.previousTime;
	this.previousTime = t;
	this.helix.update(t);
    this.periscope.update(t);
};

	
