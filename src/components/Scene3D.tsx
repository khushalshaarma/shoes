import React, { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Scene3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const sneakerRef = useRef<THREE.Group>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 50);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Create 3D Sneaker
    const sneakerGroup = new THREE.Group();
    sneakerRef.current = sneakerGroup;

    // Sneaker body (main part)
    const bodyGeometry = new THREE.BoxGeometry(2, 0.8, 4);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff4444,
      metalness: 0.1,
      roughness: 0.3,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.4;
    body.castShadow = true;
    sneakerGroup.add(body);

    // Sneaker sole
    const soleGeometry = new THREE.BoxGeometry(2.2, 0.3, 4.2);
    const soleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.8,
    });
    const sole = new THREE.Mesh(soleGeometry, soleMaterial);
    sole.position.y = 0;
    sole.castShadow = true;
    sneakerGroup.add(sole);

    // Sneaker laces area
    const lacesGeometry = new THREE.BoxGeometry(1.8, 0.2, 2);
    const lacesMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      metalness: 0.0,
      roughness: 0.9,
    });
    const laces = new THREE.Mesh(lacesGeometry, lacesMaterial);
    laces.position.set(0, 0.9, 0.5);
    sneakerGroup.add(laces);

    // Add some detail elements
    for (let i = 0; i < 6; i++) {
      const eyeletGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.1);
      const eyeletMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x888888,
        metalness: 0.8,
        roughness: 0.2,
      });
      const eyelet = new THREE.Mesh(eyeletGeometry, eyeletMaterial);
      eyelet.position.set(
        (i % 2 === 0 ? -0.4 : 0.4),
        0.9,
        1.5 - (Math.floor(i / 2) * 0.5)
      );
      eyelet.rotation.x = Math.PI / 2;
      sneakerGroup.add(eyelet);
    }

    sneakerGroup.position.set(0, 0, 0);
    sneakerGroup.rotation.y = Math.PI / 6;
    sneakerGroup.rotation.x = -Math.PI / 12;
    scene.add(sneakerGroup);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xff4444, 0.8, 10);
    pointLight1.position.set(-3, 2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4444ff, 0.6, 10);
    pointLight2.position.set(3, -2, 3);
    scene.add(pointLight2);

    // Particles system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xff4444,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      // Subtle sneaker animation
      if (sneakerRef.current) {
        sneakerRef.current.rotation.y += 0.005;
        sneakerRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Scroll animations
    ScrollTrigger.create({
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        if (sneakerRef.current) {
          sneakerRef.current.rotation.y = Math.PI / 6 + self.progress * Math.PI;
          sneakerRef.current.position.x = self.progress * 3;
          camera.position.z = 5 - self.progress * 2;
        }
      }
    });

    ScrollTrigger.create({
      trigger: ".features-section",
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        if (sneakerRef.current) {
          sneakerRef.current.scale.setScalar(1 + self.progress * 0.5);
        }
      }
    });

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default Scene3D;