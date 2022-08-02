import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import reportWebVitals from './reportWebVitals';
import StoreApp from './StoreApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <StoreApp />
        </Provider>
    </React.StrictMode>
);
reportWebVitals();
