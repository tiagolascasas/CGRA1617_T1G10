/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene) {
	CGFobject.call(this,scene);

	this.pointer = new MyQuad(this.scene);
	this.angle = 0;
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.setAngle = function (angle)
{
	this.angle = -angle * Math.PI / 180.0;
}

MyClockHand.prototype.display = function () {
	this.scene.pushMatrix();
		this.scene.rotate(this.angle, 0, 0, 1);
		this.scene.translate(0, 0.5, 0);
		this.scene.scale(0.05, 1, 1);
		this.pointer.display();
	this.scene.popMatrix();
};