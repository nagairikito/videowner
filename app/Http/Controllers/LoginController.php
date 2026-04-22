<?php

namespace App\Http\Controllers;

use App\Http\Services\LoginService;
use App\Http\Requests\LoginRequest;
use App\Constants\Bean;
use Illuminate\Http\Request;

/**
 * 新規ユーザー登録 Contorller
 */
class LoginController extends Controller {
    
    /** 新規ユーザー登録 Service */
    private LoginService $service;

    /**
     * コンストラクタ
     */
    public function __construct(LoginService $service) {
        $this->service = $service;
    }

    /**
     * 新規ユーザー登録
     * 
     * @param LoginRequest $request リクエスト
     * @return
     */
    public function login(Request $request) {

        $result = true;

        return response()->json($result[0] ? Bean::responseSuccess($result[1]) : Bean::responseFailure($result[1]));
    }
}
