<?php

namespace App\Constants;

use App\Constants\Message;

class Bean {

    /**
     * レスポンス(成功)
     * 
     * @param mixed $data レスポンスとして渡したいデータ
     * @return String レスポンスとして渡したいデータ、レスポンスコード(200)
     */
    public static function responseSuccess(mixed $data = []) {
        return response()->json($data, 200);
    }

    /**
     * レスポンス(失敗)
     * 
     *  @param string $message エラーメッセージ
     *  @return String エラーメッセージ、レスポンスコード(500)
     */
    public static function responseFailure(string $message = Message::RESPONSE["DEFAULT_ERR_MSG"]) {
        $data = [
            "resErrMsg" => $message,
        ];

        return response()->json($data, 500);
    }
        
}
