<?php

namespace App\Http\Controllers;

use App\Services\SignupService;
use App\Http\Requests\SignupRequest;
use App\Helpers\ResponseHelper;
use Illuminate\Http\Request;

/**
 * 新規ユーザー登録 Contorller
 */
class SignupController extends Controller {
    
    /** 新規ユーザー登録 Service */
    private SignupService $service;

    /**
     * コンストラクタ
     */
    public function __construct(SignupService $service) {
        $this->service = $service;
    }

    /**
     * 新規ユーザー登録
     * 
     * @param SignupRequest $request リクエスト
     * @return
     */
    public function signup(SignupRequest $request) {
        $data = [
            'userName' => $request['userName'],
            'loginId' => $request['loginId'],
            'password' => $request['password'],
            'passwordConf' => $request['passwordConf'],
        ];

        $result = $this->service->signup($data);

        return $result[0] ? ResponseHelper::responseSuccess($result[1]) : ResponseHelper::responseFailure($result[1]);
    }
}
