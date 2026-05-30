"use client";
import React, { useEffect, useRef } from "react";

const fragmentShaderSource = `
precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_scroll;

// High-quality noise for the "Gritty" dithered effect
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Create organic movement using sine waves
    float moving_shape = sin(uv.x * 3.0 + u_time * 0.5) * cos(uv.y * 2.0 + u_time * 0.8);
    moving_shape += sin(uv.y * 5.0 - u_time * 0.3) * 0.5;

    // Mouse interaction: create a "pull" toward the cursor
    float dist = distance(uv, u_mouse / u_resolution);
    float mouse_influence = smoothstep(0.01, 0.0, dist);
    
    // Combine movement and mouse ripple
    float final_mask = smoothstep(0.1, 0.8, moving_shape);

    // colors
    vec3 color_bg = vec3(1.0); // Almost black
    vec3 blue = vec3(0.7055, 0.8076, 1.45);
    vec3 yellow = vec3(1.0, 0.776, 0.333);
    
    vec3 color_accent;

    if(u_scroll < 0.4){
      color_accent = blue;
    } else if (u_scroll > 0.6){
      color_accent = yellow;
    } else {
      color_accent = mix(blue, yellow, ((u_scroll * (0.6-0.4)) / (0.6-0.4)) );  
    }

    
    vec3 final_color = mix(color_bg, color_accent, final_mask);

    // Add the "Grain" (The Dithered Texture)
    float n = random(uv + fract(u_time));
    final_color += (n - 0.5) * 0.12;

    gl_FragColor = vec4(final_color, 1.0);
}
`;

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    // Standard WebGL Boilerplate to compile the shader
    const createShader = (
      gl: WebGLRenderingContext,
      type: number,
      source: string,
    ) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    // Vertex shader (simple pass-through)
    const vertexShaderSource = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Setup buffers
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");
    const scrollLoc = gl.getUniformLocation(program, "u_scroll");

    let mouse = [0, 0];
    const handleMouseMove = (e: MouseEvent) => {
      mouse = [e.clientX, window.innerHeight - e.clientY];
    };
    window.addEventListener("mousemove", handleMouseMove);

    let scrollPercent = 0;
    const handleScroll = () => {
      // Calculates scroll from 0.0 to 1.0
      const h = document.documentElement;
      const b = document.body;
      const st = "scrollTop";
      const sh = "scrollHeight";
      scrollPercent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
    };
    window.addEventListener("scroll", handleScroll);

    const render = (time: number) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.uniform1f(timeLoc, time * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouse[0], mouse[1]);
      gl.uniform1f(scrollLoc, scrollPercent); // Pass scroll to shader

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-[-1] w-full h-full" />
  );
}
