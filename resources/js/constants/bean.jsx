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
        const validMesgs = {};

        // ユーザー名
        if(data.userName.trim() === "" || data.userName === "undefined") {
            validMesgs['userName'] = [
                ...validMesgs['userName'],
                "ユーザー名を入力してください。"
            ]
        }
        if (!/^[\p{Script=Han}\p{Hiragana}\p{Katakana}A-Za-z0-9０-９Ａ-Ｚａ-ｚ]+$/u.test(data.userName)) {
            validMesgs['userName'] = [
                ...validMesgs['userName'],
                "漢字、ひらがな、カタカナ、英数字で入力してください。"
            ]
        }

        // ログインID
        if(data.loginId.trim() === "" || data.loginId === "undefined"
            || data.loginId.length <= 8 || data.loginId.length >= 32) {
            validMesgs['loginId'] = [
                ...validMesgs['loginId'],
                "ログインIDは8文字以上32文字以下で入力してください。"
            ]
        }
        if(!/^[\x21-\x7E]+$/.test(data.loginId)) {
            validMesgs['loginId'] = [
                ...validMesgs['loginId'],
                "ログインIDは半角英数字、記号で入力してください。"
            ]
        }

        //パスワード
        if(data.password.trim() === "" || data.password === "undefined"
            || data.password.length <= 8 || data.password.length >= 32) {
            validMesgs['password'] = [
                ...validMesgs['password'],
                "パスワードは8文字以上32文字以下で入力してください。"
            ]
        }
        if(!/^[\x21-\x7E]+$/.test(data.password)) {
            validMesgs['password'] = [
                ...validMesgs['password'],
                "パスワードは半角英数字、記号で入力してください。"
            ]
        }
        if(data.password !== data.passwordConf) {
            validMesgs['password'] = [
                ...validMesgs['password'],
                "パスワードと確認用パスワードが一致しません。"
            ]
        }

        return validMesgs;
    },
};

export default Bean;