"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

function ShoeModel() {
  const { scene } = useGLTF("/shoe2.glb");
  const mesh = useRef<THREE.Group>(null);

  useFrame(() => {
    if (mesh.current) mesh.current.rotation.y += 0.005;
  });

  return (
    <primitive object={scene} ref={mesh} scale={12} position={[0, -1.5, 0]} />
  );
}

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section relative min-h-screen overflow-hidden">
      {/* 🔹 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/vid.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🔹 Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🔹 3D Scene Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* 3D Canvas */}
        <div className="w-full h-[70vh]"> {/* 👈 limit 3D model height */}
          <Canvas camera={{ position: [0, 1, 12], fov: 40 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[8, 9, 8]} intensity={1.2} />
            <spotLight
              position={[0, -5, 5]}
              angle={0.6}
              intensity={1}
              penumbra={0.5}
              color={"#ffffff"}
            />

            <Suspense fallback={null}>
              <ShoeModel />
            </Suspense>

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
          </Canvas>
        </div>

        {/* 🔹 Button under model */}
        <button
          onClick={() => navigate("/search")}
          className="mt-10 px-8 py-3 bg-white/80 backdrop-blur-md text-black font-semibold text-lg rounded-full shadow-lg hover:bg-white transition-all duration-300"
        >
          Go to PrompM Section
        </button>
      </div>
    </section>
  );
};

export default Hero;
