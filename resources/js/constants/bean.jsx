/**
 * 共通処理オブジェクト
 */
const Bean = {

    /**
     * APIにアクセス
     * 
     * @param {string} url APIのURL
     * @param {Object} data データ
     * @returns {Object} レスポンス
     */
    fetchApi: async (url, data) => {
        const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        return response;
    },

    /**
     * ユーザー新規登録フォームバリデーション
     * 
     * @param {Object} data フォームの入力情報
     * @return {Array} バリデーションメッセージ
     */
    signupFormValidation: (data) => {

        // バリデーションメッセージ
        let validMesgs = {};

        // ユーザー名
        if(data.userName.trim() === "" || data.userName === "undefined"
        || data.userName.length > 255) {
            validMesgs = Bean.addValue(validMesgs, 'userName', 'ユーザー名は255文字以下で入力してください。');
        }
        if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9._-]+$/u.test(data.userName)) {
            validMesgs = Bean.addValue(validMesgs, 'userName', '漢字、ひらがな、カタカナ、英数字、記号（「.」「_」「-」）で入力してください。');
        }

        // ログインID
        if(data.loginId.trim() === "" || data.loginId === "undefined"
        || data.loginId.length < 8 || data.loginId.length > 32) {
            validMesgs = Bean.addValue(validMesgs, 'loginId', 'ログインIDは8文字以上32文字以下で入力してください。');
        }
        if(!/^[\x21-\x7E]+$/.test(data.loginId)) {
            validMesgs = Bean.addValue(validMesgs, 'loginId', 'ログインIDは半角英数字、記号で入力してください。');
        }

        //パスワード
        if(data.password.trim() === "" || data.password === "undefined"
        || data.password.length < 8 || data.password.length > 32) {
            validMesgs = Bean.addValue(validMesgs, 'password', 'パスワードは8文字以上32文字以下で入力してください。');
        }
        if(!/^[\x21-\x7E]+$/.test(data.password)) {
            validMesgs = Bean.addValue(validMesgs, 'password', 'パスワードは半角英数字、記号で入力してください。');
        }
        if(data.password !== data.passwordConf) {
            validMesgs = Bean.addValue(validMesgs, 'password', 'パスワードと確認用パスワードが一致しません。');
        }

        return validMesgs;
    },

    /**
     * 連想配列内に特定のキー名が存在しなければ「key名:[]」を作成し引数の値を配列内に代入する、キー名が存在していれば、特定のキー名の配列に値を代入する
     * 
     * @param {Object} obj オブジェクト
     * @param {string} key キー名
     * @param {string} value 値
     * @return {Object} 特定のキー名の配列に値を詰めたオブジェクト
     */
    addValue: (obj, key, value) => {
        (obj[key] ??= []).push(value);
        return obj;
    }
};

export default Bean;