varying vec2 uv;
uniform float iterations;
uniform int displayMode;

void main() {
    vec3 result = iterate(vec2(0.0), uv, iterations);
    vec2 z = result.xy;
    float iter = result.z;
    vec3 color = display(z, iter, iterations, displayMode);
    gl_FragColor = vec4(color, 1.);
}