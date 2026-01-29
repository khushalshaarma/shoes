"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// =============================
// Shoe floating animation
// =============================
function ShoeModel() {
  const { scene } = useGLTF('/shoe.glb');
  const shoeRef = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.name.includes("Cube") || child.name.includes("Plane")) {
        child.visible = false;
      }
    });

    ScrollTrigger.create({
      trigger: "#scroll-container",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });
  }, [scene]);

  useFrame(() => {
    if (!shoeRef.current) return;
    const p = scrollProgress.current;

    const startY = 20;
    const endY = -25;
    const baseY = startY + p * (endY - startY);

    const bounce = Math.sin(p * Math.PI * 4) * 4;
    const swing = Math.sin(p * Math.PI * 3) * 0.3;
    const flip = Math.sin(p * Math.PI * 6) * 0.5;
    const rotY = p * Math.PI * 4 + Math.sin(p * Math.PI * 2) * 0.5;
    const scale = 0.3 + Math.sin(p * Math.PI * 2) * 0.05;

    shoeRef.current.position.set(0, baseY + bounce, 0);
    shoeRef.current.rotation.set(flip, rotY, swing);
    shoeRef.current.scale.set(scale, scale, scale);
  });

  return <primitive ref={shoeRef} object={scene} />;
}

// =============================
// Shoebox with opening lid
// =============================
function BgShoebox({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF('/shoebox.glb');
  const lidPivotRef = useRef<THREE.Group | null>(null);
  const [boxGroup, setBoxGroup] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const clonedScene = scene.clone();
    const boxContainer = new THREE.Group();

    let lidMesh: THREE.Mesh | null = null;

    clonedScene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.name.includes("TOP")) {
          lidMesh = mesh.clone() as THREE.Mesh;
        } else {
          boxContainer.add(mesh.clone() as THREE.Mesh);
        }
      }
    });

    if (lidMesh) {
      const box = new THREE.Box3().setFromObject(lidMesh);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      const pivot = new THREE.Group();
      pivot.position.set(center.x, center.y, center.z - size.z / 2);

      (lidMesh as THREE.Mesh).position.sub(center);
      pivot.add(lidMesh);

      boxContainer.add(pivot);
      lidPivotRef.current = pivot;
    }

    // ===== Add white background plane behind the shoebox =====
    const bgPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: "black" })
    );
    bgPlane.position.set(0, 44.3, -20); // adjust Z so it sits behind the box
    boxContainer.add(bgPlane);

    setBoxGroup(boxContainer);
  }, [scene]);

  useFrame(() => {
    if (!lidPivotRef.current) return;

    const closed = 0;
    const open = Math.PI * 0.9;
    const ease = gsap.parseEase("power3.inOut");

    const localProgress = Math.min(scrollProgress / 0.3, 1);
    lidPivotRef.current.rotation.z =
      closed + ease(localProgress) * (open - closed);
  });

  if (!boxGroup) return null;

  return (
    <group scale={[0.6, 0.6, 0.6]} position={[0, 30, -60]}>
      <primitive object={boxGroup} />
    </group>
  );
}

// =============================
// Main Component
// =============================
export default function ShoeScroll() {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress for glow effect
  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#scroll-container",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => setScrollProgress(self.progress),
    });
  }, []);

  // Intersection Observer for videos
  useEffect(() => {
    const videos = [videoRef1.current, videoRef2.current, videoRef3.current].filter(Boolean) as HTMLVideoElement[];

    videos.forEach((vid) => {
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: 0.5 } // play when 50% visible
    );

    videos.forEach((vid) => observer.observe(vid));

    return () => {
      videos.forEach((vid) => observer.unobserve(vid));
    };
  }, []);

  const glowIntensity = 10 + Math.sin(scrollProgress * Math.PI * 4) * 10;

  return (
    <div id="scroll-container" className="h-[500vh] relative">
      {/* Background videos */}
      <video
        ref={videoRef1}
        src="/img11.mp4"
        className="absolute top-[100vh] w-full h-screen object-cover -z-20 "
      />
      <div className="absolute top-[100vh] w-full h-screen bg-blue-500/30 -z-10 pointer-events-none"></div>

      <video
        ref={videoRef2}
        src="/img45.mp4"
        className="absolute top-[200vh] w-full h-screen object-cover -z-20 "
      />
      <div className="absolute top-[200vh] w-full h-screen bg-blue-500/30 -z-10 pointer-events-none"></div>

      <video
        ref={videoRef3}
        src="/img54.mp4"
        className="absolute top-[300vh] w-full h-[200vh] object-cover"
      />
      <div className="absolute top-[300vh] w-full h-screen bg-blue-500/30 -z-10 pointer-events-none"></div>
      <div className="absolute top-[400vh] w-full h-screen -z-10 pointer-events-none"></div>

      {/* Canvas */}
      <Canvas
        shadows
        gl={{ alpha: true }}
        className="fixed top-0 left-0 w-full h-full -z-10"
        camera={{ position: [0, 0, 50], fov: 40 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[15, 25, 15]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Suspense fallback={null}>
          <ShoeModel />
          <BgShoebox scrollProgress={scrollProgress} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>

      {/* Overlay text */}
      <div className="absolute top-0 left-0 w-full text-center z-20">
        <section className="h-screen flex items-center justify-center">
          <h1
            className="text-5xl font-bold text-white relative z-20"
            style={{
              textShadow: `0 0 ${glowIntensity}px #0ff, 0 0 ${glowIntensity * 2}px #0ff, 0 0 ${glowIntensity * 3}px #0ff`,
            }}
          >
            Scroll
          </h1>
        </section>

        <section className="h-screen flex items-center justify-center">
          <p
            className="text-3xl font-bold text-white"
            style={{
              textShadow: `0 0 ${glowIntensity}px #0ff, 0 0 ${glowIntensity * 2}px #0ff, 0 0 ${glowIntensity * 3}px #0ff`,
            }}
          >
            High Performance ⚡
          </p>
        </section>

        <section className="h-screen flex items-center justify-center">
          <p
            className="text-3xl font-bold text-white"
            style={{
              textShadow: `0 0 ${glowIntensity}px #ff0, 0 0 ${glowIntensity * 2}px #ff0, 0 0 ${glowIntensity * 3}px #ff0`,
            }}
          >
            Lightweight & Stylish 👟
          </p>
        </section>
      </div>
    </div>
  );
}
