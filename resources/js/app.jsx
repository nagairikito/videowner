import './bootstrap';
import React from 'react';
// import ReactDOM from 'react/client'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import URL_CONST from './constants/urlConst';
import Header from './components/common/Header';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
    return (
        <>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={URL_CONST.HOME} element={<Home />} /> 
                <Route path={URL_CONST.SIGNUP} element={<Signup />} /> 
                <Route path={URL_CONST.LOGIN} element={<Login />} /> 
            </Routes>
        </BrowserRouter>
        </>
    );
}

const rootElement = document.getElementById("app");
if(rootElement) {
    // const root = ReactDOM.createRoot(rootElement);
    const root = createRoot(rootElement);
    root.render(<App />)
}