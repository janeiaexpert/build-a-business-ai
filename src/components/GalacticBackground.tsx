import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 1800;

const makeCircleTexture = () => {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.75)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
};

const StarField = () => {
  const points = useRef<THREE.Points>(null);
  const sprite = useMemo(() => makeCircleTexture(), []);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);

    // Warm palette: deep brown, warm beige, cream
    const palette = [
      new THREE.Color("hsl(22, 45%, 30%)"),
      new THREE.Color("hsl(28, 45%, 55%)"),
      new THREE.Color("hsl(32, 55%, 72%)"),
      new THREE.Color("hsl(36, 40%, 92%)"),
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      // Galaxy spiral distribution
      const radius = Math.pow(Math.random(), 0.6) * 9;
      const branch = (i % 3) / 3 * Math.PI * 2;
      const spin = radius * 0.75;
      const spread = (Math.random() - 0.5) * 1.6 * (radius * 0.12 + 0.3);

      positions[i * 3] = Math.cos(branch + spin) * radius + spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.6;
      positions[i * 3 + 2] = Math.sin(branch + spin) * radius + spread;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 0.05 + 0.015;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.035;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.06 - 0.35;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        map={sprite}
        alphaMap={sprite}
        size={0.09}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
};

const GalacticBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {/* Base wash matching the palette */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Nebula glows */}
      <div
        className="absolute -top-32 left-1/4 w-[700px] h-[700px] rounded-full opacity-25 blur-[140px]"
        style={{ background: "hsl(28, 45%, 60%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[150px]"
        style={{ background: "hsl(22, 45%, 34%)" }}
      />

      <Canvas
        camera={{ position: [0, 3.2, 7.5], fov: 60 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <StarField />
      </Canvas>

      {/* Soft vignette so content stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, hsla(36, 30%, 97%, 0) 0%, hsla(36, 30%, 97%, 0.35) 65%, hsla(36, 30%, 97%, 0.8) 100%)",
        }}
      />
    </div>
  );
};

export default GalacticBackground;
