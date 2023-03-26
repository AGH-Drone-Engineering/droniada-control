import React from 'react';
import useAppConfig from 'logic/FirebaseAppConfig';

export default function DemoScreen() {
  const [config] = useAppConfig();
  return (
    <div className='system-demo'>
      <h1>Demo systemu</h1>
      <iframe src={config.demo_video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  );
}
