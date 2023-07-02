precision mediump float;    

attribute vec3 color;
attribute vec3 position;
attribute float size;
varying float depth;
varying vec2 vUV;
varying vec3 color_frag;
varying vec3 position_frag;
varying float size_frag;

uniform vec2 dimensions;

void main() {
    vUV = position.xy;
    depth = position.z;
    color_frag = color * depth;
    //position_frag is a position of the object in pixels in the clip space. 
    position_frag = vec3(position.xy,position.z);

    size_frag = size * position.z;
    gl_PointSize = size * position.z;
    gl_Position = vec4(position.xy,-position.z,1.0);
}