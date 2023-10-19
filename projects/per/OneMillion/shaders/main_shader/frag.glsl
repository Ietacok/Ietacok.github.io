precision mediump float;

varying vec3 color_frag;

void main() {
    gl_FragColor = vec4(color_frag,0.25);
}
