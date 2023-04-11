/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { OrbitControls } from '@react-three/drei';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage, db } from 'logic/fb';
import { collection, onSnapshot } from 'firebase/firestore';

export default function ModelRenderer({ scale }) {
  const [gltf, setGltf] = useState([]);
  const [loadErr, setLoadErr] = useState(false);
  const [version, setVersion] = useState(0);
  const [currVersion, setCurrVersion] = useState(0);
  const [updateCount, setupdateCount] = useState(0);
  const [showUpdate, setShowUpdate] = useState(false);
  const [computedScale, setComputedScale] = useState(50);
  const targetRef = useRef();
  const cameraRef = useRef();
  const canvasRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    setComputedScale(5 * (scale / 100));
  }, [scale]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, '3d-model-data'), (snapshot) => {
      setVersion(snapshot.docs[0].data().version);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (version > currVersion) {
      if (updateCount > 0) {
        setShowUpdate(1);
      }
      setupdateCount(updateCount + 1);
      setCurrVersion(version);
    }
  }, [version]);

  useEffect(() => {
    getDownloadURL(ref(storage, '/model.ply'))
      .then((url) => {
        const loader = new PLYLoader();
        loader.load(url, (gltf) => {
          setGltf(gltf);
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

  function handleRefresh() {
    setShowUpdate(0);
    location.reload();
  }

  return (
    <div style={{ position: 'relative' }}>
      {showUpdate
        ? <div className='button-overlay' ref={mainRef}>
        <button className='reload-model-btn' onClick={handleRefresh}>Odśwież model</button>
        <p>Pojawiła się nowa wersja modelu terenu</p>
      </div>
        : <></>}

      <Canvas camera={{ position: [0, 3, 10], fov: 30 }}
        style={{
          backgroundColor: '#111a21',
          width: '100vw',
          height: '100vh'
        }}
        ref={canvasRef}>
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 20, 10]} angle={0.45} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <mesh ref={targetRef} scale={[computedScale, computedScale, computedScale]} rotation={[0, 0, 0]} position={[0, 0, 0]}>
          <primitive object={gltf} />
          <meshStandardMaterial color={'#AABBCC'} metalness={0.2} vertexColors={true}/>
        </mesh>
        <OrbitControls
          camera={cameraRef.current}
          enableDamping
          dampingFactor={0.5}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>

  );
}
