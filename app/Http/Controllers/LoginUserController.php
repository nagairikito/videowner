<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

/**
 * ログインユーザー Contorller
 */
class LoginUserController extends Controller {
    
    /**
     * ログインユーザー取得
     * 
     * @param Request $request リクエスト
     * @return
     */
    public function getLoginUser(Request $request) {
        $loginUser = [];
        if(Auth::check()) {
            $loginUser = [
                'loginMessage' => '認証済',
                'loginUser' => [
                    'id' => Auth::user()->id,
                    'userName' => Auth::user()->user_name,
                    'loginId' => Auth::user()->login_id,
                ],
            ];
        } 

        return $loginUser != [] ? ResponseHelper::responseSuccess($loginUser) : ResponseHelper::responseNoAuth();
    }
}
