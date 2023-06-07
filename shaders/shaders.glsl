#version 300


varying vec2 position_2d;
varying float time;
varying float max_time;

#if defined(VERTEX)

void main()
{
 gl_Position = position;
}

#else 

float distance_elipse(vec2 vector)
{
 return vector.x*vector.x + vector.y+vector.y; 
}

void main()
{
 vec2 object_space_position = gl_FragCoord - position_2d;


 gl_FragColor = vec4(object_space_position.x,object_space_position.y,object_space_position.x,0.0);
}

#endif