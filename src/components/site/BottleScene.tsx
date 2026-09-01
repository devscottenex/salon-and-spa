import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Bottle() {
  const group = useRef<THREE.Group>(null);

  const profile = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    // body
    pts.push(new THREE.Vector2(0, -1.25));
    pts.push(new THREE.Vector2(0.62, -1.25));
    pts.push(new THREE.Vector2(0.72, -1.0));
    pts.push(new THREE.Vector2(0.74, 0.1));
    pts.push(new THREE.Vector2(0.64, 0.55));
    pts.push(new THREE.Vector2(0.3, 0.8));
    pts.push(new THREE.Vector2(0.19, 1.0));
    pts.push(new THREE.Vector2(0.19, 1.2));
    pts.push(new THREE.Vector2(0, 1.2));
    return pts;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.28;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.07;
  });

  return (
    <group ref={group}>
      <mesh castShadow>
        <latheGeometry args={[profile, 96]} />
        <meshPhysicalMaterial
          color="#e9dcc4"
          transmission={0.92}
          thickness={1.1}
          roughness={0.12}
          ior={1.5}
          metalness={0}
          clearcoat={1}
          attenuationColor={new THREE.Color("#d8b56a")}
          attenuationDistance={2.2}
        />
      </mesh>
      <mesh position={[0, 1.32, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.28, 48]} />
        <meshStandardMaterial color="#c9a44c" metalness={1} roughness={0.22} />
      </mesh>
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.66, 0.66, 0.1, 48]} />
        <meshStandardMaterial color="#c9a44c" metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Rig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.8 + 0.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function BottleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5], fov: 38 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#0a0908"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 3]} intensity={2.4} color="#ffe6b8" />
      <directionalLight position={[-4, 1, -2]} intensity={1.1} color="#7fd4b8" />
      <pointLight position={[0, -2, 3]} intensity={12} color="#d8b56a" distance={9} />
      <Bottle />
      <Rig />
    </Canvas>
  );
}
