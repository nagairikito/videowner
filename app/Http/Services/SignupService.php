<?php

namespace App\Http\Services;

use App\Http\Repositories\UserRepository;

/**
 * 新規ユーザー登録 Service
 */
class SignupService extends Service {
    
    /** 新規ユーザー登録 Repository */
    private UserRepository $repository;

    /**
     * コンストラクタ
     */
    public function __construct(UserRepository $repository) {
        $this->$repository = $repository;
    }

    /**
     * 新規ユーザー登録
     * 
     * @param $data 入力情報
     * @return 
     */
    public function signup($data) {

        $result = $this->repository->signup($data);
    }
}
