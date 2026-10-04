/**
 * Lightswind UI smokey background (WebGL wave shader).
 * @see https://lightswind.com/components/smokey-background
 */
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const vertexSmokeySource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentSmokeySource = `
precision mediump float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform vec3 u_color;
uniform vec3 u_teal;

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 centeredUV = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
    float time = iTime * 0.5;
    vec2 rippleCenter = (2.0 * (iMouse / iResolution) - 1.0) * 0.08;

    vec2 distortion = centeredUV;
    for (float i = 1.0; i < 8.0; i++) {
        distortion.x += 0.5 / i * cos(i * 2.0 * distortion.y + time + rippleCenter.x * 0.85);
        distortion.y += 0.5 / i * cos(i * 2.0 * distortion.x + time + rippleCenter.y * 0.85);
    }

    float wave = abs(sin(distortion.x + distortion.y + time));
    float waveB = abs(sin(distortion.x * 1.22 - distortion.y * 0.92 + time * 0.75));
    float field = wave * 0.52 + waveB * 0.48;
    float glow = smoothstep(0.88, 0.1, field);

    vec3 shadow = u_color * 0.22;
    vec3 body = mix(u_color * 0.5, u_color * 0.92, smoothstep(0.15, 0.65, field));
    vec3 bridge = mix(u_color, u_teal, 0.42);
    vec3 peak = mix(body, bridge, smoothstep(0.45, 0.92, field) * 0.55);
    vec3 tone = mix(shadow, peak, smoothstep(0.08, 0.78, glow));
    fragColor = vec4(tone * glow, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

export type BlurSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

const blurClassMap: Record<BlurSize, string> = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

/** Violet base + indigo highlight (same hue family — blends smoothly). */
const DEFAULT_PURPLE = "#7E22CE";
const DEFAULT_TEAL = "#6366F1";

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.substring(0, 2), 16) / 255;
  const g = parseInt(normalized.substring(2, 4), 16) / 255;
  const b = parseInt(normalized.substring(4, 6), 16) / 255;
  return [r, g, b];
}

export function LightswindSmokeyBackground({
  backdropBlurAmount = "md",
  color = DEFAULT_PURPLE,
  teal = DEFAULT_TEAL,
  className,
}: {
  backdropBlurAmount?: BlurSize;
  color?: string;
  teal?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const colorRef = useRef(color);
  const tealRef = useRef(teal);

  colorRef.current = color;
  tealRef.current = teal;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexSmokeySource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentSmokeySource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const iMouseLocation = gl.getUniformLocation(program, "iMouse");
    const uColorLocation = gl.getUniformLocation(program, "u_color");
    const uTealLocation = gl.getUniformLocation(program, "u_teal");

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    const startTime = performance.now();
    let raf = 0;

    const render = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);

      const [r, g, b] = hexToRgb(colorRef.current);
      const [tr, tg, tb] = hexToRgb(tealRef.current);
      gl.uniform3f(uColorLocation, r, g, b);
      gl.uniform3f(uTealLocation, tr, tg, tb);
      gl.uniform2f(iResolutionLocation, width, height);
      gl.uniform1f(iTimeLocation, (now - startTime) / 1000);

      const mouse = mouseRef.current;
      const targetX = mouse.active ? mouse.x * dpr : width * 0.5;
      const targetY = mouse.active ? height - mouse.y * dpr : height * 0.5;
      const smooth = smoothMouseRef.current;
      smooth.x += (targetX - smooth.x) * 0.035;
      smooth.y += (targetY - smooth.y) * 0.035;
      gl.uniform2f(iMouseLocation, smooth.x, smooth.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const blurClass = blurClassMap[backdropBlurAmount] ?? blurClassMap.md;

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-0", className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className={cn("absolute inset-0", blurClass)} />
      <div className="absolute inset-0 bg-background/38" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/52 via-background/18 to-background/68" />
    </div>
  );
}
