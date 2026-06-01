const API_URL_CONST = {

    // ログインユーザー取得
    LOGIN_USER: '/api/loginuser',

    // 新規ユーザー登録
    SIGNUP: '/api/signup',

    // ログイン
    LOGIN: '/api/login',

    // ログアウト
    LOGOUT: '/api/logout',

    // 動画リスト
    VIDEO_CONTENTS_LIST: '/api/video_contents_list',

    // 動画詳細
    VIDEO_DETAIL: (id) => `/api/video?id=${id}`,

    // 動画投稿
    POST_VIDEO: '/api/post_video',

}

export default API_URL_CONST;