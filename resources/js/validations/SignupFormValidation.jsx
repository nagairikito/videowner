/**
 * ユーザー新規登録フォームバリデーション
 * 
 * @param {Object} data フォームの入力情報
 * @return {Array} バリデーションメッセージ
 */
const signupFormValidation = (data) => {

    // バリデーションメッセージ
    let validMesgs = {};

    // ユーザー名
    if(data.userName.trim() === "" || data.userName === "undefined"
    || data.userName.length > 255) {
        validMesgs = Bean.addValue(validMesgs, 'userName', MESSAGE.SIGNUP.USER_NAME.REQUIRED);
    }
    if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9._-]+$/u.test(data.userName)) {
        validMesgs = Bean.addValue(validMesgs, 'userName', MESSAGE.SIGNUP.USER_NAME.CHARTYPE);
    }

    // ログインID
    if(data.loginId.trim() === "" || data.loginId === "undefined"
    || data.loginId.length < 8 || data.loginId.length > 32) {
        validMesgs = Bean.addValue(validMesgs, 'loginId', MESSAGE.SIGNUP.LOGIN_ID.REQUIRED);
    }
    if(!/^[a-zA-Z0-9._-]+$/.test(data.loginId)) {
        validMesgs = Bean.addValue(validMesgs, 'loginId', MESSAGE.SIGNUP.LOGIN_ID.CHARTYPE);
    }

    //パスワード
    if(data.password.trim() === "" || data.password === "undefined"
    || data.password.length < 8 || data.password.length > 32) {
        validMesgs = Bean.addValue(validMesgs, 'password', MESSAGE.SIGNUP.PASSWORD.REQUIRED);
    }
    if(!/^[a-zA-Z0-9._-]+$/.test(data.password)) {
        validMesgs = Bean.addValue(validMesgs, 'password', MESSAGE.SIGNUP.PASSWORD.CHARTYPE);
    }
    if(data.password !== data.passwordConf) {
        validMesgs = Bean.addValue(validMesgs, 'password', MESSAGE.SIGNUP.PASSWORD.MISMATCH);
    }

    return validMesgs;
}

export default signupFormValidation;
