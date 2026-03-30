<?php

namespace App\Constants;

class Bean {

    /**
     * 新規ユーザー登録レスポンス(成功)
     * 
     * @param mixed $data レスポンスとして渡したいデータ
     * @return Response レスポンスとして渡したいデータ、レスポンスコード(200)
     */
    public static function responseSuccess(mixed $data = []) {
        return response()->json($data);
    }

    /**
     * 新規ユーザー登録レスポンス(失敗)
     * 
     *  @param string $message エラーメッセージ
     *  @return Response エラーメッセージ、レスポンスコード(500)
     */
    public static function responseFailure(string $message = "") {
        $data = [
            "resErrMsg" => $message,
        ];

        return response()->json($data, 500);
    }
        
}
