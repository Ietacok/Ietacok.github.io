precision mediump float;

varying vec2 vUV; // -1 to 1 for each component
varying vec3 color_frag;
varying vec3 position_frag;
varying float size_frag;

void main() {
    vec3 toObjectClipSpace = position_frag;
    gl_FragColor = vec4(color_frag.x * (mod(position_frag.x,0.5) + mod(gl_FragCoord.x,0.5)),color_frag.y * (mod(position_frag.y,0.5) + mod(gl_FragCoord.y,0.5)),color_frag.z,1) ;
}