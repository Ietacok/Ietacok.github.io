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

let PointSizePercent = 5
let PointsData = {
   Positions: [],
   DepthDirections: [],
   Colors: [],
   Sizes: []
}
let prev = null
function RenderStep(time)
{
   if (prev == null)
   {
     prev = time; 
   }
   for (let i = 2;i < PointsData.Positions.length;i+=3)
   {
    let i2 = ((i+1)/3)-1;
    PointsData.Positions[i] += (PointsData.DepthDirections[i2]) * (time-prev) * 0.00025 ;
    if (PointsData.Positions[i] >= 1)
    {
      PointsData.Positions[i] = 1;
      PointsData.DepthDirections[i2] = -PointsData.DepthDirections[i2];
    }
    else if (PointsData.Positions[i] <= 0)
    {
      PointsData.Positions[i] = 0;
      PointsData.DepthDirections[i2] = -PointsData.DepthDirections[i2];
    }
    PointsData.DepthDirections[i2] = PointsData.DepthDirections[i2] * 0.995;
    if (PointsData.DepthDirections[i2] == 0)
    {
      PointsData.Colors[i2] = 0;
      PointsData.Colors[i2+1] = 0;
      PointsData.Colors[i2+2] = 0;
    }
   }

   let VertexBuffer = WebGLContext.createBuffer();
   WebGLContext.bindBuffer(WebGLContext.ARRAY_BUFFER,VertexBuffer);
   WebGLContext.bufferData(WebGLContext.ARRAY_BUFFER,new Float32Array(PointsData.Positions),WebGLContext.STATIC_DRAW);

   let Location = WebGLContext.getAttribLocation(Program,"position");
   WebGLContext.enableVertexAttribArray(Location);
   WebGLContext.vertexAttribPointer(Location,3,WebGLContext.FLOAT,false,0,0); //each vertex contains 3 elements X,Y,Z 

   VertexBuffer = WebGLContext.createBuffer();
   WebGLContext.bindBuffer(WebGLContext.ARRAY_BUFFER,VertexBuffer);
   WebGLContext.bufferData(WebGLContext.ARRAY_BUFFER,new Float32Array(PointsData.Colors),WebGLContext.STATIC_DRAW);

   Location = WebGLContext.getAttribLocation(Program,"color");
   WebGLContext.enableVertexAttribArray(Location);
   WebGLContext.vertexAttribPointer(Location,3,WebGLContext.FLOAT,false,0,0);

   WebGLContext.viewport(0, 0, CanvasObject.width, CanvasObject.height);
   WebGLContext.clear(WebGLContext.COLOR_BUFFER_BIT);
   WebGLContext.clearColor(0.5, 0.5, 0.5, 1.0);
   WebGLContext.drawArrays(WebGLContext.POINTS,3, PointsData.Positions.length);
   prev = time; 
} 

function Logic()
{
 CanvasObject.width = 1920; //UserOptions.ResWidth;
 CanvasObject.height = 1080; //UserOptions.ResHeight;
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


   for (let i = 0;i < 25000;i++)
   {
      let j = i*3
      PointsData.Positions[j] = (Math.random() - 0.5) * 2;
      PointsData.Positions[j+1] = (Math.random() - 0.5) * 2;
      PointsData.Positions[j+2] = Math.random();

      PointsData.Colors[j] = Math.random();
      PointsData.Colors[j+1] = Math.random();
      PointsData.Colors[j+2] = Math.random();

      PointsData.DepthDirections[i] = Math.random() - 0.5; 

      PointsData.Sizes[i] = Math.random() * 100;
   }
   
   let VertexBuffer = WebGLContext.createBuffer();
   WebGLContext.bindBuffer(WebGLContext.ARRAY_BUFFER,VertexBuffer);
   WebGLContext.bufferData(WebGLContext.ARRAY_BUFFER,new Float32Array(PointsData.Colors),WebGLContext.STATIC_DRAW);

   let Location = WebGLContext.getAttribLocation(Program,"color");
   WebGLContext.enableVertexAttribArray(Location);
   WebGLContext.vertexAttribPointer(Location,3,WebGLContext.FLOAT,false,0,0);

   VertexBuffer = WebGLContext.createBuffer();
   WebGLContext.bindBuffer(WebGLContext.ARRAY_BUFFER,VertexBuffer);
   WebGLContext.bufferData(WebGLContext.ARRAY_BUFFER,new Float32Array(PointsData.Sizes),WebGLContext.STATIC_DRAW);

   Location = WebGLContext.getAttribLocation(Program,"size");
   WebGLContext.enableVertexAttribArray(Location);
   WebGLContext.vertexAttribPointer(Location,1,WebGLContext.FLOAT,false,0,0);


   //let indexBuffer = WebGLContext.createBuffer();
   //WebGLContext.bindBuffer(WebGLContext.ELEMENT_ARRAY_BUFFER, indexBuffer);
   //WebGLContext.bufferData(WebGLContext.ELEMENT_ARRAY_BUFFER, new Uint16Array(CanvasScreenBox_2D.Triangles), WebGLContext.STATIC_DRAW);
   WebGLContext.enable(WebGLContext.DEPTH_TEST);
   WebGLContext.depthFunc(WebGLContext.LEQUAL);
   WebGLContext.depthMask(true);
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