import { useState } from 'react';

import { API_URL_CONST } from 'constants/apiUrlConst.js';
import { URL_CONST } from 'constants/urlConst.js';

const Login = () => {

    const initialForm = {
        loginId: '',
        password: '',
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

        const response = await fetchApi(API_URL_CONST.LOGIN, form);
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
        <div className="login-form">
            <form>
                <div className="input-box">
                    <label htmlFor="loginId">ログインID</label>
                    <input type="text" name="loginId" onChange={handleChange}/>
                </div>
                <div className="input-box">
                    <label htmlFor="password">パスワード</label>
                    <input type="password" name="password" onChange={handleChange}/>
                </div>
                <input type="submit" value="ログイン" onClick={handleSubmit} />
            </form>
            <div>
                <a href={URL_CONST.SIGNUP}>新規ユーザー登録へ</a>
            </div>
        </div>
    );
}

export default Signup;