"use client";
import { b } from "framer-motion/client";
import React, { useEffect, useRef } from "react";

const fragmentShaderSource = `
precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_scroll;
uniform vec3 u_color_bg;
uniform vec3 u_color_blob;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    float moving_shape = sin(uv.x * 3.0 + u_time * 0.5) * cos(uv.y * 2.0 + u_time * 0.8);
    moving_shape += sin(uv.y * 5.0 - u_time * 0.3) * 0.5;

    float dist = distance(uv, u_mouse / u_resolution);
    float mouse_influence = smoothstep(0.01, 0.0, dist);
    
    float final_mask = smoothstep(0.1, 0.8, moving_shape);

    vec3 color_bg = u_color_bg; 
    vec3 color_blob = u_color_blob;
    vec3 yellow = vec3(1.0, 0.776, 0.333);
    
    vec3 color_accent;

    if(u_scroll < 0.4){
      color_accent = color_blob;
    } else if (u_scroll > 0.6){
      color_accent = yellow;
    } else {
      color_accent = mix(color_blob, yellow, ((u_scroll * (0.6-0.4)) / (0.6-0.4)) );  
    }

    vec3 final_color = mix(color_bg, color_accent, final_mask);

    float n = random(uv + fract(u_time));
    final_color += (n - 0.5) * 0.12;

    gl_FragColor = vec4(final_color, 1.0);
}
`;

// 1. Define Props Interface for normalized RGB colors [R, G, B] between 0.0 and 1.0
interface FluidBackgroundProps {
  bgColor?: [number, number, number];
  blobColor?:[number, number, number];
}

export default function FluidBackground({ bgColor = [1.0, 1.0, 1.0], blobColor = [0.7055, 0.8076, 1.45] }: FluidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // 2. Point the ref directly to incoming prop color values
  const colorRef = useRef<[number, number, number]>(bgColor);
  const colorRefBlob  =useRef<[number, number, number]>(blobColor);
  
  // Keep the render loop ref updated whenever the prop updates
  useEffect(() => {
    colorRef.current = bgColor;
    colorRefBlob.current = blobColor;
  }, [bgColor, blobColor]);

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

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShaderSource = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

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

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const scrollLoc = gl.getUniformLocation(program, "u_scroll");
    const bgColLoc = gl.getUniformLocation(program, "u_color_bg");
    const bgColBlob = gl.getUniformLocation(program, "u_color_blob");

    let scrollPercent = 0;
    const handleScroll = () => {
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
      gl.uniform1f(scrollLoc, scrollPercent);
      
      // Pass values from the updated ref right into WebGL uniform loop
      gl.uniform3f(bgColLoc, colorRef.current[0], colorRef.current[1], colorRef.current[2]);
      gl.uniform3f(bgColBlob, colorRefBlob.current[0], colorRefBlob.current[1], colorRefBlob.current[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] w-full h-full" />;
}