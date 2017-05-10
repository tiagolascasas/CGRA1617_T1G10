MyHelix.rotationSpeeds =
    {

        SLOW: 0.2,
        NORMAL: 1,
        FAST: 10
    };

function MyHelix(scene) {
    CGFobject.call(this, scene);
    this.scene = scene;
  
	this.rotationDir = MyHelix.rotationSpeeds.FAST;
	this.rotationSpeed = 0.1;

	this.previousTime = Date.now();
	
	this.helix = new MyQuad(this.scene, 0, 1, 0, 1);
	this.top = new MySemiSphere(this.scene, 40, 20);
	this.helixR = 0.0;
}

MyHelix.prototype = Object.create(CGFobject.prototype);
MyHelix.prototype.constructor = MyHelix;

MyHelix.prototype.display = function() {
	
	this.scene.pushMatrix();	//helix, back
		this.scene.rotate(this.helixR * degToRad * this.rotationDir, 0, 0, 1);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.scale(0.05, 0.35, 1);
		this.helix.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	// helix, front
		this.scene.rotate(this.helixR * degToRad * this.rotationDir, 0, 0, 1);
		this.scene.scale(0.05, 0.35, 1);
		this.helix.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();	//helix, cover
		this.scene.scale(0.025, 0.025, 0.1);
		this.top.display();
	this.scene.popMatrix();

};


MyHelix.prototype.update = function(time) {
    var deltaT = time - this.previousTime;
    this.previousTime = time;
    this.helixR = this.helixR + (2 * Math.PI * deltaT * this.rotationSpeed * this.rotationDir * this.scene.Velocity);
	
  
};

MyHelix.prototype.increaseSpeed = function() {
    switch (this.rotationSpeed) {
        case MyHelix.rotationSpeeds.SLOW:
            this.rotationSpeed = MyHelix.rotationSpeeds.NORMAL;
            break;
        case MyHelix.rotationSpeeds.NORMAL:
            this.rotationSpeed = MyHelix.rotationSpeeds.FAST;
            break;
        case MyHelix.rotationSpeeds.FAST:
            this.rotationSpeed = MyHelix.rotationSpeeds.VERYFAST;
            break;
    }
};

MyHelix.prototype.decreaseSpeed = function() {
    switch (this.rotationSpeed) {
        case MyHelix.rotationSpeeds.FAST:
            this.rotationSpeed = MyHelix.rotationSpeeds.NORMAL;
            break;
        case MyHelix.rotationSpeeds.NORMAL:
            this.rotationSpeed = MyHelix.rotationSpeeds.SLOW;
            break;
        case MyHelix.rotationSpeeds.SLOW:
            this.rotationSpeed = MyHelix.rotationSpeeds.VERYSLOW;
            break;
    }
};
