import './bootstrap';
import React from 'react';
// import ReactDOM from 'react/client'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';

import API_URL_CONST from './constants/apiUrlConst';
import URL_CONST from './constants/urlConst';
import Bean from './constants/bean';
import Header from './components/common/header/Header';
import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import ProtectedRoute from './middleware/ProtectedRoute';
import Profile from './components/profile/Profile';
import PostVideo from './components/postVideo/PostVideo';
import PostVideo from './components/videoList/VideoList';

export const AuthContext = createContext();

function App() {
    const [loginUserRes, setLoginUserRes] = useState(null);

    useEffect(() => {
        Bean.fetchUser()
        .then(async(res) => {
            if(res.ok) {
                const resResult = await res.json();
                setLoginUserRes(resResult);
            } else {
                setLoginUserRes(null);
            }
        });
    }, []);


    return (
        <>
        <AuthContext.Provider value={{ loginUserRes, setLoginUserRes }}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={URL_CONST.HOME} element={<Home />} /> {/* ホーム */}
                    <Route path={URL_CONST.SIGNUP} element={<Signup />} /> {/* 新規ユーザー登録 */}
                    <Route path={URL_CONST.LOGIN} element={<Login />} /> {/* ログインフォーム */}
                    <Route path={URL_CONST.PROFILE} element={<Profile />} /> {/* ユーザー詳細 */}
                    <Route path={URL_CONST.VIDEO_LIST} element={<VideoList />} /> {/* 動画一覧 */}

                    {/* ログイン認証時 */}
                    <Route element={<ProtectedRoute />}>
                        <Route path={URL_CONST.POST_VIDEO} element={<PostVideo />} /> {/* 動画投稿フォーム */}
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