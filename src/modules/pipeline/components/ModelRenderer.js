/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

export default function ModelRenderer() {
  const [gltf, setGltf] = useState([]);
  const meshRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(process.env.PUBLIC_URL + '/model.glb', (gltf) => {
      setGltf(gltf);
    });
  }, []);

  if (gltf.length === 0) {
    return <h2>Ładowanie modelu 3D...</h2>;
  }

  return (
    <Canvas camera={{ position: [12, 10, 12.25], fov: 30 }}
      style={{
        backgroundColor: '#111a21',
        width: '100vw',
        height: '100vh'
      }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <mesh ref={meshRef} scale={[10, 10, 10]}>
        <primitive object={gltf.scene} />
        <meshStandardMaterial color={'#AABBCC'} metalness={0.2} />
      </mesh>
      <boxGeometry args={[1, 1, 1]} />
      <OrbitControls/>
    </Canvas>
  );
}
