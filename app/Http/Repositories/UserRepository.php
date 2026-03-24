<?php

namespace App\Http\Repositories;

use App\Models\User;

/**
 * 新規ユーザー登録 Repository
 */
class UserRepository extends Repository {

    /** ユーザーテーブル Model */
    private User $user;
    
    /**
     * コンストラクタ
     */
    function __construct(User $user) {
        $this->user = $user;
    }

    /**
     * ログインIDによるユーザー単体取得
     * 
     * @param string $loginId ログインID
     * @return User|null ユーザー情報、存在しない場合はnull 
     */
    public function getUserByLoginId(string $loginId) : ?User {
        $user = $this->user->where('login_id', $loginId)->first();

        return $user;
    }

    /**
     * ユーザー登録処理
     * 
     * @param $data 入力情報
     * @return bool 登録結果（成功ならtrue、失敗ならfalse）
     */
    public function signup($data) : bool {
        $this->user->user_name = $data['userName'];
        $this->user->login_id = $data['loginId'];
        $this->user->password = $data['password'];

        return $this->user->save();
    }
}
