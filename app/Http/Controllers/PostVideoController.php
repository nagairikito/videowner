<?php

namespace App\Http\Controllers;

use App\Constants\Bean;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Services\PostVideoService;


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
        Log::info(Auth::id());
        Log::info(Auth::user());
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
Log::info($data['created_by']);
        $result = $this->service->postVideo($data);

        return $result[0] ? Bean::responseSuccess($result[1]) : Bean::responseFailure($result[1]);
    }
}
