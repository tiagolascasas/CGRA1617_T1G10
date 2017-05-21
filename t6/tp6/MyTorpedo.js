/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene) 
{
	CGFobject.call(this,scene);

	this.cylinder = new MyCylinder(this.scene, 40, 20);
	this.top = new MyLamp(this.scene, 40, 20);
	this.backFin = new BackFin(this.scene);
	this.route = new  MyRoute(this.scene);
	
	this.appearance = new CGFappearance(this.scene);
	this.appearance.setAmbient(0.4, 0.4, 0.4, 1);
	this.appearance.setDiffuse(0.2, 0.2, 0.2, 1);
	this.appearance.setSpecular(0.6, 0.6, 0.6, 1);
	this.appearance.setShininess(120);

	this.fire = new CGFappearance(this.scene)
    this.fire.loadTexture("../resources/images/fire.png");
    this.fire.setTextureWrap('REPEAT', 'REPEAT');

   	this.metal = new CGFappearance(this.scene)
    this.metal.loadTexture("../resources/images/metalScratched.png");
    this.metal.setTextureWrap('REPEAT', 'REPEAT');

	this.counter = 0;
	this.x = 0.0;
	this.y = 0.0;
	this.z = 0.0;
	this.alphaAngle =  Math.PI;
	this.deltaAngle = 0;
	this.startAnimation = false;
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor=MyTorpedo;

MyTorpedo.prototype.display = function()
{
	if (!this.startAnimation)
		return;

	this.scene.pushMatrix();

	this.scene.translate(this.x, this.y, this.z);
	this.scene.rotate(this.alphaAngle, 1,0, 0);
	this.scene.rotate(this.deltaAngle, 0, 1, 0);

	this.appearance.apply();

	this.scene.pushMatrix();
		this.metal.apply();
		this.scene.translate(0, 0, -0.3);
		this.scene.rotate(Math.PI / 2, 0, 0, 1);
		this.scene.scale(0.3, 0.2, 0.3);
		this.backFin.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.metal.apply();
		this.scene.translate(0, 0, -0.3);
		this.scene.scale(0.3, 0.2, 0.3);
		this.backFin.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.fire.apply();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.4);
		this.scene.scale(0.1, 0.1, 0.1);

		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.metal.apply();
		this.scene.translate(0, 0, 0.4);
		this.scene.scale(0.1, 0.1, 0.1);

		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.metal.apply();
		this.scene.translate(0, 0, -0.4);
		this.scene.scale(0.1, 0.1, 0.8);
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.popMatrix();
};


MyTorpedo.prototype.update = function(t)
{
	if (!this.startAnimation)
		return;

	if (this.counter == 0)
	{
		this.x = this.scene.submarine.x;
		this.y = this.scene.submarine.y - 0.6;
		this.z = this.scene.submarine.z;

		var p1 = [];
		var p2 = [];
		var p3 = [];
		var p4 = [];

		p1 = [this.x, this.y, this.z];
		p2 = [	this.scene.submarine.px,
				this.scene.submarine.py,
				this.scene.submarine.pz];
	
		var i;
		for (i = 0; i < this.scene.targets.length; i++)
		{
			if (this.scene.targets[i] != null)
			{
				p4 = [this.scene.targets[i].x,
					this.scene.targets[i].y,
					this.scene.targets[i].z];
				p3 = [this.scene.targets[i].x,
					this.scene.targets[i].y + 3,
					this.scene.targets[i].z];
				this.currentTarget = i;
				break;
			}
		}
		if (i == this.scene.targets.length)
		{
			this.startAnimation = false;
			return;
		}

		this.route.calc(p1, p2, p3, p4);
		this.counter++;
	}
	else if (this.counter < this.route.stacks)
	{
		this.x = this.route.coords[this.counter].x;
		this.y = this.route.coords[this.counter].y;
		this.z = this.route.coords[this.counter].z;
		if (this.counter + 1 < this.route.stacks)
			this.calcOrientation();
		this.counter++;
	}
	else
	{
		this.startAnimation = false;
		this.counter = 0;
		this.scene.targets[this.currentTarget] = null;
	}
};

MyTorpedo.prototype.calcOrientation = function()
{
	var xp, yp, zp;
	xp = this.route.coords[this.counter + 1].x - this.route.coords[this.counter].x ;

	yp = this.route.coords[this.counter + 1].y - this.route.coords[this.counter].y;

	zp = this.route.coords[this.counter + 1].z - this.route.coords[this.counter].z;

	this.deltaAngle += Math.atan2(zp, xp) * degToRad;
	this.alphaAngle += Math.atan2(yp, zp) * degToRad;

};