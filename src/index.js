import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntruderScreen } from 'modules/intruder';
import { PipelineScreen } from 'modules/pipeline';
import { TreeScreen } from 'modules/tree';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/droniada-control">
      <Routes>
        <Route path="intruder" element={<IntruderScreen />} />
        <Route path="pipeline" element={<PipelineScreen />} />
        <Route path="tree" element={<TreeScreen />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
