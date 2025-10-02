// src/main.tsx
import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';

// adjust paths to your real structure
const Playground = lazy(() => import('./components/Sections/Playground'));
const DemoDetail = lazy(() => import('./components/Sections/Playground')); // we'll create this file

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/demos/:id" element={<DemoDetail />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
