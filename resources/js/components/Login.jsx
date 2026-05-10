import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { AuthContext } from '../app.jsx';
import API_URL_CONST from '../constants/apiUrlConst.js';
import URL_CONST from '../constants/urlConst.js';
import Bean from '../constants/bean.jsx';

const Login = () => {

    const initialForm = {
        loginId: '',
        password: '',
    }

    const navigate = useNavigate();
    const { loginUserRes, setLoginUserRes } = useContext(AuthContext);
    const isFirstRender = useRef(true);
    const isFirstSubmit = useRef(true);
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
        if(isFirstSubmit.current) {
            isFirstSubmit.current = false;
            return;
        }

        const resultValidMsg = Bean.loginFormValidation(form);
        setValidMsgs(resultValidMsg);
    }, [form]);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(isFirstRender) isFirstRender.current = false;

        //バリデーション
        const resultValidMsg = Bean.loginFormValidation(form);
        if (Object.keys(resultValidMsg).length > 0) {
            setValidMsgs(resultValidMsg);
            return;
        }

        const response = await Bean.fetchApi(API_URL_CONST.LOGIN, form);
        const resResult = await response.json();
        if(response.ok) {
            setLoginUserRes(resResult);
            navigate(URL_CONST.HOME);
        } else {
            // const errorMsg = await response.json();
            setErrMsg(resResult.resErrMsg);
        }
    }


    return(
        <div className="login-form">
            <h2>ログインフォーム</h2>
            <form>
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
                <input type="submit" value="ログイン" onClick={handleSubmit} />
                { errMsg !== "" && (<div>{errMsg}</div>)}
            </form>
            <div>
                <Link to={URL_CONST.SIGNUP}>新規登録はこちら</Link>
            </div>
        </div>
    );
}

export default Login;