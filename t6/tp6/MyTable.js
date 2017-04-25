/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.cube = new MyUnitCubeQuad(this.scene);
	this.materialLegs = new CGFappearance(this.scene);
	this.materialTable = new CGFappearance(this.scene);
	this.tableAppearance = new CGFappearance(this.scene);

	this.materialLegs.setAmbient(0.3,0.3,0.3,1);
	this.materialLegs.setDiffuse(0.5,0.5,0.5,1);
	this.materialLegs.setSpecular(0.9,0.9,0.9,1);	
	this.materialLegs.setShininess(170);

	this.materialTable.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.materialTable.setDiffuse(244.0/255, 185.0/255, 66.0/255, 1.0);
	this.materialTable.setAmbient(244.0/255, 185.0/255, 66.0/255, 1.0);
	this.materialTable.setShininess(30);

	this.tableAppearance.setAmbient(0.2, 0.2, 0.2, 1.0);
	this.tableAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
	this.tableAppearance.setDiffuse(0.7, 0.7, 0.7, 1.0);
	this.tableAppearance.loadTexture("../resources/images/table.png");

};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
    this.scene.pushMatrix();
		this.scene.translate(2.2, 0, 1.2);
		this.scene.scale(0.3, 3.5, 0.3);
		this.scene.translate(0, 0.5, 0);
		this.materialLegs.apply();
		this.cube.display();
    this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-2.2, 0, 1.2);
		this.scene.scale(0.3, 3.5, 0.3);
		this.scene.translate(0, 0.5, 0);
		this.materialLegs.apply();
		this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
		this.scene.translate(2.2, 0, -1.2);
		this.scene.scale(0.3, 3.5, 0.3);
		this.scene.translate(0, 0.5, 0);
		this.materialLegs.apply();
		this.cube.display();
	this.scene.popMatrix();

    this.scene.pushMatrix();
		this.scene.translate(-2.2, 0, -1.2);
		this.scene.scale(0.3, 3.5, 0.3);
		this.scene.translate(0, 0.5, 0);
		this.materialLegs.apply();
		this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
		this.scene.translate(0, 3.5, 0);
		this.scene.scale(5, 0.3, 3);
		this.scene.translate(0, 0.5, 0);
	//	this.materialTable.apply();
		this.tableAppearance.apply();
		this.cube.display();
    this.scene.popMatrix();

};