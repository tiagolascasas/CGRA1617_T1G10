/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this,scene);

	this.body = new MyCylinder(this.scene, 50, 1);
	this.face = new MyPolygon(this.scene, 50);
	this.secondHand = new MyClockHand(this.scene);
	this.minuteHand = new MyClockHand(this.scene);
	this.hourHand = new MyClockHand(this.scene);
	this.clockTex = new CGFappearance(this.scene);
	this.material = new CGFappearance(this.scene);
	this.red = new CGFappearance(this.scene);

	this.clockTex.setAmbient(0.2, 0.2, 0.2, 1.0);
	this.clockTex.setSpecular(0.2, 0.2, 0.2, 1.0);
	this.clockTex.setDiffuse(0.7, 0.7, 0.7, 1.0);
	this.clockTex.loadTexture("../resources/images/clock.png");
		
	this.material.setAmbient(0.1,0.1,0.1,1);
	this.material.setDiffuse(0.1,0.1,0.1,1);
	this.material.setSpecular(0.1,0.1,0.1,1);
	this.material.setShininess(20);

	this.red.setAmbient(0.1,0.1,0.1,1);
	this.red.setDiffuse(1, 0, 0, 1);
	this.red.setSpecular(0.1,0.1,0.1,1);
	this.red.setShininess(20);


	this.hAngle = 90.0;
	this.mAngle = 180.0;
	this.sAngle = 270.0;

	this.secondHand.setAngle(this.sAngle);
	this.minuteHand.setAngle(this.mAngle);
	this.hourHand.setAngle(this.hAngle);

	this.prevCurrTime = null;
	this.counter = 0;
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.display = function () 
{
	this.scene.pushMatrix();
    	this.scene.translate(0, 0, 1.01);
    	this.scene.scale(0.4, 1, 1);
    	this.material.apply();
		this.hourHand.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0, 0, 1.03);
    	this.scene.scale(0.6, 1, 1);
    	this.material.apply();
		this.minuteHand.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0, 0, 1.05);
    	this.scene.scale(0.9, 1, 1);
    	this.red.apply();
		this.secondHand.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0, 0, 1);
    	this.clockTex.apply();
		this.face.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.material.apply();
		this.body.display();
    this.scene.popMatrix();
};

MyClock.prototype.update = function (currTime)
{
	if (this.prevCurrTime == null)
		this.prevCurrTime = currTime;
		
	this.counter += (currTime - this.prevCurrTime);
	this.prevCurrTime = currTime;
	if (this.counter >= 1000)
	{
		this.counter -= 1000;
		this.sAngle += 360.0/60.0;
		this.mAngle += 360.0/60.0/60.0;
		this.hAngle += 360.0/60.0/60.0/60.0;
		this.secondHand.setAngle(this.sAngle);
		this.minuteHand.setAngle(this.mAngle);
		this.hourHand.setAngle(this.hAngle);
	}
} 