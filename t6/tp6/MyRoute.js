function MyRoute(scene)
{
   CGFobject.call(this, scene);
    this.coords = [];
    this.p1 = [];
    this.p2 = [];
    this.p3 = [];
    this.p4 = [];
};

MyRoute.prototype = Object.create(CGFobject.prototype);
MyRoute.prototype.constructor=MyRoute;

MyRoute.prototype.calc= function(p1, p2, p3, p4) {

    var x,y,z;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;

    this.coords = [];
   
    var dist = Math.sqrt(
        Math.pow(this.p1[0] - this.p4[0], 2) +
        Math.pow(this.p1[1] - this.p4[1], 2) +
        Math.pow(this.p1[2] - this.p4[2], 2)
    );

    this.stacks = (1000 / this.scene.refreshRate) * dist;

    var t;
    for( t= 0; t <= 1; t += 1/this.stacks) {
        x = this.qt1(t,this.p1[0]) + this.qt2(t,this.p2[0]) + this.qt3(t,this.p3[0]) + this.qt4(t,this.p4[0]);
        y = this.qt1(t,this.p1[1]) + this.qt2(t,this.p2[1]) + this.qt3(t,this.p3[1]) + this.qt4(t,this.p4[1]);
        z = this.qt1(t,this.p1[2]) + this.qt2(t,this.p2[2]) + this.qt3(t,this.p3[2]) + this.qt4(t,this.p4[2]);
        this.coords.push(new Coords(x,y,z));
    }
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


