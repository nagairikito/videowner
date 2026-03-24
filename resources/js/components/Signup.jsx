import { useState } from 'react';

import { API_URL_CONST } from 'constants/apiUrlConst.js';
import { URL_CONST } from 'constants/urlConst.js';

const Signup = () => {

    const initialForm = {
        userName: '',
        loginId: '',
        password: '',
        passwordConf: '',
    }

    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        //バリデーション

        const response = await fetchApi(API_URL_CONST.SIGNUP, form);
        if(response.ok) {

        } else {

        }


    }

    const fetchApi = (url, data) => {
        const response = fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )

        return response;
    }

    return(
        <div className="signup-form">
            <form>
                <div className="input-box">
                    <label htmlFor="userName">ユーザー名</label>
                    <input type="text" name="userName" onChange={handleChange}/>
                </div>
                <div className="input-box">
                    <label htmlFor="loginId">ログインID</label>
                    <input type="text" name="loginId" onChange={handleChange}/>
                </div>
                <div className="input-box">
                    <label htmlFor="password">パスワード</label>
                    <input type="password" name="password" onChange={handleChange}/>
                </div>
                <div className="input-box">
                    <label htmlFor="passwordConf">確認用パスワード</label>
                    <input type="password" name="passwordConf" onChange={handleChange}/>
                </div>
                <input type="submit" value="登録" onClick={handleSubmit} />
            </form>
            <div>
                <a href={URL_CONST.LOGIN}>ログインへ</a>
            </div>
        </div>
    );
}

export default Signup;