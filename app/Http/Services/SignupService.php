<?php

namespace App\Http\Services;

use App\Http\Repositories\UserRepository;
use App\Constants\ErrorMessage;

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
        $this->repository = $repository;
    }

    /**
     * 新規ユーザー登録
     * 
     * @param $data 入力情報
     * @return array 登録結果(成功：true、失敗：false), 成功：空文字、失敗：エラーメッセージ
     */
    public function signup($data) {

        $userOpt = $this->repository->getUserByLoginId($data['loginId']);
        if($userOpt != null) {
            return [false, ErrorMessage::SIGNUP["ALREADY_USER_EXISTED"]];
        }

        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

        $result = $this->repository->signup($data);
        if(!$result) {
            return [false, ErrorMessage::SIGNUP["SIGNUP_FAILURE"]];
        }

        return [true, ""];
    }
}
