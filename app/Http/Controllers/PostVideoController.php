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
     * @return
     */
    public function postVideo(Request $request) {
        Log::info($request);
        // $data = [
        //     'title' => $request->title,
        //     'thumbnail' => [
        //         'name' => $request->thumbnail->name,
        //         'file' => $request->thumbnail->file,
        //     ],
        //     'video' => [
        //         'name' => $request->contents->name,
        //         'file' => $request->contents->file,
        //     ],
        //     'created_by' => Auth::id(),
        // ];

        // $result = $this->service->postVideo($data);

        // return Bean::responseSuccess($result[1]);
    }
}
