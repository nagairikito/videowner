<?php

namespace App\Constants;

use App\Constants\Message;
use Illuminate\Http\UploadedFile;

class Bean {

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
     *  @return Object エラーメッセージ、レスポンスコード(500)
     */
    public static function responseNoAuth(string $message = Message::RESPONSE["NO_AUTH_MSG"]) {
        $data = [
            "resErrMsg" => $message,
        ];

        return response()->json($data, 401);
    }

    /**
     * 名前を付けてストレージにファイルを保存する
     * 
     * @param UploadedFile $file ファイル
     * @param string $tagetFolder ファイルの保存先
     * @param string $fileName ファイル名
     * @return string $resultFilePath 登録完了後のファイルパス
     */
    public static function storeNamedFileToStorage(UploadedFile $file, string $tagetFolder, string $fileName) {
        $result = $file->storeAs(
            $tagetFolder,
            $fileName,
            'public'
        );
        return $result;
    }
        
}
