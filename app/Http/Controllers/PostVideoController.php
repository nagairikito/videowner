<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Services\PostVideoService;


/**
 * 動画投稿 Contorller
 */
class PostVideoController extends Controller {
    
    /** 動画投稿 Service */
    private PostVideoService $service;

    /**
     * コンストラクタ
     */
    public function __construct(PostVideoService $service) {
        $this->service = $service;
    }

    /**
     * 動画投稿
     * 
     * @param Request $request リクエスト
     * @return Object レスポンス
     */
    public function postVideo(Request $request) {
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
            'videoPostId' => null,
            'created_by' => Auth::user()->id,
        ];
        $result = $this->service->postVideo($data);

        return $result[0] ? ResponseHelper::responseSuccess($result[1]) : ResponseHelper::responseFailure($result[1]);
    }
}
