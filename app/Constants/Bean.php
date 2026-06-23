<?php

namespace App\Constants;

use App\Constants\Message;
use Illuminate\Http\UploadedFile;

class Bean {

    /**
     * 特定の文字列から対象の文字列を取得
     * 
     * @param string $word 対象の文字列
     * @param string $target 特定の文字列
     * @param int|null $count 文字数
     * @return string $result
     */
    public static function getWordFromTarget(string $word, string $target, ?int $count = null) : string {
        $pos = strpos($target, $word);    
        return $count != null ? substr($target, $pos, $count) : substr($target, $pos);
    }
        
    /**
     * ランダムな英数字を生成
     * 
     * @param int $min 特定の文字列
     * @param int $max 文字数
     * @return string $str_r
     */
    public static function generateAlphanumeric(int $min = 8, int $max = 8) : string {
        $str = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPUQRSTUVWXYZ';
        $str_r = substr(
        str_shuffle($str), $min, $max);

        return $str_r;
    }
}
