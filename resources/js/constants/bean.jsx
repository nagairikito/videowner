import MESSAGE from "./message";

/**
 * 共通処理オブジェクト
 */
const Bean = {

    /**
     * APIにアクセス(POST)
     * 
     * @param {string} url APIのURL
     * @param {Object} data データ
     * @returns {Object} レスポンス
     */
    fetchApi: async (url, data) => {
        const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        return response;
    },

    /**
     * APIにアクセス(GET)
     * 
     * @param {string} url APIのURL
     * @param {Object} data データ
     * @returns {Object} レスポンス
     */
    getFetchApi: async (url) => {
        const response = await fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return await response.json();
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
    },

    /**
     * ログインフォームバリデーション
     * 
     * @param {Object} data フォームの入力情報
     * @return {Array} バリデーションメッセージ
     */
    loginFormValidation: (data) => {

        // バリデーションメッセージ
        let validMesgs = {};

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

        return validMesgs;
    },

    /**
     * 動画投稿フォームバリデーション
     * 
     * @param {Object} data フォームの入力情報
     * @return {Array} バリデーションメッセージ
     */
    postMovieForm: (data) => {

        // バリデーションメッセージ
        let validMesgs = {};

        // タイトル
        if(data.title.trim() === "" || data.title === "undefined"
        || data.title.length > 255) {
            validMesgs = Bean.addValue(validMesgs, 'title', MESSAGE.SIGNUP.USER_NAME.REQUIRED);
        }
        if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9._-]+$/u.test(data.title)) {
            validMesgs = Bean.addValue(validMesgs, 'title', MESSAGE.SIGNUP.USER_NAME.CHARTYPE);
        }

        // サムネイル
        if(data.thumbnail.file !== "") {
            if (!data.thumbnail.file.type.startsWith('image/')) {
                validMesgs = Bean.addValue(validMesgs, 'thumbnail', MESSAGE.POST_MOVIE.THUMBNAIL.FILE.MIMETYPE);
            }
            if(data.thumbnail.name.trim() === "" || data.thumbnail.name === "undefined"
            || data.thumbnail.name.length > 255) {
                validMesgs = Bean.addValue(validMesgs, 'thumbnail', MESSAGE.POST_MOVIE.THUMBNAIL.NAME.REQUIRED);
            }
            if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9._-]+$/u.test(data.thumbnail.name)) {
                validMesgs = Bean.addValue(validMesgs, 'thumbnail', MESSAGE.POST_MOVIE.THUMBNAIL.NAME.CHARTYPE);
            }
        }

        // コンテンツ
        if(data.contents.file === "") {
            validMesgs = Bean.addValue(validMesgs, 'contents', MESSAGE.POST_MOVIE.CONTENTS.FILE.REQUIRED);
        } else {
            if (!data.contents.file.type.startsWith('image/')) {
                validMesgs = Bean.addValue(validMesgs, 'contents', MESSAGE.POST_MOVIE.CONTENTS.FILE.MIMETYPE);
            }
            if(data.contents.name.trim() === "" || data.contents.name === "undefined"
            || data.contents.name.length > 255) {
                validMesgs = Bean.addValue(validMesgs, 'contents', MESSAGE.POST_MOVIE.CONTENTS.NAME.REQUIRED);
            }
            if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9._-]+$/u.test(data.contents.name)) {
                validMesgs = Bean.addValue(validMesgs, 'contents', MESSAGE.POST_MOVIE.CONTENTS.NAME.CHARTYPE);
            }
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