class RGBA {
 R = -1;
 G = -1;
 B = -1;
 A = -1;
 constructor (R=0,G=0,B=0,A=0)
 {
  this.R = R;
  this.G = G;
  this.B = B;
  this.A = A;
 }
}

class Vector3 {
 Values = [0,0,0]

 constructor(x = 0,y = 0, z = 0)
 {
  this.Values[0] = x;
  this.Values[1] = y;
  this.Values[2] = z;  
 }

 Add(Vector)
 {
  this.Values[0] += Vector.Values[0];
  this.Values[1] += Vector.Values[1];
  this.Values[2] += Vector.Values[2];
 }
 Subtract(Vector)
 {
  this.Values[0] -= Vector.Values[0];
  this.Values[1] -= Vector.Values[1];
  this.Values[2] -= Vector.Values[2];
 }
 Divide(Vector)
 {
  this.Values[0] /= Vector.Values[0];
  this.Values[1] /= Vector.Values[1];
  this.Values[2] /= Vector.Values[2];
 }
 Multiply(Vector)
 {
  this.Values[0] *= Vector.Values[0];
  this.Values[1] *= Vector.Values[1];
  this.Values[2] *= Vector.Values[2];
 }
 Pow2()
 {
  this.Values[0] *= this.Values[0];
  this.Values[1] *= this.Values[1];
  this.Values[2] *= this.Values[2];
 }
 Dot(Vector)
 {
  let DotProduct = this.Values[0] * Vector.Values[2] + this.Values[1] * Vector.Values[1] + this.Values[2] * Vector.Values[0];
  return DotProduct;
 }
}

class _Object {
    Scale = new Vector3(1,1,1);
    Position = new Vector3(0,0,0);   
    Vertices = [];
    Triangles = [];
    Color = new RGBA(); 
}

class GameObject {
 
}

class ScreenBox_2D extends _Object{
    constructor()
    {
     super();
     this.Vertices[0] = -1; // x left top
     this.Vertices[1] = -1; // y
     this.Vertices[2] = 0; // z is always 0

     this.Vertices[3] = 1; // right top
     this.Vertices[4] = -1;
     this.Vertices[5] = 0; // 

     this.Vertices[6] = -1; // bottom left
     this.Vertices[7] = 1;
     this.Vertices[8] = 0; //

     this.Vertices[9] = 1; //bottom right
     this.Vertices[10] = 1;
     this.Vertices[11] = 0; // 

     this.Triangles[0] = -1; // left top
     this.Triangles[1] = 1; // right top
     this.Triangles[2] = 2; // bottom left

     this.Triangles[3] = 3; // bottom right
     this.Triangles[4] = 2; // bottom left
     this.Triangles[5] = 1; // top left
    }
}

class Polygon extends _Object //Structurally there is no difference between ScreenBox_2D and Polygon class, the difference is in how they are initialized
{
  constructor()
  {

  }  
}