<?php

namespace App\Http\Controllers;

use App\Constants\Bean;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

/**
 * ログイン Contorller
 */
class LoginUserController extends Controller {
    
    /**
     * ログインユーザー取得
     * 
     * @param Request $request リクエスト
     * @return
     */
    public function getLoginUser(Request $request) {
        // $loginUserOpt = $request->user();

        $loginUser = [];
        if(Auth::check()) {
            $loginUser = [
                'loginMessage' => '認証済',
                'loginUser' => [
                    'userName' => Auth::user()->user_name,
                    'loginId' => Auth::user()->login_id,
                ],
            ];
        } 

        // return $loginUserOpt != null ? Bean::responseSuccess($loginUserOpt) : Bean::responseNoAuth() ;
        return $loginUser != [] ? Bean::responseSuccess($loginUser) : Bean::responseNoAuth() ;
    }
}
