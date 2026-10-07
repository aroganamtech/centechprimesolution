import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import App from './App';
import './styles/index.css';
// reducedMotion="user": transform animations are disabled for users who prefer reduced motion; content still appears.
createRoot(document.getElementById('root')).render(<StrictMode><BrowserRouter><MotionConfig reducedMotion="user"><App /></MotionConfig></BrowserRouter></StrictMode>);
