import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";

import API_URL_CONST from '../../constants/apiUrlConst.js';
import URL_CONST from '../../constants/urlConst.js';
import Bean from '../../constants/bean.jsx';

const Signup = () => {

    const initialForm = {
        userName: '',
        loginId: '',
        password: '',
        passwordConf: '',
    }

    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const [form, setForm] = useState(initialForm);
    const [validMsgs, setValidMsgs] = useState({});
    const [errMsg, setErrMsg] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const resultValidMsg = Bean.signupFormValidation(form);
        setValidMsgs(resultValidMsg);
    }, [form]);
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        //バリデーション
        const resultValidMsg = Bean.signupFormValidation(form);
        if (Object.keys(resultValidMsg).length > 0) {
            setValidMsgs(resultValidMsg);
            return;
        }

        const response = await Bean.fetchPostApi(API_URL_CONST.SIGNUP, form);
        if(response.ok) {
            navigate(URL_CONST.LOGIN);
        } else {
            const errorMsg = await response.json();
            setErrMsg(errorMsg.resErrMsg);
        }
    }


    return(
        <div className="signup-form">
            <h2>新規ユーザー登録</h2>
            <form>
                <div className="input-box">
                    <label htmlFor="userName">ユーザー名</label>
                    <input type="text" id="userName" name="userName" onChange={handleChange}/>
                    { (validMsgs.userName?.length > 0) && validMsgs.userName.map((msg, key) => (
                        <div key={key}>{msg}</div>
                    )) }
                </div>
                <div className="input-box">
                    <label htmlFor="loginId">ログインID</label>
                    <input type="text" id="loginId" name="loginId" onChange={handleChange}/>
                    { (validMsgs.loginId?.length > 0) && validMsgs.loginId.map((msg, key) => (
                        <div key={key}>{msg}</div>
                    )) }
                </div>
                <div className="input-box">
                    <label htmlFor="password">パスワード</label>
                    <input type="password" id="password" name="password" onChange={handleChange}/>
                    { (validMsgs.password?.length > 0) && validMsgs.password.map((msg, key) => (
                        <div key={key}>{msg}</div>
                    )) }
                </div>
                <div className="input-box">
                    <label htmlFor="passwordConf">確認用パスワード</label>
                    <input type="password" id="passwordConf" name="passwordConf" onChange={handleChange}/>
                </div>
                <input type="submit" value="登録" onClick={handleSubmit} />
                { errMsg !== "" && (<div>{errMsg}</div>)}
            </form>
            <div>
                <Link to={URL_CONST.LOGIN}>ログインへ</Link>
            </div>
        </div>
    );
}

export default Signup;