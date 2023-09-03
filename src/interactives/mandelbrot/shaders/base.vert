attribute vec3 aPosition;
varying vec2 uv;
uniform float aspectRatio;
uniform float scale;
uniform vec2 offset;

void main() {
    uv = aPosition.xy;
    uv.x *= aspectRatio;
    uv /= scale;
    uv -= offset;
    gl_Position = vec4(aPosition, 1.0);
}
