
precision mediump float;
varying vec3 vLighting;
varying vec3 vColor;

void main()
{
	gl_FragColor = vec4(vColor * vLighting, 1.0);
}

