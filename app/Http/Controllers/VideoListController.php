<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Services\VideoListService;

/**
 * 動画一覧 Contorller
 */
class VideoListController extends Controller {

    // 動画一覧 Service
    private VideoListService $videoListService;

    public function __construct(VideoListService $videoListService) {
        $this->videoListService = $videoListService;
    }
    
    /**
     * 動画一覧取得
     * 
     * @param Request $request リクエスト
     * @return
     */
    public function getVideoList(Request $request) {

        $result = $this->videoListService->getVideoList([]);

        return $result != [] ? ResponseHelper::responseSuccess($result) : ResponseHelper::responseNoAuth();
    }
}
