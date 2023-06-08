#version 300 es

varying vec2 position_2d;
varying float time;
varying float max_time;
varying vec2 dimensions;

#if defined(VERTEX)

void main()
{
 gl_Position = position;
}

#else 

float distance_elipse(vec2 vector)
{
 return  pow(vector.x*vector.x,0.5) + pow(vector.y*vector.y,0.5); 
}

void main()
{
 vec2 object_space_position = (gl_FragCoord - position_2d) / dimensions; 
 float dist = max(1 - distance_elipse(object_space_position),0);

 gl_FragColor = vec4(dist,dist,dist,0.0);
}

#endif