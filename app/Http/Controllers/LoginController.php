<?php

namespace App\Http\Controllers;

use App\Http\Services\LoginService;
use App\Http\Requests\LoginRequest;
use App\Constants\Bean;
use Illuminate\Http\Request;

/**
 * ログイン Contorller
 */
class LoginController extends Controller {
    
    /** ログイン Service */
    private LoginService $service;

    /**
     * コンストラクタ
     */
    public function __construct(LoginService $service) {
        $this->service = $service;
    }

    /**
     * ログイン
     * 
     * @param LoginRequest $request リクエスト
     * @return
     */
    public function login(LoginRequest $request) {
        $data = [
            'loginId' => $request->loginId,
            'password' => $request->password,
        ];

        $result = $this->service->login($data);

        return $result[0] ? Bean::responseSuccess($result[1]) : Bean::responseFailure($result[1]);
    }
}
