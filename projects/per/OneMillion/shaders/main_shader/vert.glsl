precision mediump float;    

attribute vec3 color;
attribute vec2 position;

varying vec3 color_frag;

void main() {
    color_frag = color;

    float size = 1.0;
    
    gl_PointSize = size;
    gl_Position = vec4(position, 1.0,1.0);
}