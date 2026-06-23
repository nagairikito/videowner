import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../app';
import URL_CONST from '../../constants/urlConst.js';
import API_URL_CONST from '../../constants/apiUrlConst.js';
import Bean from '../../utils/bean.jsx';

const Profile = () => {
    const { loginUserRes, setLoginUserRes, fetchUser } = useContext(AuthContext);
    const [searchParam] = useSearchParams();
    const userId = searchParam.get('id');
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState({})
    const [profile, setProfile] = useState({});

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

    return (
        <>
            {loginUserRes != null && 
                loginUserRes != [] && 
                loginUserRes?.loginUser?.id == userId &&
                <button onClick={logout}>ログアウト</button>
            }

            <h2>動画一覧</h2>
            <div className="video-contents-list">
                {profile?.videoContentsList?.length > 0 && 
                    profile.videoContentsList.map((contents, key) => (
                        <div className="video-contents" key={key}>
                            <Link to={URL_CONST.VIDEO_CONTENTS_DETAIL + "?id=" + contents.videoContentsId}>
                                <img src={contents.thumbnailPath} />
                                <p>{contents.title}</p>
                            </Link>
                            <Link to={URL_CONST.EDIT_VIDEO_CONTENTS + "?id=" + contents.videoContentsId}>
                                <p>編集</p>
                            </Link>
                            <button onClick={() => deleteVideoContents(contents.videoContentsId)}>削除</button>
                        </div>
                    ))
                }
            </div>

        </>
    );
}

export default Profile;