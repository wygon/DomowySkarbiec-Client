import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <- DODAJ TO
import './index.css';
import App from './App.tsx';
import { LoginProvider } from './context/LoginContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <div className='custom-container'>
          <App />
        </div>
      </LoginProvider>
    </BrowserRouter>
  </StrictMode>
);
