import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import backgroundImage from './bg.jpeg';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // You can try 'contain' or other values
        backgroundPosition: 'center center', // Adjust this for positioning
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundAttachment: 'fixed',
      }}>
        <App />      
    </div>
  </React.StrictMode>
);

reportWebVitals();