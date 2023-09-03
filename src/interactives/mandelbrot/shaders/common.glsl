precision mediump float;

const float MAX_ITERATION = 512.;

vec3 binary(vec2 z, float iter, float iterations) {
    if (iter < iterations) return vec3(0.0);
    else return vec3(1.0);
}

vec3 grayscale(vec2 z, float iter, float iterations) {
    return vec3(sqrt(iter / iterations));
}

vec3 hallow(vec2 z, float iter, float iterations) {
    if (iter < iterations - 1.) return vec3(sqrt(iter / iterations));
    else return vec3(0.0);
}

vec3 beautiful(vec2 z, float iter, float iterations) {
    if (iter < iterations - 1.) {
        float v = log(iter + 1.5 - log(log2(length(z)))) / 3.4;
        if (v < 1.)
        return vec3(pow(v, 4.), pow(v, 2.5), v);
        v = max(1.0, 2.0 - v);
        return vec3(v, pow(v, 1.5), pow(v, 3.0));
    }
    return vec3(0.0);
}

vec3 iterate(vec2 start, vec2 constant, float iterations) {
    vec2 z = start;
    float iter = 0.0;
    for (float i = 0.0; i < MAX_ITERATION; i++) {
        iter = i;
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + constant;
        if (length(z) > 2.0 || iter > iterations) {
            break;
        }
    }
    return vec3(z, iter);
}

vec3 display(vec2 z, float iter, float iterations, int displayMode) {
    vec3 color;
    if (displayMode == 0) {
        color = binary(z, iter, iterations);
    } else if (displayMode == 1) {
        color = grayscale(z, iter, iterations);
    } else if (displayMode == 2) {
        color = hallow(z, iter, iterations);
    } else {
        color = beautiful(z, iter, iterations);
    }
    return color;
}