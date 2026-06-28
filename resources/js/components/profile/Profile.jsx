import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../app';
import URL_CONST from '../../constants/urlConst.js';
import API_URL_CONST from '../../constants/apiUrlConst.js';
import Bean from '../../utils/bean.jsx';
import VideoContentsListParts from '../videoContentsListParts/VideoContentsListParts.jsx';
import Loading from '../loading/Loading.jsx';

const Profile = () => {
    const { loginUserRes, setLoginUserRes, fetchUser } = useContext(AuthContext);
    const [searchParam] = useSearchParams();
    const userId = searchParam.get('id');
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState({})
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfile();
    }, []);

    const logout = async(e) => {
        e.preventDefault();

        const response = await Bean.fetchPostApi(API_URL_CONST.LOGOUT);
        if(response.ok) {
            const user = await Bean.fetchUser;
            setLoginUserRes(user);
            navigate(URL_CONST.HOME);
        } else {
            resErrMsg = await response.json();
            setErrMsg(resErrMsg);
            navigate(URL_CONST.HOME);
        }
    }

    const getProfile = () => {
        Bean.fetchGetApi(API_URL_CONST.PROFILE(userId))
        .then(async (res) => {
            if(res.ok) {
                const resResult = await res.json();
                setProfile(resResult);
            } else {
                const resResult = await res.json();
                setErrMsg(resResult);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    }

    const deleteVideoContents = (videoContentsId) => {

        if(userId != loginUserRes?.loginUser.id) return;

        let data = {'videoContentsId': videoContentsId};

        Bean.fetchPostApi(API_URL_CONST.DELETE_VIDEO_CONTENTS, data)
        .then(async (res) => {
            if(res.ok) {
                getProfile();
                return;
            } else {
                setErrMsg(await res.json())
            }
        });
    }

    if(loading) {
        return (
            <Loading />
        );
    }

    return (
        <>
            {loginUserRes != null && 
                loginUserRes != [] && 
                loginUserRes?.loginUser?.id == userId &&
                <button onClick={logout}>ログアウト</button>
            }

            <h2>動画一覧</h2>
            <VideoContentsListParts 
                list={profile?.videoContentsList}
                deleteVideoContents={deleteVideoContents}
                loginUserRes={loginUserRes}
            />
        </>
    );
}

export default Profile;