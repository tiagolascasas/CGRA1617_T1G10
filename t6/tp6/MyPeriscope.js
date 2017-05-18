/**
 * Created by Ruben on 5/9/2017.
 */

function MyPeriscope(scene) {
    CGFobject.call(this,scene);
    this.scene = scene;
    this.cylinder = new MyCylinder(this.scene, 40, 20);
    this.lid = new MyPolygon(this.scene, 40);

    this.previousInstant = Date.now();

    //position
    this.currentLength= .5;
    this.minLength = .25;
    this.maxLength = 1;

    this.lowering = false;
    this.lifting = false;
    this.speed = 0.0002;
};

MyPeriscope.prototype = Object.create(CGFobject.prototype);
MyPeriscope.prototype.constructor = MyPeriscope;

MyPeriscope.prototype.display = function () {

    this.scene.pushMatrix();	//horizontal pipe front lid
    this.scene.translate(0, 1.02+this.currentLength, 2.52 + 0.25);
    this.scene.scale(0.05, 0.05, 0.25);
    this.lid.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();	//horizontal pipe
    this.scene.translate(0, 1.02+this.currentLength, 2.52);
    this.scene.scale(0.05, 0.05, 0.25);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();	//vertical pipe lid
    this.scene.translate(0, 1.07+this.currentLength, 2.6);
    this.scene.scale(0.05, 1, 0.05);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.lid.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();	//vertical pipe
    this.scene.translate(0, 1.07+this.currentLength , 2.6);
    this.scene.scale(0.05, this.currentLength, 0.05);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.cylinder.display();
    this.scene.popMatrix();

};

MyPeriscope.prototype.lift = function()
{
    this.lifting = true;
};

MyPeriscope.prototype.stopLift = function()
{

    this.lifting = false;
};

MyPeriscope.prototype.lower = function()
{
    this.lowering = true;
};

MyPeriscope.prototype.stopLower = function()
{
    this.lowering = false;
};

MyPeriscope.prototype.update = function(t)
{
    var deltaT = t - this.previousInstant;
    this.previousInstant = t;

    if (this.lifting)
        this.currentLength -= deltaT * this.speed;
    if (this.lowering)
        this.currentLength += deltaT * this.speed;

   if (this.currentLength < this.minLength)
        this.currentLength = this.minLength;
    if (this.currentLength > this.maxLength)
        this.currentLength = this.maxLength;

};

