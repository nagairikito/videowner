const API_URL_CONST = {

    // ログインユーザー取得
    LOGIN_USER: '/api/loginuser',

    // 新規ユーザー登録
    SIGNUP: '/api/signup',

    // ログイン
    LOGIN: '/api/login',

    // ログアウト
    LOGOUT: '/api/logout',

    // プロフィール
    PROFILE: (id) => `/api/profile?user_id=${id}`,

    // 動画リスト
    VIDEO_CONTENTS_LIST: '/api/video_contents_list',

    // 動画詳細
    VIDEO_CONTENTS_DETAIL: (id) => `/api/video?id=${id}`,

    // 動画投稿
    POST_VIDEO: '/api/post_video',

    // 動画コンテンツ編集
    EDIT_VIDEO_CONTENTS: '/api/edit_video_contents',

    // 動画コンテンツ削除
    DELETE_VIDEO_CONTENTS: '/api/delete_video_contents',

}

export default API_URL_CONST;