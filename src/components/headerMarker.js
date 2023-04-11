import React from 'react';

export default function HeaderMarker({ condition }) {
  return (
    <>
    {condition && <span style={{ color: 'red' }}>(!)</span>}
    </>
  );
}
