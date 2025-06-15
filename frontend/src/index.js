import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter} from 'react-router-dom';
import { WalletContextProvider } from './context/WalletContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<div>...</div>}>
            <WalletContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </WalletContextProvider>
        </PersistGate>
    </Provider>
);

// ReactDOM.render(
//     <Provider store={store}>
//         <PersistGate persistor={persistor} loading={<div>...</div>}>
//             <WalletContextProvider>
//                 <BrowserRouter>
//                     <App />
//             </BrowserRouter>
//           </WalletContextProvider>
//         </PersistGate>
//     </Provider>
//     ,
//     document.getElementById('root')
//);