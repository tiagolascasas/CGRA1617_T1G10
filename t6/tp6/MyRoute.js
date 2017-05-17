

function MyRoute(scene,stacks)
{
   CGFobject.call(this, scene);
  //  this.points = points;
    this.stacks = stacks;
    this.coords = [];
    this.p1 = [];
    this.p2 = [];
    this.p3 = [];
    this.p4 = [];

//    this.calc();

};

MyRoute.prototype = Object.create(CGFobject.prototype);
MyRoute.prototype.constructor=MyRoute;

MyRoute.prototype.calc= function() {

    var x,y,z;
   
    this.coords = [];
   
    var t;
    for( t= 0; t <= 1; t += 1/this.stacks) {
        x = this.qt1(t,this.p1[0]) + this.qt2(t,this.p2[0]) + this.qt3(t,this.p3[0]) + this.qt4(t,this.p4[0]);
        y = this.qt1(t,this.p1[1]) + this.qt2(t,this.p2[1]) + this.qt3(t,this.p3[1]) + this.qt4(t,this.p4[1]);
        z = this.qt1(t,this.p1[2]) + this.qt2(t,this.p2[2]) + this.qt3(t,this.p3[2]) + this.qt4(t,this.p4[2]);
        this.coords.push(new Coords(x,y,z));
    }
    console.log("calc");


};

MyRoute.prototype.qt1 = function (t,p) {

    return Math.pow(1-t,3) * p;
};

MyRoute.prototype.qt2 = function (t,p) {

    return (3*t  * Math.pow(1-t,2)) * p;
};


MyRoute.prototype.qt3 = function (t,p) {

    return ((3 * Math.pow(t,2)) * (1 -t)) * p;
};

MyRoute.prototype.qt4 = function (t,p) {

    return Math.pow(t,3) * p;
};


