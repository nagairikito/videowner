import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../app';
import URL_CONST from '../../constants/urlConst.js';
import API_URL_CONST from '../../constants/apiUrlConst.js';
import Bean from '../../constants/bean.jsx';

const Profile = () => {
    const { loginUserRes, setLoginUserRes,fetchUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState({})

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
            <button onClick={handleSubmit}>ログアウト</button>
        </>
    );
}

export default Profile;