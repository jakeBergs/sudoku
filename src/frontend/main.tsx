import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));

const root = ReactDOM.createRoot(document.getElementById("root")!); // ✅ Use createRoot
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);