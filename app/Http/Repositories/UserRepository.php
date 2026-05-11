<?php

namespace App\Http\Repositories;

use App\Models\User;

/**
 * 新規ユーザー登録 Repository
 */
class UserRepository extends Repository {

    /** ユーザーテーブル Model */
    private User $repository;
    
    /**
     * コンストラクタ
     */
    public function __construct(User $repository) {
        $this->repository = $repository;
    }

    /**
     * ログインIDによるユーザー単体取得
     * 
     * @param string $loginId ログインID
     * @return User|null ユーザー情報、存在しない場合はnull 
     */
    public function getUserByLoginId(string $loginId) : ?User {
        $user = $this->repository->where('login_id', $loginId)->first();

        return $user;
    }

    /**
     * ユーザー登録処理
     * 
     * @param array $data 入力情報
     * @return bool 登録結果（成功ならtrue、失敗ならfalse）
     */
    public function signup(array $data) : bool {
        $this->repository->user_name = $data['userName'];
        $this->repository->login_id = $data['loginId'];
        $this->repository->password = $data['password'];

        return $this->repository->save();
    }
}
