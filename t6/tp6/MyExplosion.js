/**
 * Created by ei10117 on 17/05/2017.
 */


function MyExplosion(scene,x,y,z) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.sphere = new MySphere(this.scene);

    this.xOriginal=x;
    this.yOriginal=y;
    this.zOriginal=z;
    this.x=x;
    this.y=y;
    this.z=z;
    /* this.fire = new CGFappearance(this);
     this.fire.loadTexture("../resources/images/fire.png");*/
    //this.fire.setTextureWrap('REPEAT', 'REPEAT');
    this.counter = 0;

};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyExplosion;


MyExplosion.prototype.display = function () 
{
    if (this.counter < 50)
    {
      this.scene.pushMatrix();
      this.scene.translate(this.x,this.y,this.z);
      this.scene.translate(Math.random(10),Math.random(10),Math.random(10));
      this.scene.scale(0.4, 0.4, 0.4);
      this.sphere.display();
      this.scene.popMatrix();
      this.counter++;
    }
};


MyExplosion.prototype.update = function () {
    /*this.x =(Math.random() * (this.xOriginal - (this.xOriginal -0.5)) + this.xOriginal).toFixed(4);
    this.y = (Math.random() * (this.yOriginal - (this.yOriginal -0.5)) + this.yOriginal).toFixed(4);
    this.z =(Math.random() * (this.zOriginal - (this.zOriginal -0.5)) + this.zOriginal).toFixed(4);*/
  //  console.log(this.x);
};