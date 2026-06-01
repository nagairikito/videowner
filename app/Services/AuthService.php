<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\Constants\Message;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

/**
 * 認証 Service
 */
class AuthService extends Service {
    
    /** ユーザー Repository */
    private UserRepository $repository;

    /**
     * コンストラクタ
     */
    public function __construct(UserRepository $repository) {
        $this->repository = $repository;
    }

    /**
     * ログイン
     * 
     * @param array $data 入力情報
     * @return array 登録結果(成功：true、失敗：false), 成功：ユーザー情報、失敗：エラーメッセージ
     */
    public function login(array $data) : array {
        $userOpt = $this->repository->getUserByLoginId($data['loginId']);
        if($userOpt == null) {
            return [false, Message::LOGIN["USER_NONEXISTED"]];
        }

        $credentials = [
            'login_id' => $data['loginId'],
            'password' => $data['password'],
        ];
        
        if(!Auth::attempt($credentials)) {
            return [false, Message::LOGIN["LOGIN_FAILURE"]];
        }

        $data['request']->session()->regenerate();

        $exportData = [
            'message' => Message::LOGIN["LOGIN_SUCCESS"],
            'loginUser' => [
                'userName' => Auth::user()->user_name,
                'loginId' => Auth::user()->login_id,
            ],
        ];

        return [true, $exportData];
    }

    /**
     * ログアウト
     * @param array $data 入力情報
     * @return array 登録結果(成功：true、失敗：false), 成功：ユーザー情報、失敗：エラーメッセージ
     */
    public function logout(array $data) : array {
        $result = [
            true, 
            ["message" => Message::LOGOUT['LOGOUT_SUCCESS']],
        ];

        if(Auth::id() == $data['systemId']) {
            $result[1] = Message::LOGOUT['UNAUTHRISED_ACCESS'];
        }

        Auth::logout();
        $data['request']->session()->invalidate();
        $data['request']->session()->regenerateToken();

        return $result;
    }
}
