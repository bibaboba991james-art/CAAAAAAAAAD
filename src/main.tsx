import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './i18n';
import { initializeEmailJS } from './services/emailService';

// Initialize language from localStorage
const savedLanguage = localStorage.getItem('language');
if (savedLanguage) {
  import('./i18n').then(({ default: i18n }) => {
    i18n.changeLanguage(savedLanguage);
  });
}

// Initialize EmailJS
initializeEmailJS();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);