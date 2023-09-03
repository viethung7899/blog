varying vec2 uv;
uniform vec2 constant;
uniform float iterations;
uniform int displayMode;

void main() {
    vec3 result = iterate(uv, constant, iterations);
    vec2 z = result.xy;
    float iter = result.z;
    vec3 color = display(z, iter, iterations, displayMode);
    gl_FragColor = vec4(color, 1.);
}