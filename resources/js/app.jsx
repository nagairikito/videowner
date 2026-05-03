import './bootstrap';
import React from 'react';
// import ReactDOM from 'react/client'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';

import URL_CONST from './constants/urlConst';
import Bean from './constants/bean';
import Header from './components/common/Header';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

export const AuthContext = createContext();

function App() {
    const [loginUser, setLoginUser] = useState(null);
        console.log(loginUser);
    useEffect(() => {
        const fetchUser = async() => {
            const res = fetch(URL_CONST.LOGIN_USER, {
                credentials: 'include'
            });

            if(res.ok) {
                const resRusult = await res.json();
                setLoginUser(resRusult);
            } else {
                setLoginUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
        <AuthContext.Provider value={{ loginUser, setLoginUser }}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={URL_CONST.HOME} element={<Home />} /> 
                    <Route path={URL_CONST.SIGNUP} element={<Signup />} /> 
                    <Route path={URL_CONST.LOGIN} element={<Login />} /> 
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
        </>
    );
}

const rootElement = document.getElementById("app");
if(rootElement) {
    // const root = ReactDOM.createRoot(rootElement);
    const root = createRoot(rootElement);
    root.render(<App />)
}