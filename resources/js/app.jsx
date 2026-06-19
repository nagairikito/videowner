import './bootstrap';
import React from 'react';
// import ReactDOM from 'react/client'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';

import API_URL_CONST from './constants/apiUrlConst';
import URL_CONST from './constants/urlConst';
import Bean from './utils/bean';
import Header from './components/common/header/Header';
import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import AuthProtectedRoute from './middleware/AuthProtectedRoute';
import LoadingProtectedRoute from './middleware/LoadingProtectedRoute';
import Profile from './components/profile/Profile';
import VideoContentsList from './components/videoContentsList/VideoContentsList';
import VideoContentsDetail from './components/videoContentsDetail/VideoContentsDetail';
import PostVideo from './components/postVideo/PostVideo';
import EditVideoContents from './components/editVideoContents/EditVideoContents';

export const AuthContext = createContext();

function App() {
    const [loginUserRes, setLoginUserRes] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        Bean.fetchUser()
        .then(async(res) => {
            if(res.ok) {
                const resResult = await res.json();
                setLoginUserRes(resResult);
            } else {
                setLoginUserRes(null);
            }
        })
        .finally(() => {
            setAuthLoading(false);
        });
    }, []);


    return (
        <>
        <AuthContext.Provider value={{ loginUserRes, setLoginUserRes, authLoading, setAuthLoading }}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route element={<LoadingProtectedRoute />}>
                        <Route path={URL_CONST.HOME} element={<Home />} /> {/* ホーム */}
                        <Route path={URL_CONST.SIGNUP} element={<Signup />} /> {/* 新規ユーザー登録 */}
                        <Route path={URL_CONST.LOGIN} element={<Login />} /> {/* ログインフォーム */}
                        <Route path={URL_CONST.PROFILE} element={<Profile />} /> {/* ユーザー詳細 */}
                        <Route path={URL_CONST.VIDEO_CONTENTS_LIST} element={<VideoContentsList />} /> {/* 動画一覧 */}
                        <Route path={URL_CONST.VIDEO_CONTENTS_DETAIL} element={<VideoContentsDetail />} /> {/* 動画詳細 */}

                        {/* ログイン認証時 */}
                        <Route element={<AuthProtectedRoute />}>
                            <Route path={URL_CONST.POST_VIDEO} element={<PostVideo />} /> {/* 動画投稿フォーム */}
                            <Route path={URL_CONST.EDIT_VIDEO_CONTENTS} element={<EditVideoContents />} /> {/* 動画コンテンツ編集フォーム */}
                        </Route>
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