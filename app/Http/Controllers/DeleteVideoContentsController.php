<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Services\VideoContentsService;


/**
 * 動画コンテンツ削除 Contorller
 */
class DeleteVideoContentsController extends Controller {
    
    /** 動画コンテンツ Service */
    private VideoContentsService $service;

    /**
     * コンストラクタ
     */
    public function __construct(VideoContentsService $service) {
        $this->service = $service;
    }

    /**
     * 動画コンテンツ削除
     * 
     * @param Request $request リクエスト
     * @return Object レスポンス
     */
    public function deleteVideoContents(Request $request) {
        $data = [
            'videoContentsId' => $request->videoContentsId
        ];
        $result = $this->service->deleteVideoContents($data);

        return $result[0] ? ResponseHelper::responseSuccess($result[1]) : ResponseHelper::responseFailure($result[1]);
    }

    /**
     * 動画コンテンツ削除(ソフトデリート)
     * 
     * @param Request $request リクエスト
     * @return Object レスポンス
     */
    public function softDeleteVideoContents(Request $request) {
        $data = [
            'videoContentsId' => $request->videoContentsId
        ];
        $result = $this->service->softDeleteVideoContents($data);

        return $result[0] ? ResponseHelper::responseSuccess($result[1]) : ResponseHelper::responseFailure($result[1]);
    }
}
