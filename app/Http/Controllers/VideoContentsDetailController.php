<?php

namespace App\Http\Controllers;

use App\Constants\Message;
use App\Helpers\ResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Services\VideoContentsService;


/**
 * 動画詳細 Contorller
 */
class VideoContentsDetailController extends Controller {
    
    /** 動画コンテンツ Service */
    private VideoContentsService $service;

    /**
     * コンストラクタ
     */
    public function __construct(VideoContentsService $service) {
        $this->service = $service;
    }

    /**
     * 動画詳細
     * 
     */
    public function getVideoContentsDetail(Request $request) {
        $videoContentsId = $request->query('id');

        $videoContents = $this->service->getVideoContentsDetail($videoContentsId);

        return $videoContents != [] ? ResponseHelper::responseSuccess($videoContents) : ResponseHelper::responseFailure(Message::VIDEO_CONTENTS_DETAIL["GET_FAIL"]);
    }

}
