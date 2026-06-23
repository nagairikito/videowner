<?php

namespace App\Constants;

class UrlConst {

    // ログインユーザー取得
    const LOGIN_USER = "/loginuser";

    // 新規ユーザー登録
    const SIGNUP = "/signup";

    // ログイン
    const LOGIN = "/login";

    // ログアウト
    const LOGOUT = "/logout";

    // 動画リスト
    const VIDEO_CONTENTS_LIST = "/video_contents_list";

    // 動画リスト
    const PROFILE = "/profile";
        
    // 動画詳細
    const VIDEO_CONTENTS_DETAIL = '/video';
        
    // 動画投稿
    const POST_VIDEO = "/post_video";
        
    // 動画コンテンツ編集
    const EDIT_VIDEO_CONTENTS = "/edit_video_contents";
        
    // 動画コンテンツ削除
    const DELETE_VIDEO_CONTENTS = "/delete_video_contents";
        
}
