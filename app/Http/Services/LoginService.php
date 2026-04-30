<?php

namespace App\Http\Services;

use App\Http\Repositories\UserRepository;
use App\Constants\Message;

/**
 * 新規ユーザー登録 Service
 */
class LoginService extends Service {
    
    /** 新規ユーザー登録 Repository */
    private UserRepository $repository;

    /**
     * コンストラクタ
     */
    public function __construct(UserRepository $repository) {
        $this->repository = $repository;
    }

    /**
     * 新規ユーザー登録
     * 
     * @param $data 入力情報
     * @return array 登録結果(成功：true、失敗：false), 成功：空文字、失敗：エラーメッセージ
     */
    public function login($data) {

        return [true, ""];
    }
}
