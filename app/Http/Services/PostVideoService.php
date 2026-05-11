<?php

namespace App\Http\Services;

use App\Http\Repositories\VideoRepository;
use App\Constants\Message;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

/**
 * ログイン Service
 */
class PostVideoService extends Service {
    
    /** 動画 Repository */
    private VideoRepository $repository;

    /**
     * コンストラクタ
     */
    public function __construct(VideoRepository $repository) {
        $this->repository = $repository;
    }

    /**
     * 動画投稿
     * 
     * @param array $data 入力情報
     * @return mixed 登録結果(成功：true、失敗：false), 成功：ユーザー情報、失敗：エラーメッセージ
     */
    public function postVideo(array $data) : void {
        try {
            DB::transaction(function() use ($data) {
                $filePath = $data['thumbnail']['file']->storeAs(
                    'videos',
                    $data['thumbnail']['name'],
                    'public'
                );
            });
        } catch(Exception $e) {

        }
    }
}
