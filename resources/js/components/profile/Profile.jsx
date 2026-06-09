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
    const [profile, setprofile] = useState({});

    useEffect(() => {
        Bean.fetchGetApi(API_URL_CONST.PROFILE(userId))
        .then(async (res) => {
            // const resResult = await res.json();
            // if(res.ok) {
            //     setprofile(resResult);
            // } else {
            //     setErrMsg(resResult);
            // }
            if(res.ok) {
                const resResult = await res.json();
                console.log(resResult)
                setprofile(resResult);
            } else {
                const resResult = await res.json();
                setErrMsg(resResult);
            }
        })
    }, []);

    const handleSubmit = async(e) => {
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

    return (
        <>
            {loginUserRes != null && 
                loginUserRes != [] && 
                loginUserRes?.loginUser?.id == userId &&
                <button onClick={handleSubmit}>ログアウト</button>
            }

            <h2>動画一覧</h2>
            <div className="video-contents-list">
                {profile?.videoContentsList?.length > 0 && 
                    profile.videoContentsList.map((contents, key) => (
                        <div className="video-contents" key={key}>
                            <Link to={URL_CONST.VIDEO_CONTENTS_DETAIL + "?id=" + contents.videoId}>
                                <img src={contents.thumbnailPath} />
                                <p>{contents.title}</p>
                            </Link>
                        </div>
                    ))
                }
            </div>

        </>
    );
}

export default Profile;