<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Services\VideoContentsService;


/**
 * 動画コンテンツ Contorller
 */
class VideoContentsListController extends Controller {
    
    /** 動画コンテンツ Service */
    private VideoContentsService $service;

    /**
     * コンストラクタ
     */
    public function __construct(VideoContentsService $service) {
        $this->service = $service;
    }

    /**
     * 動画コンテンツ一覧取得
     * 
     */
    public function getVideoContentsList(Request $request) {

        $videoContentsList = $this->service->getVideoContentsList();

        return ResponseHelper::responseSuccess($videoContentsList);
    }
}
