<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Services\VideoContentsService;


/**
 * 動画コンテンツ編集 Contorller
 */
class EditVideoContentsController extends Controller {
    
    /** 動画コンテンツ Service */
    private VideoContentsService $service;

    /**
     * コンストラクタ
     */
    public function __construct(VideoContentsService $service) {
        $this->service = $service;
    }

    /**
     * 動画コンテンツ編集
     * 
     * @param Request $request リクエスト
     * @return Object レスポンス
     */
    public function editVideoContents(Request $request) {
        $data = [
            'title' => $request->title,
            'thumbnail' => [
                'name' => $request->thumbnail['name'],
                'file' => $request->thumbnail['file'],
            ],
            'video' => [
                'name' => $request->video['name'],
                'file' => $request->video['file'],
            ],
            'videoContentsId' => null,
            'created_by' => Auth::user()->id,
        ];
        $result = $this->service->registerVideoContents($data);

        return $result[0] ? ResponseHelper::responseSuccess($result[1]) : ResponseHelper::responseFailure($result[1]);
    }
}
