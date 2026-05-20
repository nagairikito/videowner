<?php

namespace App\Constants;

use App\Constants\Message;
use Illuminate\Http\UploadedFile;

class Bean {

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
