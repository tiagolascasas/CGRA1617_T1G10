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

	this.x = 0.0;
	this.y = 3.0;
	this.z = 0.0;
	this.rotation = 0.0;
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor=MyTorpedo;

MyTorpedo.prototype.display = function()
{
	this.scene.pushMatrix();

	this.scene.translate(this.x, this.y, this.z);
	this.scene.rotate(this.rotation, 0, 1, 0);
	this.scene.translate(0, 0, 0);

	this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.3);
		this.scene.rotate(Math.PI / 2, 0, 0, 1);
		this.scene.scale(0.3, 0.2, 0.3);
		this.backFin.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.3);
		this.scene.scale(0.3, 0.2, 0.3);
		this.backFin.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.4);
		this.scene.scale(0.1, 0.1, 0.1);
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.4);
		this.scene.scale(0.1, 0.1, 0.1);
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.4);
		this.scene.scale(0.1, 0.1, 0.8);
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.popMatrix();
};


MyTorpedo.prototype.update = function(t)
{

};
