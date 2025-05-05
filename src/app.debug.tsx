import React from 'react';
import ReactDOM from 'react-dom/client';
import './app.debug.css';

function App() {
  return <iframe width="100%" height="100%" src="/api/pdf/debug?lng=ru" />;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
