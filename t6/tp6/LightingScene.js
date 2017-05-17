var degToRad = Math.PI / 180.0;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.enableTextures(true);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(21/255.0, 62/255.0, 111/255.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.sandTexture = new CGFappearance(this);
	this.sandTexture.setAmbient(0.2, 0.2, 0.2, 1);
	this.sandTexture.setSpecular(0.1, 0.1, 0.1, 1);
	this.sandTexture.setDiffuse(0.4, 0.4, 0.4, 1);
	this.sandTexture.loadTexture("../resources/images/sand.png");
	this.sandTexture.setTextureWrap('REPEAT', 'REPEAT');

	this.poleMaterial = new CGFappearance(this);
	this.poleMaterial.setAmbient(0.2, 0.2, 0.2, 1);
	this.poleMaterial.setSpecular(0.8, 0.8, 0.8, 1);
	this.poleMaterial.setDiffuse(0.4, 0.4, 0.4, 1);

    this.redMaterial = new CGFappearance(this);
    this.redMaterial.setAmbient(1.0, 0.0, 0.0, 1);
    this.redMaterial.setSpecular(1.0, 0.5, 0.0, 1);
    this.redMaterial.setDiffuse(1.0, 0.5, 0.0, 1);
	
	//appearances
	
	this.metal = new CGFappearance(this);
	this.metal.loadTexture("../resources/images/metal1.png");
	this.metal.setTextureWrap('REPEAT', 'REPEAT');
	
	this.wood = new CGFappearance(this);
	this.wood.loadTexture("../resources/images/wood.png");
	this.wood.setTextureWrap('REPEAT', 'REPEAT');
	
	this.gold = new CGFappearance(this);
	this.gold.loadTexture("../resources/images/gold.png");
	this.gold.setTextureWrap('REPEAT', 'REPEAT');


	this.submarineAppearancesList = [
		"Metal",
		"Wood",
		"Gold"
	];
	
	
	
	this.submarineAppearanceGUI = "Metal";
	this.currSubmarineAppearance =  0;
	this.submarineAppearance = [];
	this.submarineAppearance[0] = this.metal;
	this.submarineAppearance[1] = this.wood;
	this.submarineAppearance[2] = this.gold;
	

	// Scene elements
	this.floor = new MyQuad(this, 0, 4, 0, 4);
	this.clock = new MyClock(this);
	this.pole = new MyCylinder(this, 30, 10);
	this.poleLid = new MyPolygon(this, 30);
	this.submarine = new MySubmarine(this, -3, 10.5, 1.2, 10, -3, 10.5);
	this.torpedo = new MyTorpedo(this);
	this.torpedo.start();

	this.targets = [];
	this.targets.push(new MyTarget(this, 0, 1, 1));
	this.targets.push(new MyTarget(this, 5, 1, 5));
	this.targets.push(new MyTarget(this, 2, 2, 0));

	this.axis = new CGFaxis(this);

	this.setUpdatePeriod(50);
	this.Velocity = 0.1;

	this.Light_0 = true;
	this.Light_1 = true;
	this.Light_2 = true;
	this.Light_3 = true;
	this.Animated_Clock = true;
	this.explosion = new MyExplosion(this,2,2,2);
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0, 0, 0, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true);

	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true);


	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 0.0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);
	this.lights[3].enable();
}

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Primitive drawing section

	//Floor
	this.pushMatrix();
		this.scale(15, 1, 15);
		this.translate(0.3, 0, 0.3);
		this.rotate(-Math.PI / 2, 1, 0, 0);
		this.sandTexture.apply();
		this.floor.display();
	this.popMatrix();

	// Pole
	this.pushMatrix();
		this.poleMaterial.apply();
		this.translate(8, 0, 0);
		this.rotate(-Math.PI / 2, 1, 0, 0);
		this.scale(0.1, 0.1, 5);
		this.translate(0, 0, 1);
		this.poleLid.display();
		this.translate(0, 0, -1.1);
		this.pole.display();
	this.popMatrix();

	// Clock
	this.pushMatrix();
		this.translate(8, 5, 0);
		this.scale(0.6, 0.6, 0.1);
		this.clock.display();
    this.popMatrix();

    // Submarine
    this.pushMatrix();
    	this.submarine.applyAppearance();
		this.submarine.display();
    this.popMatrix();
	
	// Torpedo
    this.pushMatrix();
		this.torpedo.display();
    this.popMatrix();

	//Targets
	for (i = 0; i < this.targets.length; i++)
	{
		if (this.targets[i] != null)
		{
			this.pushMatrix();
			this.targets[i].display();
			this.popMatrix();
		}
	}


	this.changeAppearence();
	// ---- END Primitive drawing section


};

LightingScene.prototype.update = function(currTime)
{
	if (this.Animated_Clock)
		this.clock.update(currTime);

	this.submarine.update(currTime);

	this.torpedo.update();

	
	this.Light_0 ? this.lights[0].enable() : this.lights[0].disable();
	this.Light_1 ? this.lights[1].enable() : this.lights[1].disable();
	this.Light_2 ? this.lights[2].enable() : this.lights[2].disable();
	this.Light_3 ? this.lights[3].enable() : this.lights[3].disable();

};

LightingScene.prototype.Stop_Clock = function ()
{
	this.Animated_Clock = !this.Animated_Clock;	
};


LightingScene.prototype.changeAppearence = function (){
	    //GUI Appearance choice  

	switch (this.submarineAppearanceGUI) {
    case "Metal":
        this.currSubmarineAppearance = 0;
        break;
    case "Wood":
        this.currSubmarineAppearance = 1;
        break;
    case "Gold":
        this.currSubmarineAppearance = 2;
        break;
    }		
   
}