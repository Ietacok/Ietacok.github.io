let CanvasObject = null;
let WebGLContext = null;
//let CanvasScreenBox_2D = new ScreenBox_2D();
let UserOptions = new Options_();
let MainShader = new Shader("./shaders/main_shader",true); //Source : string , IsUrl : boolean
let vert_shader = null;
let frag_shader = null;
let BufferData = null;
let VertexBuffer = null;

let Program = null;

let Points = Math.pow(10,6);  
let GravityPoint = new Vector3(0,0,0);
let OperationVector = new Vector3(0,0,0);
let GravityAttraction = 0.001;
let PointsData = {
   PositionsVec3: [],
   Positions: [],
   Velocites: [],
   Colors: [],
}
const o60 = 1/60;

let prev = null

function RenderStep(time)
{

 let deltaTime = 0;

 if (!prev)
 {
  prev = time;
  deltaTime = 0;
 }
 else {
  deltaTime = Math.max(time-prev*0.001,o60);
 }

  for (let i = 0;i < Points-1;i++)
  {
   let pos_i = i * 2;

   let copy_grav = OperationVector;
   OperationVector.Values[0] = GravityPoint.Values[0];
   OperationVector.Values[1] = GravityPoint.Values[1];
   let position = PointsData.PositionsVec3[i];
   copy_grav.Subtract(position); //Calcualting difference
   let dist = copy_grav.DistPwr(); //Getting distance in squared space
   copy_grav.MultiplyNumber(1/dist*deltaTime*GravityAttraction);

   PointsData.Velocites[pos_i] += copy_grav.Values[0];
   PointsData.Velocites[pos_i+1] += copy_grav.Values[1];

   if (PointsData.Positions[pos_i] >= 1 || PointsData.Positions[pos_i] <= -1)
   {
    PointsData.Velocites[pos_i] = -PointsData.Velocites[pos_i];
    PointsData.Positions[pos_i] = Math.max(Math.min(PointsData.Positions[pos_i],1),-1) * 0.999;
   }

   if (PointsData.Positions[pos_i+1] >= 1 || PointsData.Positions[pos_i+1] <= -1)
   {
    PointsData.Velocites[pos_i+1] = -PointsData.Velocites[pos_i+1];
    PointsData.Positions[pos_i+1] = Math.max(Math.min(PointsData.Positions[pos_i+1],1),-1) * 0.999;
   }

   PointsData.Positions[pos_i] += PointsData.Velocites[pos_i]*deltaTime;
   PointsData.Positions[pos_i+1] += PointsData.Velocites[pos_i+1]*deltaTime;
   PointsData.PositionsVec3[i].Values[0] = PointsData.Positions[pos_i];
   PointsData.PositionsVec3[i].Values[1] = PointsData.Positions[pos_i+1];
  }


  //Gravity Point
   let pos_i = (Points-1) * 2;

   PointsData.Velocites[pos_i] += (Math.random()-0.5)*0.01;
   PointsData.Velocites[pos_i+1] += (Math.random()-0.5)*0.01;
   

   if (PointsData.Positions[pos_i] >= 1 || PointsData.Positions[pos_i] <= -1)
   {
    PointsData.Velocites[pos_i] = -PointsData.Velocites[pos_i];
    PointsData.Positions[pos_i] = Math.max(Math.min(PointsData.Positions[pos_i],1),-1) * 0.999;
   }

   if (PointsData.Positions[pos_i+1] >= 1 || PointsData.Positions[pos_i+1] <= -1)
   {
    PointsData.Velocites[pos_i+1] = -PointsData.Velocites[pos_i+1];
    PointsData.Positions[pos_i+1] = Math.max(Math.min(PointsData.Positions[pos_i+1],1),-1) * 0.999;
   }

   PointsData.Positions[pos_i] += PointsData.Velocites[pos_i]*deltaTime;
   PointsData.Positions[pos_i+1] += PointsData.Velocites[pos_i+1]*deltaTime;

   GravityPoint = new Vector3(PointsData.Positions[pos_i],PointsData.Positions[pos_i+1]);
   //

   let VertexBuffer = WebGLContext.createBuffer();
   WebGLContext.bindBuffer(WebGLContext.ARRAY_BUFFER,VertexBuffer);
   WebGLContext.bufferData(WebGLContext.ARRAY_BUFFER,new Float32Array(PointsData.Positions),WebGLContext.STATIC_DRAW);

   let Location = WebGLContext.getAttribLocation(Program,"position");
   WebGLContext.enableVertexAttribArray(Location);
   WebGLContext.vertexAttribPointer(Location,2,WebGLContext.FLOAT,false,0,0); //each vertex contains 2 elements X,Y 

   WebGLContext.viewport(0, 0, CanvasObject.width, CanvasObject.height);
   WebGLContext.clear(WebGLContext.COLOR_BUFFER_BIT);
   WebGLContext.clearColor(0, 0, 0, 1.0);
   WebGLContext.drawArrays(WebGLContext.POINTS,0, Points);
   prev = time; 
} 

function Logic()
{
 CanvasObject.width = 1000; //UserOptions.ResWidth;
 CanvasObject.height = 1000; //UserOptions.ResHeight;
}

async function GameLoop()
{
 while(true)
 {
  Logic();
  requestAnimationFrame(RenderStep); 
  await Wait(1);
 }
}

function CheckShader(ShaderObj)
{
    if (!WebGLContext.getShaderParameter(ShaderObj, WebGLContext.COMPILE_STATUS)) {
        const info = WebGLContext.getShaderInfoLog(ShaderObj);
        throw `Error compiling fragment shader: ${info}`;
     }
}
function Initialize()
{
   CanvasObject = document.getElementById("canvas");
   WebGLContext = CanvasObject.getContext("webgl", { antialias: false });

   WebGLContext.imageSmoothingEnabled = false
   
   let VertShader = WebGLContext.createShader(WebGLContext.VERTEX_SHADER);
   WebGLContext.shaderSource(VertShader,MainShader.Sourcevert);
   WebGLContext.compileShader(VertShader);

   CheckShader(VertShader);

   let FragShader = WebGLContext.createShader(WebGLContext.FRAGMENT_SHADER);
   WebGLContext.shaderSource(FragShader,MainShader.Sourcefrag);
   WebGLContext.compileShader(FragShader);

   CheckShader(FragShader);
   
   Program = WebGLContext.createProgram();
   WebGLContext.attachShader(Program,VertShader);
   WebGLContext.attachShader(Program,FragShader);
   WebGLContext.linkProgram(Program);
   WebGLContext.validateProgram(Program);

   if ( !WebGLContext.getProgramParameter( Program, WebGLContext.LINK_STATUS) ) {
      var info = WebGLContext.getProgramInfoLog(Program);
      throw "Could not compile WebGL program. \n\n" + info;
   }

   WebGLContext.useProgram(Program);

   for (let i = 0;i < Points-1;i++)
   {
      let j = i*2
      let j2 = i*3;
      PointsData.Positions[j] = (Math.random() - 0.5) * 2;
      PointsData.Positions[j+1] = (Math.random() - 0.5) * 2;

      PointsData.Velocites[j] = 0;
      PointsData.Velocites[j+1] = 0;

      PointsData.Colors[j2] = 1;
      PointsData.Colors[j2+1] = 1;
      PointsData.Colors[j2+2] = 1;

      PointsData.PositionsVec3[i] = new Vector3(PointsData.Positions[j],PointsData.Positions[j+1],0.0);
   }

   let j = (Points-1)*2;
   let j2 = (Points-1)*3;

   PointsData.Positions[j] = GravityPoint.Values[0];
   PointsData.Positions[j+1] = GravityPoint.Values[1];

   PointsData.Velocites[j] = 0;
   PointsData.Velocites[j+1] = 0;

   PointsData.Colors[j2] = 0;
   PointsData.Colors[j2+1] = 0;
   PointsData.Colors[j2+2] = 1;

   PointsData.PositionsVec3[Points-1] = new Vector3(PointsData.Positions[j],PointsData.Positions[j+1],0.0);
   
   let VertexBuffer = WebGLContext.createBuffer();
   WebGLContext.bindBuffer(WebGLContext.ARRAY_BUFFER,VertexBuffer);
   WebGLContext.bufferData(WebGLContext.ARRAY_BUFFER,new Float32Array(PointsData.Colors),WebGLContext.STATIC_DRAW);

   let Location = WebGLContext.getAttribLocation(Program,"color");
   WebGLContext.enableVertexAttribArray(Location);
   WebGLContext.vertexAttribPointer(Location,3,WebGLContext.FLOAT,false,0,0);

   VertexBuffer = WebGLContext.createBuffer();
   WebGLContext.bindBuffer(WebGLContext.ARRAY_BUFFER,VertexBuffer);
   WebGLContext.bufferData(WebGLContext.ARRAY_BUFFER,new Float32Array(PointsData.Sizes),WebGLContext.STATIC_DRAW);

   Location = WebGLContext.getAttribLocation(Program,"position");
   WebGLContext.enableVertexAttribArray(Location);
   WebGLContext.vertexAttribPointer(Location,2,WebGLContext.FLOAT,false,0,0);
}

async function Main()
{
  while (!MainShader.isLoaded)
  {
   
   await Wait(1);
   continue;
  }
   
 Initialize();
 GameLoop();
}
Add_Callback(Main);
