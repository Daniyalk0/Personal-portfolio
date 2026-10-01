"use client";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF(
    "/models/bronze_ray_statue_2k.gltf"
  );

  const modelRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 6;

  const scale = isMobile ? 2.4 : 5;
  const positionY = isMobile ? -0.4 : -1.2;

  const introProgress = useRef(0);
  const clickPulse = useRef(0);

  useEffect(() => {
    if (!modelRef.current) return;

    modelRef.current.scale.setScalar(scale * 0.75);
    modelRef.current.position.y = positionY - 0.5;
    modelRef.current.rotation.x = 0.15;
  }, [scale, positionY]);

  useFrame(({ pointer, clock }, delta) => {
    if (!modelRef.current) return;

    const elapsed = clock.getElapsedTime();
    const idleRotation = Math.sin(elapsed * 0.8) * 0.06;
    const idleSway = Math.sin(elapsed * 1.1) * 0.08;
    const idleBreath = 1 + Math.sin(elapsed * 1.4) * 0.012;
    clickPulse.current = Math.max(0, clickPulse.current - delta * 3.5);

    // Entry animation
    if (introProgress.current < 1) {
      introProgress.current = Math.min(
        introProgress.current + delta * 1.2,
        1
      );

      const eased =
        1 - Math.pow(1 - introProgress.current, 3);

      modelRef.current.position.y = THREE.MathUtils.lerp(
        positionY - 0.5,
        positionY,
        eased
      );

      const currentScale = THREE.MathUtils.lerp(
        scale * 0.75,
        scale,
        eased
      );

      modelRef.current.scale.setScalar(currentScale);

      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        0.15,
        0,
        eased
      );
    }

    // Idle movement and cursor interaction
    modelRef.current.position.y = THREE.MathUtils.lerp(
      modelRef.current.position.y,
      positionY + idleSway + clickPulse.current * 0.12,
      0.04
    );

    modelRef.current.scale.setScalar(
      THREE.MathUtils.lerp(
        modelRef.current.scale.x,
        scale * (idleBreath + clickPulse.current * 0.04),
        0.04
      )
    );

    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      pointer.x * 0.65 + idleRotation + clickPulse.current * 0.3,
      0.05
    );

    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      -pointer.y * 0.38 + Math.sin(elapsed * 0.9) * 0.025,
      0.05
    );

    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      modelRef.current.rotation.z,
      Math.sin(elapsed * 0.7) * 0.025,
      0.05
    );
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale}
      position={[0, positionY, 0]}
      onPointerDown={() => {
        clickPulse.current = 1;
      }}
    />
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-50">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 40,
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />

        <directionalLight
          position={[3, 4, 5]}
          intensity={2}
        />

        <Environment preset="studio" />

        <Model />
      </Canvas>
    </div>
  );
}