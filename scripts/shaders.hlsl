let SHADERS = {
    SHADERS_GRADIENT: {
     VERT:  
     "attribute vec4 a_position;"+
     "void main() {" + 
        "gl_Position = a_position;" +
      "}   " +
      "   ",
     FRAG: 
     "void main() {" + 
      "attribute float t;"+
      "attribute float max_t;"+
      "attribute vec4 color;"+
      "gl_FragColor = color * max_t;" +
      "}",
    }
}