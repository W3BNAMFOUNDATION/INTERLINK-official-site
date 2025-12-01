const canvas = document.querySelector('#demo-canvas');
if (canvas) {
  const gl = canvas.getContext('webgl');
  if (gl) {
    const vertexSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragSrc = `
      precision highp float;
      uniform float u_time;
      vec3 palette(float t) {
        return mix(vec3(0.18, 0.57, 1.0), vec3(0.37, 0.94, 0.76), 0.5 + 0.5 * sin(u_time + t * 6.28318));
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / vec2(${canvas.width.toFixed(1)}, ${canvas.height.toFixed(1)});
        float d = distance(uv, vec2(0.5));
        float ripple = sin(8.0 * d - u_time * 1.4);
        float glow = 0.4 + 0.6 * smoothstep(0.45, 0.0, d);
        vec3 color = palette(uv.x + ripple * 0.08) * glow;
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compile(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSrc));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
      ]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const timeUniform = gl.getUniformLocation(program, 'u_time');

    function render(t) {
      gl.uniform1f(timeUniform, t * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }
}
