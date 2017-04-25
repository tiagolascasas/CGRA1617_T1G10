/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() 
 {
 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

	if (this.slices == 1 && this.stacks == 1)
	{
		this.vertices = [];
		this.normals = [];
		this.indices = [];
		this.texCoords = [];

		this.vertices.push(
			0, 0, 1,
			1, 0, 1,
			0, 1, 1
		);
		this.normals.push(
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		);
		this.indices.push(
			0, 1, 2
		);
		this.texCoords.push(
			1, 0,
			1, 1,
			0, 0
		);

		this.vertices.push(
			1, 0, 1,
			1, 0, 0,
			0, 1, 0,
			0, 1, 1
		);
		this.normals.push(
			Math.sqrt(2), Math.sqrt(2), 0,
			Math.sqrt(2), Math.sqrt(2), 0,
			Math.sqrt(2), Math.sqrt(2), 0,
			Math.sqrt(2), Math.sqrt(2), 0
		);
		this.indices.push(
			3, 4, 5,
			6, 3, 5
		);
		this.texCoords.push(
			1, 0,
			1, 1,
			0, 1,
			0, 0
		);

		this.vertices.push(
			0, 1, 0,
			0, 1, 1,
			0, 0, 1,
			0, 0, 0
		);
		this.normals.push(
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0
		);
		this.indices.push(
			9, 8, 7,
			10, 9, 7
		);
		this.texCoords.push(
			0, 0,
			0, 1,
			1, 1,
			1, 0
		);

		this.vertices.push(
			0, 0, 0,
			0, 1, 0,
			1, 0, 0
		);
		this.normals.push(
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		);
		this.indices.push(
			12, 13, 11
		);
		this.texCoords.push(
			1, 1,
			0, 1,
			1, 0
		);

		this.vertices.push(
			0, 0, 1,
			0, 0, 0,
			1, 0, 0,
			1, 0, 1
		);
		this.normals.push(
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0
		);
		this.indices.push(
			17, 15, 16,
			17, 14, 15
		);
		this.texCoords.push(
			1, 1,
			0, 1,
			0, 0,
			0, 1
		);
	}
	else
	{
		angle = 2*Math.PI / this.slices;

		for (i = 0, j = 0; i < this.slices; i++)
		{	
			for (k = 0.0; k < 1.0; k += 1.0/this.stacks, j += 4)
			{	
				this.vertices.push(Math.cos(i*angle), Math.sin(i*angle), k);
				this.normals.push(Math.cos(i*angle - angle/2), Math.sin(i*angle - angle/2), 0);

				this.vertices.push(Math.cos(i*angle), Math.sin(i*angle), k+1.0/this.stacks);
				this.normals.push(Math.cos(i*angle - angle/2), Math.sin(i*angle - angle/2), 0);

				this.vertices.push(Math.cos((i+1)*angle), Math.sin((i+1)*angle), k);
				this.normals.push(Math.cos((i+1)*angle - angle/2), Math.sin((i+1)*angle - angle/2), 0);

				this.vertices.push(Math.cos((i+1)*angle), Math.sin((i+1)*angle), k+1.0/this.stacks);
				this.normals.push(Math.cos((i+1)*angle - angle/2), Math.sin((i+1)*angle - angle/2), 0);

				this.indices.push(j + 1, j, j + 3);
				this.indices.push(j + 2, j + 3, j);
			}
		}
	}
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
