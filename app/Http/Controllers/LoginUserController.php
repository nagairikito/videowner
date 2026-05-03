<?php

namespace App\Http\Controllers;

use App\Constants\Bean;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


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
        // if(Auth::user()) {
        //     $loginUser = [
        //         'userName' => Auth::user()->userName,
        //         'loginId' => Auth::user()->loginId,
        //     ];

        //     return Bean::responseSuccess($loginUser);
        // }
        return $request->user();
    }
}
