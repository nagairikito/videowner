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
        "USER_NONEXISTED" => "このログインIDは登録されていません。",
        "LOGIN_OR_PASSWORD_MISMATCH" => "ログインIDまたはパスワードの入力に誤りがあります。",
        "LOGIN_FAILURE" => "ログインに失敗しました。",
        "LOGIN_SUCCESS" => "ログインしました。",
    ];
        
}
