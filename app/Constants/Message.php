<?php

namespace App\Constants;

class Message {

    // レスポンス
    const RESPONSE = [
        "DEFAULT_ERR_MSG" => "エラーが発生しました。",
        "NO_AUTH_MSG" => "ログイン認証の確認ができません。",
    ];

    // 新規ユーザー登録
    const SIGNUP = [
        "ALREADY_USER_EXISTED" => "このログインIDは既に別のアカウントで使用されています。",
        "SIGNUP_FAILURE" => "ユーザー登録に失敗しました。",
        "SIGNUP_SUCCESS" => "ユーザー登録が完了しました。",
    ];

    // ログイン
    const LOGIN = [
        "LOGIN_OR_PASSWORD_MISMATCH" => "ログインIDまたはパスワードの入力に誤りがあります。",
        "LOGIN_FAILURE" => "ログインに失敗しました。",
        "LOGIN_SUCCESS" => "ログインしました。",
        "USER_NONEXISTED" => "このログインIDは登録されていません。",
    ];
        
    // ログアウト
    const LOGOUT = [
        "LOGOUT_SUCCESS" => "ログアウトしました。",
        "UNAUTHRISED_ACCESS" => "不正なアクセスを検知したため、強制ログアウトします。",
    ];

    // 動画コンテンツ
    const VIDEO_CONTENTS_DETAIL = [
        "GET_FAIL" => "コンテンツの取得に失敗しました。",
    ];
        
    // 動画コンテンツ削除
    const DELETE_VIDEO_CONTENTS = [
        "NOT_FOUND_VIDEO_CONTENTS" => "コンテンツの取得に失敗しました。",
        "MISMATCH_USER_ID" => "投稿者でないユーザーからの不正アクセスを検知しました。",
        "DELETE_FAIL" => "対象のコンテンツの削除に失敗しました。",
        "DELETE_SUCCESS" => "対象のコンテンツを削除しました。",
    ];
        
}
