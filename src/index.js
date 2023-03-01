import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import Root from 'modules/root';
import IntruderScreen from 'modules/intruder';
import PipelineScreen from 'modules/pipeline';
import TreeScreen from 'modules/tree';

import './index.css';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/intruder',
    element: <IntruderScreen />
  },
  {
    path: '/pipeline',
    element: <PipelineScreen />
  },
  {
    path: '/tree',
    element: <TreeScreen />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
