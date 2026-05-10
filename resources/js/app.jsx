import './bootstrap';
import React from 'react';
// import ReactDOM from 'react/client'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';

import API_URL_CONST from './constants/apiUrlConst';
import URL_CONST from './constants/urlConst';
import Bean from './constants/bean';
import Header from './components/common/Header';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import PostMovie from './components/PostMovie';
import ProtectedRoute from './middleware/ProtectedRoute';

export const AuthContext = createContext();

function App() {
    const [loginUserRes, setLoginUserRes] = useState(null);

    useEffect(() => {
        const fetchUser = async() => {
            const res = await fetch(API_URL_CONST.LOGIN_USER, {
                credentials: 'include'
            });

            if(res.ok) {
                const resRusult = await res.json();
                setLoginUserRes(resRusult);
            } else {
                setLoginUserRes(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
        <AuthContext.Provider value={{ loginUserRes, setLoginUserRes }}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={URL_CONST.HOME} element={<Home />} />
                    <Route path={URL_CONST.SIGNUP} element={<Signup />} />
                    <Route path={URL_CONST.LOGIN} element={<Login />} />

                    {/* ログイン認証時 */}
                    <Route element={<ProtectedRoute />}>
                        <Route path={URL_CONST.POST_MOVIE} element={<PostMovie />} />
                    </Route>
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