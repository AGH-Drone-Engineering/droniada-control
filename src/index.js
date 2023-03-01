import { IntruderScreen } from 'modules/map-screen/components/Intruder';
import { PipelineScreen } from 'modules/map-screen/components/Pipeline';
import { TreeScreen } from 'modules/map-screen/components/Tree';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/droniada-control">
          <Route index element={<IntruderScreen />}></Route>
          <Route path="intruder" element={<IntruderScreen />} />
          <Route path="pipeline" element={<PipelineScreen />} />
          <Route path="tree" element={<TreeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
