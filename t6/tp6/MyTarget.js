/**
 * MyTarget
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTarget(scene, x, y, z) 
{
	CGFobject.call(this,scene);

	this.top = new MyLamp(this.scene, 40, 20);

	this.x = x;
	this.y = y;
	this.z = z;
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

MyTarget.prototype.display = function()
{
	this.scene.pushMatrix();

	this.scene.translate(this.x, this.y, this.z);
	this.scene.scale(0.2, 0.2, 0.2);
	
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.top.display();
	this.scene.popMatrix();

	this.scene.popMatrix();
};


MyTarget.prototype.update = function(t)
{

};