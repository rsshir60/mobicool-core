"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function NeuralCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeCluster, setActiveCluster] = useState<string>("Latent Space (384-d)");
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    // Generate cluster nodes representing multi-dimensional ML embeddings
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    // Three distinct clusters: 
    // 1: Tabular Features (Cyan)
    // 2: Dense Vectors / RAG (Emerald)
    // 3: Model Parameters & Weights (Purple)
    const clusterCenters = [
      { x: -28, y: 10, z: 0, color: new THREE.Color("#38bdf8") }, // Cyan
      { x: 26, y: -8, z: 5, color: new THREE.Color("#10b981") }, // Emerald
      { x: 0, y: 18, z: -10, color: new THREE.Color("#a855f7") }, // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      const clusterIdx = i % 3;
      const center = clusterCenters[clusterIdx];
      
      const spread = 20;
      const x = center.x + (Math.random() - 0.5) * spread;
      const y = center.y + (Math.random() - 0.5) * spread;
      const z = center.z + (Math.random() - 0.5) * spread;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      colors[i * 3] = center.color.r;
      colors[i * 3 + 1] = center.color.g;
      colors[i * 3 + 2] = center.color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Lines geometry for neural connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    linesGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / container.clientWidth;
      const y = (e.clientY - rect.top) / container.clientHeight;
      mouseX = (x - 0.5) * 2;
      mouseY = -(y - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      targetX += (mouseX * 15 - targetX) * 0.05;
      targetY += (mouseY * 12 - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(scene.position);

      // Subtle rotation
      particles.rotation.y = elapsedTime * 0.04;
      lines.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;
      lines.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

      // Dynamic connection lines
      const pos = particles.geometry.attributes.position.array as Float32Array;
      let lineVertexIndex = 0;
      const maxDistance = 14;

      for (let i = 0; i < particleCount; i++) {
        // subtle breathing motion
        pos[i * 3 + 1] = originalPositions[i * 3 + 1] + Math.sin(elapsedTime * 1.5 + i) * 0.8;

        for (let j = i + 1; j < particleCount; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            linePositions[lineVertexIndex++] = pos[i * 3];
            linePositions[lineVertexIndex++] = pos[i * 3 + 1];
            linePositions[lineVertexIndex++] = pos[i * 3 + 2];

            linePositions[lineVertexIndex++] = pos[j * 3];
            linePositions[lineVertexIndex++] = pos[j * 3 + 1];
            linePositions[lineVertexIndex++] = pos[j * 3 + 2];
          }
        }
      }

      lines.geometry.setDrawRange(0, lineVertexIndex / 3);
      lines.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    // Viewport & tab visibility optimization — modern-web-guidance/performance
    let isRendering = true;

    const startLoop = () => {
      if (!isRendering) {
        isRendering = true;
        clock.start();
        animate();
      }
    };

    const stopLoop = () => {
      if (isRendering) {
        isRendering = false;
        clock.stop();
        cancelAnimationFrame(animationFrameId);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    startLoop();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] md:h-[560px] overflow-hidden rounded-2xl border border-white/10 glass-panel">
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-0 cursor-crosshair" />

      {/* Futuristic Overlay UI Badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
          Neural Latent Space (UMAP 3D Projection)
        </span>
        <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
          Dim: 384 → 3D
        </span>
      </div>

      {/* Cluster Legend / Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-lg">
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            <span className="text-slate-300">Tabular Features</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            <span className="text-slate-300">Dense Embeddings</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
            <span className="text-slate-300">Model Weights</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
          <span className="text-sky-400">Interaction:</span> Move cursor to rotate & explore manifold
        </div>
      </div>
    </div>
  );
}
