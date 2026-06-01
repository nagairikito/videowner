<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Helpers\ResponseHelper;
use App\Services\AuthService;
use Illuminate\Http\Request;

/**
 * 認証 Contorller
 */
class AuthController extends Controller {
    
    /** ログイン Service */
    private AuthService $service;

    /**
     * コンストラクタ
     */
    public function __construct(AuthService $service) {
        $this->service = $service;
    }

    /**
     * ログイン
     * 
     * @param LoginRequest $request リクエスト
     * @return Object レスポンス
     */
    public function login(LoginRequest $request) {
        $data = [
            'loginId' => $request->loginId,
            'password' => $request->password,
            'request' => $request,
        ];

        $result = $this->service->login($data);

        return $result[0] ? ResponseHelper::responseSuccess($result[1]) : ResponseHelper::responseFailure($result[1]);
    }

    /**
     * ログアウト
     * 
     * @param LoginRequest $request リクエスト
     * @return Object レスポンス
     */
    public function logout(Request $request) {
        $data = [
            'systemId' => $request->systemId,
            'request' => $request,
        ];

        $result = $this->service->logout($data);

        return $result[0] ? ResponseHelper::responseSuccess($result[1]) : ResponseHelper::responseFailure($result[1]);
    }
}
