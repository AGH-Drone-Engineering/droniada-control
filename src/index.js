import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from 'modules/root';
import IntruderScreen from 'modules/intruder';
import PipelineScreen from 'modules/pipeline';
import TreeScreen from 'modules/tree';
import AdminScreen from 'modules/admin';
import DemoScreen from 'modules/demo';

import './index.css';

const router = createBrowserRouter([
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
  },
  {
    path: '/admin',
    element: <AdminScreen />
  },
  {
    path: '/demo',
    element: <DemoScreen />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
