/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from '@react-three/drei';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from 'logic/fb';

export default function ModelRenderer() {
  const [gltf, setGltf] = useState([]);
  const meshRef = useRef();

  useEffect(() => {
    getDownloadURL(ref(storage, '/untitled.obj'))
      .then((url) => {
        const loader = new OBJLoader();
        loader.load(url, (gltf) => {
          setGltf(gltf);
        });
      })
      .catch((error) => {
        setGltf({ gltf_error_fb: error });
      });
  }, []);

  if (gltf.length === 0) {
    return <h2>Ładowanie modelu 3D...</h2>;
  }

  if ('gltf_error_fb' in gltf) {
    return <h2 style={{ color: 'red' }}>Wystąpił błąd podczas ładowania modelu, spróbuj odświeżyc aplikację.</h2>;
  }

  return (
    <Canvas camera={{ position: [20, 20, 20], fov: 60 }}
      style={{
        backgroundColor: '#111a21',
        width: '100vw',
        height: '100vh'
      }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <mesh ref={meshRef} scale={[5, 5, 5]}>
        <primitive object={gltf} />
        <meshStandardMaterial color={'#AABBCC'} metalness={0.2} />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
}
