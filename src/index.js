import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./App.css"
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import axios from "axios";

// axios.defaults.baseURL = 'https://dev.ndhm.gov.in/gateway/v0.5/';
// axios.defaults.baseURL = 'https://healthidsbx.abdm.gov.in/api/v1/registration/mobile';
axios.defaults.baseURL = 'https://21cmt70vqd.execute-api.ap-south-1.amazonaws.com/Prod';
// "proxy":"https://21cmt70vqd.execute-api.ap-south-1.amazonaws.com/Prod",



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <App />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
