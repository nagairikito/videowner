<?php

namespace App\Helpers;

use App\Constants\Message;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class StorageHelper {

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

    /**
     * ファイルの削除
     * 
     * @param string $filePath ファイルパス
     * @param string $folder フォルダ
     */
    public static function deleteFileFromStorage(string $filePath, string $folder = 'public') : bool {
        $result = false;
        if(StorageHelper::existsFileOnStorage($filePath, $folder)) {
            $result = Storage::disk($folder)->delete($filePath);
        }
        return $result;
    }
        
    /**
     * ファイルの存在確認
     * 
     * @param string $filePath ファイルパス
     * @param string $folder フォルダ
     * @return bool
     */
    public static function existsFileOnStorage(string $filePath, string $folder = 'public') : bool {
        return Storage::disk($folder)->exists($filePath) ? true : false;
    }
        
}
