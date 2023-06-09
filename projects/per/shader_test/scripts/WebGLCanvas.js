let CanvasObject = null;
let WebGLContext = null;
let CanvasScreenBox_2D = new ScreenBox_2D();
let UserOptions = new Options();
let MainShader = new Shader("./shaders/main_shader",true); //Source : string , IsUrl : boolean
let vert_shader = null;
let frag_shader = null;

function RenderStep()
{
 WebGLContext.drawElements(WebGLContext.TRIANGLES, CanvasScreenBox_2D.Vertices.length, WebGLContext.UNSIGNED_BYTE, 0);
} 

function Logic()
{
 CanvasObject.width = UserOptions.WidthRes;
 CanvasObject.height = UserOptions.HeightRes;
}

function GameLoop()
{
 Logic();
 RenderStep();
 requestAnimationFrame(GameLoop);
}

function Initialize()
{
 CanvasObject = document.getElementById("canvas");
 WebGLContext = CanvasObject.getContext("webgl");

 let Program = WebGLContext.createProgram();

 vert_shader = WebGLContext.createShader(WebGLContext.VERTEX_SHADER);
 WebGLContext.shaderSource(vert_shader,MainShader.Sourcevert);
 WebGLContext.compileShader(vert_shader);
 
 frag_shader = WebGLContext.createShader(WebGLContext.FRAGMENT_SHADER);
 WebGLContext.shaderSource(frag_shader,MainShader.Sourcefrag);
 WebGLContext.compileShader(frag_shader);

 WebGLContext.attachShader(Program,vert_shader);
 WebGLContext.attachShader(Program,frag_shader);
 
 WebGLContext.linkProgram(Program);
 
 MainShader.Program = Program;

 if (!WebGLContext.getProgramParameter(program, WebGLContext.LINK_STATUS)) {
    const info = WebGLContext.getProgramInfoLog(program);
    throw `Could not compile WebGL program. Issue: \n${info}`;
 }

 //Since there's only one shader, we can call it already here (useProgram)
 WebGLContext.useProgram(Program);

 let VertexBuffer = WebGLContext.createBuffer();
 WebGLContext.bindBuffer(gl.ARRAY_BUFFER,VertexBuffer);
 WebGLContext.bufferData(
    WebGLContext.ARRAY_BUFFER,
    new Float32Array(CanvasScreenBox_2D.Vertices),
    WebGLContext.STATIC_DRAW
    );

 const IndexBuffer = gl.createBuffer(); 
 WebGLContext.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IndexBuffer)
 WebGLContext.bufferData(
    gl.ELEMENT_ARRAY_BUFFER, 
    new Uint16Array(CanvasScreenBox_2D.Triangles), 
    gl.STATIC_DRAW
    );
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