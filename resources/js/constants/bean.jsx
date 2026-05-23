import MESSAGE from "./message";
import API_URL_CONST from '../constants/apiUrlConst';

/**
 * 共通処理オブジェクト
 */
const Bean = {

    /**
     * APIにアクセス(GET)
     * 
     * @param {string} url APIのURL
     * @returns {Response} レスポンス
     */
    fetchGetApi: async (url) => {
        const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            }
        );
        return response;
    },

    /**
     * APIにアクセス(POST)
     * 
     * @param {string} url APIのURL
     * @param {Object} data データ
     * @returns {Response} レスポンス
     */
    fetchPostApi: async (url, data) => {
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
     * APIにアクセス(POST送信,Fileを含んだデータをHTTP送信する)
     * 
     * @param {string} url APIのURL
     * @param {Object} data データ
     * @returns {Response} レスポンス
     */
    fecthPostFileApi: async (url, data) => {
        const fd = new FormData();
        Bean.appendFormData(fd, data);

        const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                body: fd
            }
            
        );
        return await response;
    },

    /**
     * 
     * @param {FormData} fd フォームデータ
     * @param {mixed} data 対象データ
     * @param {String} parentKey 親キー
     */
    appendFormData: (fd, data, parentKey = '') => {

        Object.keys(data).forEach(key => {

            const value = data[key];

            const formKey = parentKey
                ? `${parentKey}[${key}]`
                : key;

            if (
                typeof value === 'object' &&
                value !== null &&
                !(value instanceof File)
            ) {
                Bean.appendFormData(fd, value, formKey);

            } else {
                fd.append(formKey, value);
            }

        });
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
    postVideoForm: (data) => {

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
                validMesgs = Bean.addValue(validMesgs, 'thumbnail', MESSAGE.POST_VIDEO.THUMBNAIL.FILE.MIMETYPE);
            }
            if(data.thumbnail.name.trim() === "" || data.thumbnail.name === "undefined"
            || data.thumbnail.name.length > 255) {
                validMesgs = Bean.addValue(validMesgs, 'thumbnail', MESSAGE.POST_VIDEO.THUMBNAIL.NAME.REQUIRED);
            }
            if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9._-]+$/u.test(data.thumbnail.name)) {
                validMesgs = Bean.addValue(validMesgs, 'thumbnail', MESSAGE.POST_VIDEO.THUMBNAIL.NAME.CHARTYPE);
            }
        }

        // 動画
        if(data.video.file === "") {
            validMesgs = Bean.addValue(validMesgs, 'video', MESSAGE.POST_VIDEO.VIDEO.FILE.REQUIRED);
        } else {
            if (!data.video.file.type.startsWith('video/')) {
                validMesgs = Bean.addValue(validMesgs, 'video', MESSAGE.POST_VIDEO.VIDEO.FILE.MIMETYPE);
            }
            if(data.video.name.trim() === "" || data.video.name === "undefined"
            || data.video.name.length > 255) {
                validMesgs = Bean.addValue(validMesgs, 'video', MESSAGE.POST_VIDEO.VIDEO.NAME.REQUIRED);
            }
            if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9._-]+$/u.test(data.video.name)) {
                validMesgs = Bean.addValue(validMesgs, 'video', MESSAGE.POST_VIDEO.VIDEO.NAME.CHARTYPE);
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
    },

    /**
     * データがオブジェクトかどうかを判断する
     * 
     * @param {mixed} data 
     * @return {boolean} 
     */
    isObject: (data) => {
        return (
            typeof data === 'object' &&
            data !== null &&
            !Array.isArray(data)
        );
    },

    /**
     * ログインユーザーを取得する
     * 
     * @return {Response}
     */
    // fetchUser: async() => {
    fetchUser: async() => {
        // const response = await fetch(API_URL_CONST.LOGIN_USER, {
        //     credentials: 'include'
        // });
        const response = await Bean.fetchGetApi(API_URL_CONST.LOGIN_USER);
        return response;
    }
    
};

export default Bean;