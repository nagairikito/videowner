<?php

namespace App\Helpers;

use App\Constants\Message;

class ResponseHelper {

    /**
     * レスポンス(成功)
     * 
     * @param mixed $data レスポンスとして渡したいデータ
     * @return Object レスポンスとして渡したいデータ、レスポンスコード(200)
     */
    public static function responseSuccess(mixed $data = []) {
        return response()->json($data, 200);
    }

    /**
     * レスポンス(失敗)
     * 
     *  @param string $message エラーメッセージ
     *  @return Object エラーメッセージ、レスポンスコード(500)
     */
    public static function responseFailure(string $message = Message::RESPONSE["DEFAULT_ERR_MSG"]) {
        $data = [
            "resErrMsg" => $message,
        ];

        return response()->json($data, 500);
    }

    /**
     * レスポンス(認証なし)
     * 
     *  @param string $message エラーメッセージ
     *  @return Object エラーメッセージ、レスポンスコード(401)
     */
    public static function responseNoAuth(string $message = Message::RESPONSE["NO_AUTH_MSG"]) {
        $data = [
            "resErrMsg" => $message,
        ];

        return response()->json($data, 401);
    }
        
}
