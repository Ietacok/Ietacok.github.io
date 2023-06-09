#version 300 es

in vec4 position;
out vec4 Position;

void main()
{
    Position = position;
    gl_Position = position;
}