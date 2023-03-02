/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { OrbitControls } from '@react-three/drei';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from 'logic/fb';

export default function ModelRenderer() {
  const [gltf, setGltf] = useState([]);
  const [loadErr, setLoadErr] = useState(false);
  const targetRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    getDownloadURL(ref(storage, '/model.ply'))
      .then((url) => {
        const loader = new PLYLoader();
        loader.load(url, (gltf) => {
          setGltf(gltf);
          cameraRef.current.lookAt(targetRef.current.position);
        });
      })
      .catch(() => {
        setLoadErr(true);
      });
  }, []);

  if (gltf.length === 0) {
    return <h2>Ładowanie modelu 3D...</h2>;
  }

  if (loadErr) {
    return <h2 style={{ color: 'red' }}>Wystąpił błąd podczas ładowania modelu, spróbuj odświeżyc aplikację.</h2>;
  }

  return (
    <Canvas camera={{ position: [0, -10, 10], fov: 30 }}
      style={{
        backgroundColor: '#111a21',
        width: '100vw',
        height: '100vh'
      }}>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 20, 10]} angle={0.45} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <mesh ref={targetRef} scale={[1, 1, 1]} rotation={[-89.5, -0.01, 0]}>
        <primitive object={gltf} />
        <meshStandardMaterial color={'#AABBCC'} metalness={0.2} />
      </mesh>

      <OrbitControls
       camera={cameraRef.current}
        enableDamping
        dampingFactor={0.5}
        target={[1, -1, 1]}
        />
    </Canvas>
  );
}
